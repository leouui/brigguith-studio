import { cubicBezier } from "motion/react";

/** Equivalente a GSAP "power2.inOut". */
export const power2InOut = (t: number) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

/** Entrada suave (desacelera al llegar). */
export const easeOut = cubicBezier(0.22, 1, 0.36, 1);

export const linear = (t: number) => t;