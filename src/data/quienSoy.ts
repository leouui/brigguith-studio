export type PolaroidItem = {
  src: string;
  alt: string;
  /** Texto opcional para la franja blanca inferior (fecha, frase corta…). */
  caption?: string;
  /** Posición en el escenario (clases Tailwind, móvil → md). */
  position: string;
  /** Rotación de reposo en grados. */
  rotate: number;
  /** De dónde entra: desplazamiento y giro de partida. */
  from: { x: string; y: string; rotate: number };
  /** Tramo del progreso (0–1) en el que entra. */
  enter: [number, number];
  /**
   * Salida hacia afuera de su esquina.
   * `rotate` es el giro ADICIONAL (entre 9° y 14°) respecto al de reposo.
   * Rangos y distancias distintos = parallax escalonado.
   */
  exit: { range: [number, number]; x: string; y: string; rotate: number };
};

/** Sustituir por fotos reales (cuadradas, ≥ 600px). */
export const polaroids: PolaroidItem[] = [
  {
    src: "/images/quien-soy/polaroid-01.png",
    alt: "Brigguith Moreno — foto 1",
    position: "left-[3%] top-[14%] md:left-[4%] md:top-[14%]",
    rotate: -12,
    from: { x: "-70vw", y: "-30vh", rotate: -40 },
    enter: [0.19, 0.3],
    exit: { range: [0.42, 0.65], x: "-55vw", y: "-35vh", rotate: -13 },
  },
  {
    src: "/images/quien-soy/polaroid-02.png",
    alt: "Brigguith Moreno — foto 2",
    position: "right-[3%] top-[16%] md:right-[4%] md:top-[16%]",
    rotate: 10,
    from: { x: "70vw", y: "-30vh", rotate: 40 },
    enter: [0.21, 0.32],
    exit: { range: [0.43, 0.7], x: "58vw", y: "-30vh", rotate: 9 },
  },
  {
    src: "/images/quien-soy/polaroid-03.png",
    alt: "Brigguith Moreno — foto 3",
    position: "bottom-[10%] left-[3%] md:bottom-[9%] md:left-[3%]",
    rotate: 8,
    from: { x: "-70vw", y: "30vh", rotate: 38 },
    enter: [0.23, 0.34],
    exit: { range: [0.445, 0.675], x: "-52vw", y: "36vh", rotate: 14 },
  },
  {
    src: "/images/quien-soy/polaroid-04.png",
    alt: "Brigguith Moreno — foto 4",
    position: "bottom-[15%] right-[3%] md:bottom-[10%] md:right-[5%]",
    rotate: -10,
    from: { x: "70vw", y: "30vh", rotate: -38 },
    enter: [0.25, 0.36],
    exit: { range: [0.46, 0.72], x: "60vw", y: "32vh", rotate: -11 },
  },
];