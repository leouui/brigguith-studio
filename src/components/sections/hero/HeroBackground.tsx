"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const ANGLE = 12; // inclinación del grid (grados)

type Col = { dur: number; reverse: boolean; delay: number; visible: string };

/** 9 columnas; en pantallas pequeñas solo se renderizan las primeras 4 (display:none → no descargan imágenes). */
const COLS: Col[] = [
  { dur: 90, reverse: false, delay: 0, visible: "" },
  { dur: 72, reverse: true, delay: -14, visible: "" },
  { dur: 104, reverse: false, delay: -30, visible: "" },
  { dur: 80, reverse: true, delay: -8, visible: "" },
  { dur: 96, reverse: false, delay: -22, visible: "hidden md:block" },
  { dur: 76, reverse: true, delay: -40, visible: "hidden md:block" },
  { dur: 100, reverse: false, delay: -12, visible: "hidden xl:block" },
  { dur: 84, reverse: true, delay: -26, visible: "hidden xl:block" },
  { dur: 92, reverse: false, delay: -35, visible: "hidden xl:block" },
];

export function HeroBackground({ images }: { images: string[] }) {
  const ref = useRef<HTMLDivElement>(null);

  // Pausa las animaciones cuando el hero sale de pantalla.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => el.setAttribute("data-inview", String(entry.isIntersecting)),
      { rootMargin: "100px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} data-inview="true" aria-hidden className="absolute inset-0 overflow-hidden">
      <div
        className="absolute left-1/2 top-1/2 flex gap-4 [--tile:130px] md:[--tile:180px] xl:[--tile:240px]"
        style={{
          transform: `translate(-50%, -25%) rotate(${ANGLE}deg)`,
          transformOrigin: "50% 25%",
        }}
      >
        {COLS.map((col, ci) => {
          // Cada columna parte de una foto distinta para que los vecinos no se repitan.
          const shift = (ci * 5) % images.length;
          const list = [...images.slice(shift), ...images.slice(0, shift)];
          const loop = [...list, ...list]; // duplicado → bucle sin saltos (-50%)

          return (
            <div key={ci} className={col.visible}>
              <div
                className="hero-col"
                style={
                  {
                    "--dur": `${col.dur}s`,
                    "--dir": col.reverse ? "reverse" : "normal",
                    "--delay": `${col.delay}s`,
                  } as React.CSSProperties
                }
              >
                {loop.map((src, i) => (
                  <div
                    key={i}
                    className="relative mb-4 aspect-square w-[var(--tile)] overflow-hidden rounded-[25px] bg-piedra/10"
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="(min-width:1280px) 240px, (min-width:768px) 180px, 130px"
                      quality={55}
                      loading="lazy"
                      fetchPriority="low"
                      draggable={false}
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
