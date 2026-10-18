"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { polaroids } from "@/data/quienSoy";
import { historia, intro, type StoryBlockData } from "@/data/historia";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/cn";
import { easeOut, linear, power2InOut } from "@/lib/easing";
import { Polaroid } from "./Polaroid";
import { StoryBlock } from "./StoryBlock";
import { StoryHeading } from "./StoryHeading";
import { VideoFrame } from "./VideoFrame";

type Range = [number, number];

/* ───────────────────────── Timeline (progreso 0–1 del scroll) ─────────────────────────
 * Recorrido total: 2.5 pantallas en desktop (350svh) y 1.8 en móvil (280svh).
 * Las polaroids tienen sus propios tramos en data/quienSoy.ts (entrada 0.19–0.36, salida 0.42–0.72).
 */
const T = {
  question: [0.06, 0.16] as Range, // "¿Quién soy?" se encoge y se desvanece
  soy: [0.13, 0.18] as Range, // nombre: aparece línea por línea
  brigguith: [0.155, 0.21] as Range,
  moreno: [0.18, 0.245] as Range,

  shrink: [0.433, 0.774] as Range, // el nombre baja a 40% y sube al encabezado (power2.inOut)

  video: [0.546, 0.799] as Range, // la tarjeta entra mientras el nombre aún se mueve
  straightenEnd: 0.84, // …y se endereza ligeramente
  title: [0.597, 0.748] as Range, // el título entra desde el lado opuesto al video

  paragraphStart: 0.66, // párrafos en cascada: ~100–150 ms de scroll entre cada uno
  paragraphStep: 0.063,
  paragraphLen: 0.151,

  descriptor: [0.235, 0.29] as Range, // línea descriptora bajo el nombre (aparece al terminar "Moreno")

  restState: 0.4, // estado de reposo para "reducir movimiento"
};

const NAME_SCALE = 0.4;
const HEADER_TOP = 80; // px desde arriba (debajo del navbar de 64px)
const DESC_GAP_START = 14; // px entre el nombre (grande) y el descriptor
const DESC_GAP_END = 10; // px entre el nombre (40%) y el descriptor, ya arriba
const CONTENT_GAP = { base: 40, md: 56 }; // px entre el descriptor y el bloque (respiro bajo el nombre)
const BLOCK_GAP = { base: 80, md: 112 }; // px entre "El comienzo" y el siguiente bloque (= gap de StoryBlocks)
const MD_QUERY = "(min-width: 768px)";
const TRAVEL_END = T.straightenEnd; // el pin se suelta al terminar la última animación


const DESCRIPTOR_CLASS =
  "pointer-events-none text-balance font-sans text-[12px] leading-snug tracking-[0.06em] text-piedra md:text-sm";

/* ───────────────────────── Piezas ───────────────────────── */

/** Línea del nombre que se revela desde una máscara, atada al scroll. */
function MaskLine({
  progress,
  range,
  className,
  children,
}: {
  progress: MotionValue<number>;
  range: Range;
  className: string;
  children: React.ReactNode;
}) {
  const y = useTransform(progress, range, ["110%", "0%"], { clamp: true, ease: easeOut });
  return (
    <span className="block overflow-hidden py-[0.1em]">
      <motion.span style={{ y }} className={`block ${className}`}>
        {children}
      </motion.span>
    </span>
  );
}

/** Progreso 0→1 del tramo en que el nombre se reduce y sube (power2.inOut). */
function useShrink(progress: MotionValue<number>) {
  return useTransform(progress, T.shrink, [0, 1], { clamp: true, ease: power2InOut });
}

/** "Soy Brigguith Moreno": aparece y luego se reduce a 40% y sube como encabezado. */
function Name({
  progress,
  innerRef,
  targetY,
}: {
  progress: MotionValue<number>;
  innerRef?: React.Ref<HTMLDivElement>;
  targetY?: MotionValue<number>;
}) {
  const fallbackY = useMotionValue(0);
  const t = useShrink(progress);
  const scale = useTransform(t, [0, 1], [1, NAME_SCALE]);
  const y = useTransform([t, targetY ?? fallbackY], ([tv, ty]: number[]) => tv * ty);

  return (
    <motion.div
      ref={innerRef}
      aria-hidden
      style={{ scale, y }}
      className="relative z-20 flex flex-col items-center text-center font-display font-bold uppercase leading-none text-beige"
    >
      <MaskLine progress={progress} range={T.soy} className="text-[clamp(1rem,5vw,1.6rem)] md:text-[clamp(0.9rem,4vw,2.25rem)]">
        Soy
      </MaskLine>
      <MaskLine progress={progress} range={T.brigguith} className="text-[clamp(1.6rem,10vw,3.2rem)] md:text-[clamp(1.5rem,8vw,5rem)]">
        Brigguith
      </MaskLine>
      <MaskLine progress={progress} range={T.moreno} className="text-[clamp(2.4rem,15vw,4.5rem)] md:text-[clamp(2.2rem,12vw,8.5rem)]">
        Moreno
      </MaskLine>
    </motion.div>
  );
}

/** Línea descriptora bajo el nombre. Sube con él pero NO se escala, para seguir legible. */
function Descriptor({
  progress,
  innerRef,
  targetY,
}: {
  progress: MotionValue<number>;
  innerRef: React.Ref<HTMLParagraphElement>;
  targetY: MotionValue<number>;
}) {
  const t = useShrink(progress);
  const y = useTransform([t, targetY], ([tv, ty]: number[]) => tv * ty);
  const opacity = useTransform(progress, T.descriptor, [0, 1], { clamp: true });

  return (
    <motion.p
      ref={innerRef}
      style={{ y, opacity, top: `calc(50% + var(--name-h, 8rem) / 2 + ${DESC_GAP_START}px)` }}
      className={cn("absolute inset-x-0 z-20 mx-auto max-w-sm px-6 text-center md:max-w-2xl", DESCRIPTOR_CLASS)}
    >
      {intro.descriptor}
    </motion.p>
  );
}

function Question({ progress }: { progress?: MotionValue<number> }) {
  // Sin progreso (reduced-motion) la pregunta se muestra estática.
  const fallback = useMotionValue(0);
  const p = progress ?? fallback;
  const opacity = useTransform(p, T.question, [1, 0], { clamp: true });
  const scale = useTransform(p, T.question, [1, 0.86], { clamp: true, ease: easeOut });

  return (
    <motion.p
      aria-hidden
      style={progress ? { opacity, scale } : undefined}
      className="absolute inset-0 z-10 flex items-center justify-center px-6 text-center font-display font-bold uppercase leading-[1.05] text-beige text-[clamp(3rem,15vw,5.5rem)] md:text-[clamp(4rem,8.2vw,8rem)]"
    >
      <span>
        <span className="block md:inline">¿Quién</span>{" "}
        <span className="block md:inline">soy?</span>
      </span>
    </motion.p>
  );
}

/** Fade-in + desplazamiento atados al scroll (x en vw, y en px). */
function useScrubIn(progress: MotionValue<number>, [a, b]: Range, from: { x?: string; y?: number }) {
  const opacity = useTransform(progress, [a, a + (b - a) * 0.6], [0, 1], { clamp: true });
  const x = useTransform(progress, [a, b], [from.x ?? "0vw", "0vw"], { clamp: true, ease: easeOut });
  const y = useTransform(progress, [a, b], [from.y ?? 0, 0], { clamp: true, ease: easeOut });
  return { opacity, x, y };
}

function Paragraph({
  progress,
  range,
  children,
}: {
  progress: MotionValue<number>;
  range: Range;
  children: React.ReactNode;
}) {
  const style = useScrubIn(progress, range, { y: 24 });
  return <motion.p style={style}>{children}</motion.p>;
}

/** "El comienzo" dentro de la escena fija: se solapa con el movimiento del nombre. */
function PinnedStory({ block, progress }: { block: StoryBlockData; progress: MotionValue<number> }) {
  const mediaLeft = block.side === "left";
  const [vStart, vEnd] = T.video;

  // Video: entra con su inclinación actual y se endereza ligeramente al asentarse.
  const mediaX = useTransform(progress, T.video, [mediaLeft ? "-14vw" : "14vw", "0vw"], { clamp: true, ease: easeOut });
  const mediaY = useTransform(progress, T.video, [40, 0], { clamp: true, ease: easeOut });
  const mediaOpacity = useTransform(progress, [vStart, vStart + (vEnd - vStart) * 0.5], [0, 1], { clamp: true });
  const mediaRotate = useTransform(
    progress,
    [vStart, vEnd, T.straightenEnd],
    [block.tilt, block.tilt, block.tilt * 0.3],
    { clamp: true, ease: [linear, power2InOut] },
  );

  // Título: entra desde el lado opuesto al video.
  const title = useScrubIn(progress, T.title, { x: mediaLeft ? "12vw" : "-12vw" });

  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-start px-6 pb-6 pt-[var(--header-b,12rem)] md:px-10">
      <article
        aria-labelledby={`historia-${block.id}`}
        className="grid w-full max-w-6xl items-center gap-5 md:grid-cols-2 md:gap-14"
      >
        <motion.div
          style={{ x: mediaX, y: mediaY, opacity: mediaOpacity, rotate: mediaRotate }}
          className={cn(
            "mx-auto w-full max-w-md md:max-w-none",
            "[&>div]:max-h-[30svh] md:[&>div]:max-h-[max(14rem,calc(100svh-19rem))]",
            !mediaLeft && "md:order-2",
          )}
        >
          <VideoFrame media={block.media} tilt={0} />
        </motion.div>

        <div className={cn("mx-auto w-full max-w-md md:max-w-none", !mediaLeft && "md:order-1")}>
          <motion.div style={title}>
            <StoryHeading block={block} />
          </motion.div>
          <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-beige/85 md:mt-4 md:space-y-4 md:text-base">
            {block.paragraphs.map((p, i) => {
              const start = T.paragraphStart + i * T.paragraphStep;
              return (
                <Paragraph key={p} progress={progress} range={[start, start + T.paragraphLen]}>
                  {p}
                </Paragraph>
              );
            })}
          </div>
        </div>
      </article>
    </div>
  );
}

/* ───────────────────────── Escenas ───────────────────────── */

/** Escena fija (pin) con scrub: pregunta → nombre + polaroids → nombre al encabezado + "El comienzo". */
function PinnedScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const targetY = useMotionValue(0);
  const descTargetY = useMotionValue(0);

  // El pin termina justo cuando acaba la última animación (progreso 0.84): sin "cola" de scroll
  // con la escena quieta, que en pantallas muy altas dejaba un hueco grande antes del bloque 02.
  // El recorrido en px de cada animación es el mismo que antes (container × TRAVEL_SCALE).
  const { scrollYProgress: raw } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const scrollYProgress = useTransform(raw, [0, 1], [0, TRAVEL_END], { clamp: true });

  // Mide el escenario y el nombre para saber cuánto debe subir y dónde empieza el contenido.
  useEffect(() => {
    const stage = stageRef.current;
    const nameEl = nameRef.current;
    const descEl = descRef.current;
    const container = containerRef.current;
    const article = stage?.querySelector("article");
    if (!stage || !nameEl || !descEl || !container || !article) return;

    const measure = () => {
      const md = window.matchMedia(MD_QUERY).matches;
      const contentGap = md ? CONTENT_GAP.md : CONTENT_GAP.base;
      const blockGap = md ? BLOCK_GAP.md : BLOCK_GAP.base;

      const stageH = stage.clientHeight;
      const nameH = nameEl.offsetHeight;
      const descH = descEl.offsetHeight;
      targetY.set(HEADER_TOP + (nameH * NAME_SCALE) / 2 - stageH / 2);

      // El descriptor baja con el nombre: de "debajo del nombre grande" a "debajo del nombre al 40%".
      const descStart = stageH / 2 + nameH / 2 + DESC_GAP_START;
      const descEnd = HEADER_TOP + nameH * NAME_SCALE + DESC_GAP_END;
      descTargetY.set(descEnd - descStart);

      stage.style.setProperty("--name-h", `${nameH}px`);
      const headerB = descEnd + descH + contentGap;
      stage.style.setProperty("--header-b", `${headerB}px`);

      // Elimina el hueco bajo "El comienzo": al soltarse el pin, el siguiente bloque sube
      // hasta quedar a `blockGap` (mismo ritmo que entre bloques), sin importar el alto de pantalla.
      const empty = stageH - (headerB + article.offsetHeight);
      container.style.marginBottom = `${blockGap - empty}px`;
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(stage);
    ro.observe(nameEl);
    ro.observe(descEl);
    ro.observe(article);
    return () => {
      ro.disconnect();
      container.style.marginBottom = "";
    };
  }, [targetY, descTargetY]);

  return (
    // Recorrido del pin = altura − 100svh → 151svh (móvil) / 210svh (desktop). Equivale a los
    // 180/250svh anteriores menos la cola quieta (16%) tras la última animación.
    <div ref={containerRef} className="relative h-[251svh] md:h-[310svh]">
      <h2 className="sr-only">¿Quién soy? Soy Brigguith Moreno</h2>

      <div ref={stageRef} className="sticky top-0 flex h-svh items-center justify-center overflow-hidden">
        <Question progress={scrollYProgress} />
        {polaroids.map((item) => (
          <Polaroid key={item.src} item={item} progress={scrollYProgress} />
        ))}
        <Name progress={scrollYProgress} innerRef={nameRef} targetY={targetY} />
        <Descriptor progress={scrollYProgress} innerRef={descRef} targetY={descTargetY} />
        <PinnedStory block={historia[0]} progress={scrollYProgress} />
      </div>
    </div>
  );
}

/** "Reducir movimiento": todo estático, sin pin ni scrub. */
function StaticScene() {
  const rest = useMotionValue(T.restState);
  return (
    <>
      <h2 className="sr-only">¿Quién soy? Soy Brigguith Moreno</h2>
      <div className="relative h-[55svh]">
        <Question />
      </div>
      <div className="relative flex h-svh items-center justify-center overflow-hidden">
        <div className="relative z-20 flex flex-col items-center gap-3 px-6">
          <Name progress={rest} />
          <p className={cn("max-w-sm text-center md:max-w-2xl", DESCRIPTOR_CLASS)}>{intro.descriptor}</p>
        </div>
        {polaroids.map((item) => (
          <Polaroid key={item.src} item={item} progress={rest} />
        ))}
      </div>
      <div className="mx-auto w-full max-w-6xl px-6 pb-12 pt-8 md:px-10">
        <StoryBlock block={historia[0]} />
      </div>
    </>
  );
}

export function IntroScene() {
  const reduce = usePrefersReducedMotion();
  return reduce ? <StaticScene /> : <PinnedScene />;
}