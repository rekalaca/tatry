<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- BEGIN:villa-greystone-ui-rules -->
## Villa Greystone Webpage UI & Layout Szabályok (MINDIG KÖVETENDŐ!)

1. **Aloldalak felépítése:**
   - **TILOS bal felülre kenyérmorzsát / breadcrumbot / "Főoldal > Aloldal" linket vagy "vissza a főoldalra" gombot tenni!** A felhasználó a fejléc logójával vagy a menüvel navigál vissza.
   - **TILOS a főcímek (H1/H2) fölé kis "+ ikon és kísérő megjegyzés" jelvényt / pill-t tenni** (pl. nem kell "Hagyományos Tátrai Ízek", "Téli Élmények & Felfedezés", "Forró Termálvíz..." a cím felé). A főcím közvetlenül induljon tisztán és elegánsan.

2. **Kártyák és információs/figyelmeztető dobozok (pl. HZS Hegyi Mentőbiztosítás, fogaskerekű tudnivaló, tippek, reggeli/ital kártyák):**
   - **Az ikon és a cím MINDIG EGY SORBAN, egymás mellett helyezkedjen el** (`flex items-center gap-3 mb-2.5` vagy `mb-3`).
   - **A szöveges tartalom MINDIG ÚJ SORBAN kezdődjön**, ne az ikon mellé szorítva és ne alá behúzva.
   - **A szöveg töltse ki a kártya TELJES SZÉLESSÉGÉT (`w-full`), és MINDIG SORKIZÁRT legyen** (`text-justify [text-align:justify] [text-justify:inter-word]`), sor végi automatikus elválasztásokkal (`hyphens-auto [hyphens:auto] [-webkit-hyphens:auto]`) és `lang="hu"` nyelvi jelöléssel.
<!-- END:villa-greystone-ui-rules -->
