import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Villa Greystone • Magas-Tátra Családi Utazási Notesz",
  description: "Családi utazási notesz a szlovákiai Magas-Tátra téli utazáshoz: Villa Greystone apartman 49 fotóval, szobabeosztással és PDF dossziéval, Koliba Tatry étlap, wellness, sípályák és autós kisokos.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hu" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
      </head>
      <body className={`${montserrat.variable} min-h-screen flex flex-col bg-[#060c14] text-slate-100 antialiased selection:bg-sky-500 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
