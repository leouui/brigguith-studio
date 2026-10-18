/** Fotos del carrusel de fondo del Hero. Sustituir por las reales (cuadradas, ≥ 480px). */
export const heroTiles: string[] = Array.from(
  { length: 12 },
  (_, i) => `/images/hero/nail-${String(i + 1).padStart(2, "0")}.jpg`,
);

/**
 * Retrato recortado (fondo transparente).
 * IMPORTANTE: ajusta width/height a las dimensiones reales de tu archivo;
 * de ahí sale la proporción con la que se calcula el tamaño y se evita el salto de layout.
 */
export const heroPortrait = {
  src: "/images/hero/brigguith.jpg",
  width: 1086,
  height: 1200,
  alt: "Brigguith Moreno, técnica de uñas, trabajando con guantes negros",
} as const;
