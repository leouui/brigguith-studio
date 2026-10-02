# Brigguith Moreno Studio

Next.js (App Router) + TypeScript + Tailwind v4 + Motion + Lenis + Lucide.

## Empezar
```bash
npm install
cp .env.example .env.local   # completa NEXT_PUBLIC_WHATSAPP_NUMBER
npm run dev
```

## Estructura
- `src/app` — rutas (`/`, `/galeria`), layout, sitemap
- `src/components/sections` — secciones del Home (placeholders)
- `src/components/ui` — Button, Section, Reveal
- `src/components/layout` — Navbar, Footer, WhatsAppFloat
- `src/data` — cursos, servicios, extras, timeline (tipados)
- `src/lib` — whatsapp, constants, cn
- `src/hooks` — useActiveSection
- `public/{galeria,videos,images}` — assets

Tokens de marca en `src/app/globals.css` (`beige`, `piedra`, `carbon`).
