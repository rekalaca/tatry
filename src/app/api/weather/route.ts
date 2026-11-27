import { NextResponse } from "next/server";

export interface WeatherData {
  success: boolean;
  station: {
    id: string;
    name: string;
    region: string;
    altitude: string;
    sourceName: string;
    sourceUrl: string;
    stationTime: string | null;
  };
  temperature: {
    current: number;
    apparent: number;
    unit: string;
  };
  precipitation: {
    isSnowing: boolean;
    isRaining: boolean;
    statusText: string;
    amount1hMm: number;
    snowfallCm: number;
  };
  snow: {
    depthValleyCm: number;
    depthMountainCm: number;
    statusText: string;
  };
  wind: {
    speedKmh: number;
    speedMs: number;
    description: string;
  };
  humidity: number;
  condition: {
    code: number;
    text: string;
  };
  updatedAt: string;
}

function getWeatherConditionText(code: number, temp: number): { text: string; isSnow: boolean; isRain: boolean } {
  switch (code) {
    case 0:
      return { text: "Tiszta, derült égbolt", isSnow: false, isRain: false };
    case 1:
      return { text: "Túlnyomóan derült, napos", isSnow: false, isRain: false };
    case 2:
      return { text: "Részben felhős idő", isSnow: false, isRain: false };
    case 3:
      return { text: "Borult alpesi égbolt", isSnow: false, isRain: false };
    case 45:
    case 48:
      return { text: "Köd és zúzmara", isSnow: false, isRain: false };
    case 51:
    case 53:
    case 55:
      return { text: "Szitáló eső", isSnow: false, isRain: true };
    case 56:
    case 57:
      return { text: "Fagyos, ónos szitálás", isSnow: true, isRain: true };
    case 61:
      return { text: "Gyenge esőzés", isSnow: false, isRain: true };
    case 63:
    case 65:
      return { text: "Esőzés", isSnow: false, isRain: true };
    case 66:
    case 67:
      return { text: "Ónos eső", isSnow: true, isRain: true };
    case 71:
      return { text: "Gyenge hószállingózás", isSnow: true, isRain: false };
    case 73:
      return { text: "Mérsékelt hóesés", isSnow: true, isRain: false };
    case 75:
      return { text: "Intenzív havazás", isSnow: true, isRain: false };
    case 77:
      return { text: "Hódara", isSnow: true, isRain: false };
    case 80:
    case 81:
    case 82:
      return { text: "Záporeső", isSnow: false, isRain: true };
    case 85:
    case 86:
      return { text: "Hózápor", isSnow: true, isRain: false };
    case 95:
    case 96:
    case 99:
      return { text: "Vihar / hózivatar", isSnow: temp <= 0, isRain: temp > 0 };
    default:
      if (temp <= 0) return { text: "Téli időjárás", isSnow: false, isRain: false };
      return { text: "Felhős idő", isSnow: false, isRain: false };
  }
}

function getWindDescription(speedMs: number): string {
  if (speedMs < 1) return "Szélcsend";
  if (speedMs < 3.3) return "Gyenge szellő";
  if (speedMs < 5.5) return "Könnyű szél";
  if (speedMs < 8) return "Mérsékelt szél";
  if (speedMs < 10.8) return "Élénk hegyi szél";
  if (speedMs < 13.9) return "Erős szél";
  return "Viharos magashegyi szél";
}

export async function GET() {
  const now = new Date();
  const shmuStationUrl = "https://www.shmu.sk/sk/?page=1&id=meteo_apocasie_sk&ii=11934";

  // Data slots
  let shmuTemp: number | null = null;
  let shmuPrecip1h: number | null = null;
  let shmuHumidity: number | null = null;
  let shmuWindSpeed: number | null = null;
  let shmuStationTime: string | null = null;

  // 1. Scrape SHMÚ Station 11934
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4500);

    const shmuRes = await fetch(shmuStationUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      signal: controller.signal,
      next: { revalidate: 600 },
    });
    clearTimeout(timeout);

    if (shmuRes.ok) {
      const html = await shmuRes.text();
      const match = html.match(/var datasets = (\[[\s\S]*?\]);/);
      if (match) {
        const fn = new Function("return " + match[1]);
        const datasets = fn() as Array<{ id: string; data?: Array<[number, number | null]> }>;

        const getLatest = (id: string) => {
          const ds = datasets.find((d) => d.id === id);
          if (!ds || !ds.data) return null;
          const valid = ds.data.filter((p) => p[1] !== null);
          return valid.length ? valid[valid.length - 1] : null;
        };

        const ttt = getLatest("ttt");
        const pr1h = getLatest("pr1h");
        const rh = getLatest("rh");
        const ff = getLatest("ff");

        if (ttt) {
          shmuTemp = Math.round(ttt[1]! * 10) / 10;
          shmuStationTime = new Date(ttt[0]).toISOString();
        }
        if (pr1h) {
          shmuPrecip1h = Math.round(pr1h[1]! * 10) / 10;
        }
        if (rh) {
          shmuHumidity = Math.round(rh[1]!);
        }
        if (ff) {
          shmuWindSpeed = Math.round(ff[1]! * 10) / 10;
        }
      }
    }
  } catch (err) {
    console.warn("SHMU fetch fallback:", err);
  }

  // 2. Query High-Resolution Open-Meteo for Poprad (Airport 718m) and Mountain Base (Stará Lesná 780m)
  let omDataPoprad: any = null;
  let omDataMountain: any = null;

  try {
    const [popradRes, mountainRes] = await Promise.all([
      fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=49.07&longitude=20.24&current=temperature_2m,apparent_temperature,precipitation,rain,snowfall,weather_code,snow_depth,relative_humidity_2m,wind_speed_10m&timezone=Europe%2FPrague",
        { next: { revalidate: 600 } }
      ),
      fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=49.148&longitude=20.28&current=temperature_2m,apparent_temperature,precipitation,rain,snowfall,weather_code,snow_depth&timezone=Europe%2FPrague",
        { next: { revalidate: 600 } }
      ),
    ]);

    if (popradRes.ok) omDataPoprad = await popradRes.json();
    if (mountainRes.ok) omDataMountain = await mountainRes.json();
  } catch (err) {
    console.warn("Open-Meteo fetch error:", err);
  }

  // 3. Synthesize the values
  const currentTemp =
    shmuTemp !== null
      ? shmuTemp
      : omDataPoprad?.current?.temperature_2m !== undefined
      ? Math.round(omDataPoprad.current.temperature_2m * 10) / 10
      : -2.5;

  const apparentTemp =
    omDataPoprad?.current?.apparent_temperature !== undefined
      ? Math.round(omDataPoprad.current.apparent_temperature * 10) / 10
      : currentTemp - 3;

  const rawSnowDepthPoprad = omDataPoprad?.current?.snow_depth ?? 0.03;
  const rawSnowDepthMountain = omDataMountain?.current?.snow_depth ?? 0.06;

  const snowDepthValleyCm = Math.max(0, Math.round(rawSnowDepthPoprad * 100));
  const snowDepthMountainCm = Math.max(
    snowDepthValleyCm,
    Math.round(rawSnowDepthMountain * 100)
  );

  const weatherCode = omDataPoprad?.current?.weather_code ?? 3;
  const conditionMeta = getWeatherConditionText(weatherCode, currentTemp);

  const snowfallCm =
    omDataPoprad?.current?.snowfall !== undefined
      ? Math.round(omDataPoprad.current.snowfall * 10) / 10
      : 0;

  const rainMm =
    omDataPoprad?.current?.rain !== undefined
      ? Math.round(omDataPoprad.current.rain * 10) / 10
      : 0;

  const precip1h =
    shmuPrecip1h !== null
      ? shmuPrecip1h
      : omDataPoprad?.current?.precipitation !== undefined
      ? Math.round(omDataPoprad.current.precipitation * 10) / 10
      : 0;

  const isSnowing =
    conditionMeta.isSnow ||
    snowfallCm > 0 ||
    (currentTemp <= 0.8 && precip1h > 0);

  const isRaining =
    !isSnowing && (conditionMeta.isRain || rainMm > 0 || (currentTemp > 0.8 && precip1h > 0));

  let precipStatusText = "Csapadékmentes idő";
  if (isSnowing) {
    if (snowfallCm > 1.5 || precip1h > 1.5) {
      precipStatusText = "Havazás";
    } else {
      precipStatusText = "Hószállingózás";
    }
  } else if (isRaining) {
    precipStatusText = rainMm > 1 || precip1h > 1 ? "Esőzés" : "Gyenge eső / szitálás";
  }

  let snowStatusText = "Foltokban hóréteg";
  if (snowDepthMountainCm >= 15) {
    snowStatusText = "Kiváló téli hóréteg";
  } else if (snowDepthMountainCm >= 5) {
    snowStatusText = "Összefüggő természetes hó";
  } else if (snowDepthValleyCm > 0 || snowDepthMountainCm > 0) {
    snowStatusText = "Vékony friss hólepel";
  } else {
    snowStatusText = "Hómentes völgy / hegyeken hó";
  }

  const windSpeedMs =
    shmuWindSpeed !== null
      ? shmuWindSpeed
      : omDataPoprad?.current?.wind_speed_10m !== undefined
      ? Math.round((omDataPoprad.current.wind_speed_10m / 3.6) * 10) / 10
      : 1.5;

  const windSpeedKmh = Math.round(windSpeedMs * 3.6);
  const humidity =
    shmuHumidity !== null
      ? shmuHumidity
      : omDataPoprad?.current?.relative_humidity_2m ?? 85;

  const payload: WeatherData = {
    success: true,
    station: {
      id: "11934",
      name: "Poprad - Letisko / Magas-Tátra",
      region: "Prešovský kraj • Vysoké Tatry",
      altitude: "718 m n.m.",
      sourceName: "SHMÚ (Slovenský hydrometeorologický ústav)",
      sourceUrl: shmuStationUrl,
      stationTime: shmuStationTime,
    },
    temperature: {
      current: currentTemp,
      apparent: apparentTemp,
      unit: "°C",
    },
    precipitation: {
      isSnowing,
      isRaining,
      statusText: precipStatusText,
      amount1hMm: precip1h,
      snowfallCm,
    },
    snow: {
      depthValleyCm: snowDepthValleyCm,
      depthMountainCm: snowDepthMountainCm,
      statusText: snowStatusText,
    },
    wind: {
      speedMs: windSpeedMs,
      speedKmh: windSpeedKmh,
      description: getWindDescription(windSpeedMs),
    },
    humidity,
    condition: {
      code: weatherCode,
      text: conditionMeta.text,
    },
    updatedAt: now.toISOString(),
  };

  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": "public, s-maxage=600, stale-while-revalidate=1200",
    },
  });
}
