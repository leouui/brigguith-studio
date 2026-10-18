"use client";

import Image from "next/image";
import { motion, useTransform, type MotionValue } from "motion/react";
import type { PolaroidItem } from "@/data/quienSoy";
import { easeOut, linear, power2InOut } from "@/lib/easing";

type Props = { item: PolaroidItem; progress: MotionValue<number> };

/**
 * Polaroid atada al progreso del scroll, en 3 tiempos:
 * entra desde el borde → se queda en su esquina → sale hacia afuera girando y se desvanece.
 */
export function Polaroid({ item, progress }: Props) {
  const [enterStart, enterEnd] = item.enter;
  const [exitStart, exitEnd] = item.exit.range;

  const keys = [enterStart, enterEnd, exitStart, exitEnd];
  const ease = [easeOut, linear, power2InOut]; // un easing por tramo

  const x = useTransform(progress, keys, [item.from.x, "0vw", "0vw", item.exit.x], { ease });
  const y = useTransform(progress, keys, [item.from.y, "0vh", "0vh", item.exit.y], { ease });
  const rotate = useTransform(
    progress,
    keys,
    [item.from.rotate, item.rotate, item.rotate, item.rotate + item.exit.rotate],
    { ease },
  );
  const opacity = useTransform(
    progress,
    [enterStart, enterStart + (enterEnd - enterStart) * 0.3, exitStart, exitStart + (exitEnd - exitStart) * 0.85],
    [0, 1, 1, 0],
    { clamp: true },
  );

  return (
    <motion.div
      // Eliminamos will-change-transform
  className={`pointer-events-none absolute z-10 w-[clamp(110px,28vw,240px)] md:w-[clamp(170px,17vw,250px)] ${item.position}`}
  style={{ 
    x, y, rotate, opacity,
    backfaceVisibility: "hidden", 
    WebkitFontSmoothing: "antialiased",
    transformStyle: "preserve-3d" 
  }}
>
  <figure className="m-0 bg-[#f4f1ea] p-[6%] pb-[20%] shadow-[0_18px_40px_-12px_rgba(0,0,0,0.65)]">
    <div className="relative aspect-square w-full overflow-hidden bg-piedra/30">
      <Image
        src={item.src}
        alt={item.alt}
        fill
        // 2. Aumentamos un poco los valores de sizes para pantallas Retina (e.g. 2x de 250px = 500px)
        sizes="(min-width: 768px) 500px, 50vw" 
        quality={100}
        className="object-cover"
        draggable={false}
      />
    </div>
        {item.caption && (
          <figcaption className="mt-[6%] text-center font-sans text-[10px] leading-tight text-carbon/70 md:text-xs">
            {item.caption}
          </figcaption>
        )}
      </figure>
    </motion.div>
  );
}