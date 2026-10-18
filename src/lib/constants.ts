export const SITE = {
  name: "Brigguith Moreno Studio",
  tagline:
    "Lo que hoy da miedo, mañana será un obstáculo superado. Confía en Dios.",
  description:
    "Cursos de manicura profesional y servicios de uñas esculpidas en Huarmey. Aprende acrílico, soft gel y más con Brigguith Moreno.",
  location: "Huarmey, Perú",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  instagram: "https://www.instagram.com/bri.studio15/",
  instagramHandle: "@bri.studio15",
} as const;

export const NAV_LINKS = [
  { label: "Quién soy", href: "/#quien-soy", id: "quien-soy" },
  { label: "Cursos", href: "/#cursos", id: "cursos" },
  { label: "Galería", href: "/galeria", id: "galeria" },
  { label: "Catálogo", href: "/#servicios", id: "servicios" },
] as const;

/** IDs de sección del Home, en orden de aparición (usado por useActiveSection). */
export const SECTION_IDS = [
  "inicio",
  "quien-soy",
  "cursos",
  "servicios",
  "disenos",
  "videos",
  "contacto",
] as const;