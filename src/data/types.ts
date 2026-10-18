export type CourseDetail = {
  kind: "place" | "time" | "group";
  text: string;
};

export type Course = {
  slug: string;
  badge: string;
  featured?: boolean;
  name: string;
  headline: string;
  subtitle: string;
  /** Lista "Qué aprenderás" (cursos sin módulos). */
  learn: string[];
  /** Recorrido por módulos (curso insignia). Se numeran solos: 01, 02… */
  modules?: { title: string; description: string }[];
  /** Datos rápidos: modalidad, duración y tipo de grupo. */
  details: CourseDetail[];
  certificate: string;
  /** Portada: sustituir por foto real; `video` (MP4) es opcional. */
  media: { poster: string; video?: string; alt: string };
  /** Texto del botón (el precio se consulta por WhatsApp). */
  cta: string;
};

export type Service = {
  name: string;
  from: number; // S/
  featured?: boolean;
  description?: string;
};

export type Extra = { name: string; price: string };

export type TimelineItem = {
  year: string;
  title: string;
  description?: string;
  highlight?: boolean;
};