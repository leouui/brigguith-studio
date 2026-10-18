import type { Course } from "./types";

/** Encabezado y cierre de la sección Cursos. */
export const cursosIntro = {
  /** Frase puente: responde al cierre de "Quién soy" ("ayudarte a convertir tu pasión en profesión"). */
  title: "Cursos",
  text: "Aprende con quien lo vive todos los días. Técnicas reales, resultados que se notan desde la primera práctica.",
} as const;


export const cursosCierre = {
  text: "¿No sabes cuál curso es para ti? Escríbeme y te ayudo a elegir el camino correcto según tu nivel y tus metas.",
  cta: "Hablar con Brigguith",
} as const;

/** El curso insignia va primero (venta principal). Fotos/videos: sustituir los placeholders. */
export const cursos: Course[] = [
  {
    slug: "acrilico-basico",
    badge: "Curso insignia",
    featured: true,
    name: "Acrílico Básico",
    headline: "De cero a construir uñas que se venden solas",
    subtitle:
      "Un mes, un camino completo: desde entender la uña natural hasta ofrecer estructuras y técnicas comerciales con confianza.",
    learn: [],
    modules: [
      { title: "Fundamentos", description: "Anatomía, morfología, preparación segura" },
      { title: "Control del material", description: "Monómero, perlas, pincel, sellado" },
      { title: "Estructura", description: "Tip, extensión, distribución" },
      {
        title: "Aplicación comercial",
        description: "Coffin, almendra, stiletto, babyboomer, encapsulado",
      },
    ],
    details: [
      { kind: "time", text: "1 mes · 1 sesión por semana" },
      { kind: "place", text: "Presencial" },
      { kind: "group", text: "Grupal o personalizado" },
    ],
    certificate: "Certificado de participación",
    media: {
      poster: "/images/cursos/acrilico-basico.webp",
      // video: "/videos/cursos/acrilico-basico.mp4",
      alt: "Alumna construyendo uñas en acrílico",
    },
    cta: "Consultar por WhatsApp",
  },
  {
    slug: "master-class-nivelacion",
    badge: "Perfeccionamiento",
    name: "Master Class: Nivelación + Esmaltado Perfecto",
    headline: "¿Tus trabajos se desprenden y no sabes por qué?",
    subtitle:
      "Aquí resolvemos lo que la teoría no te explicó: nivelación sin limado excesivo, esmaltado profundo y duradero, y cuándo usar rubber o gel de construcción.",
    learn: [
      "Preparación de la uña natural",
      "Manicura rusa",
      "Uso de drill y fresas",
      "Esmaltado profundo y duradero",
      "Causas de desprendimiento",
      "Diseños comerciales",
    ],
    details: [
      { kind: "time", text: "1 día completo" },
      { kind: "place", text: "Presencial" },
      { kind: "group", text: "Grupal o personalizado" },
    ],
    certificate: "Certificado de participación",
    media: {
      poster: "/images/cursos/master-class.webp",
      // video: "/videos/cursos/master-class.mp4",
      alt: "Detalle de una nivelación y esmaltado",
    },
    cta: "Consultar por WhatsApp",
  },
  {
    slug: "soft-gel",
    badge: "Especialización",
    name: "Soft Gel",
    headline: "Domina 3 técnicas de aplicación de soft gel",
    subtitle:
      "Aprende a conseguir una aplicación limpia, rápida y duradera con la técnica americana, japonesa e híbrida.",
    learn: [
      "Preparación de la uña",
      "Selección del tip",
      "Aplicación sin burbujas",
      "Técnica americana, japonesa e híbrida",
      "Diseños comerciales",
    ],
    details: [
      { kind: "time", text: "1 día completo" },
      { kind: "place", text: "Presencial" },
      { kind: "group", text: "Grupal o personalizado" },
    ],
    certificate: "Certificado de participación",
    media: {
      poster: "/images/cursos/soft-gel.webp",
      // video: "/videos/cursos/soft-gel.mp4",
      alt: "Aplicación de soft gel con tips",
    },
    cta: "Consultar por WhatsApp",
  },
];