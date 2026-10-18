export type StoryBlockData = {
  id: string;
  /** Etiqueta pequeña con numeración, p. ej. "01 · El comienzo" (se muestra en mayúsculas). */
  label: string;
  /** Titular grande: la frase emocional del bloque. */
  headline: string;
  /** Párrafos del bloque. */
  paragraphs: string[];
  media: {
    /** Imagen de portada (obligatoria). */
    poster: string;
    /** MP4 opcional. Sin él, la portada se muestra sin reproducir. */
    video?: string;
    alt: string;
  };
  /** Lado del video en pantallas medianas y grandes. */
  side: "left" | "right";
  /** Inclinación del marco (grados). */
  tilt: number;
};

/** Texto de la escena de presentación (línea bajo el nombre). */
export const intro = {
  descriptor: "Técnica de uñas · 5 años de experiencia · +600 clientas",
} as const;

/** Poster: sustituir por frames reales. Video: poner el MP4 en public/videos/quien-soy/. */
export const historia: StoryBlockData[] = [
  {
    id: "comienzo",
    label: "01 · El comienzo",
    headline: "Todo empezó como una forma de salir adelante.",
    paragraphs: [
      "Fue una necesidad. Con el tiempo se convirtió en pasión, y esa pasión en profesión.",
    ],
    media: {
      poster: "/images/quien-soy/bloque-01.webp",
      video: "/videos/quien-soy/comienzo.mp4",
      alt: "Brigguith trabajando con guantes negros",
    },
    side: "left",
    tilt: -3,
  },
  {
    id: "experiencia",
    label: "02 · Experiencia",
    headline: "Años aprendiendo no solo cómo, sino por qué.",
    paragraphs: [
      "Durante estos años he dedicado cada día a aprender, perfeccionar cada técnica y entender por qué funcionan.",
    ],
    media: {
      poster: "/images/quien-soy/bloque-02.webp",
      video: "/videos/quien-soy/comienzo.mp4",
      alt: "Detalle de una manicura en proceso",
    },
    side: "right",
    tilt: 3,
  },
  {
    id: "hoy",
    label: "03 · Hoy",
    headline: "Ahora quiero compartirlo contigo.",
    paragraphs: [
      "Porque estoy convencida de que la mejor forma de honrar lo que he aprendido es ayudando a que otras mujeres también lo logren.",
      "Mi propósito es ayudarte a desarrollar tus habilidades, ganar confianza y convertir tu pasión por las uñas en una verdadera profesión.",
    ],
    media: {
      poster: "/images/quien-soy/bloque-03.webp",
      video: "/videos/quien-soy/comienzo.mp4",
      alt: "Brigguith enseñando una técnica",
    },
    side: "left",
    tilt: -2,
  },
];