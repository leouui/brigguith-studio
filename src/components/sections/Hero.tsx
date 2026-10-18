"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Button } from "@/components/ui/Button";
import { HeroBackground } from "./hero/HeroBackground";
import { heroPortrait, heroTiles } from "@/data/hero";

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.35 } },
};
const line = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 0.95, ease } },
};
const fade = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

/** Altura de la primera pantalla. */
const SCREEN = "h-svh min-h-[640px] max-h-[1000px]";
/** Franja DESPUÉS del viewport donde el carrusel se desvanece a #232323. */
const FADE_ZONE = "h-[clamp(50px,50svh,100px)]";

const portraitRatio = heroPortrait.width / heroPortrait.height;
/** Ancho del retrato: limitado por ancho de pantalla, por un máximo y por ~48% del alto del viewport. */
const portraitWidth = `min(78vw, 460px, ${(48 * portraitRatio).toFixed(1)}svh)`;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const initial = reduce ? "show" : "hidden";

  // Parallax: el fondo baja más lento que el contenido al hacer scroll.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section id="inicio" ref={ref} className="relative isolate overflow-hidden bg-carbon">
      {/* ── Fondo: cubre la primera pantalla + la franja de transición ── */}
      <motion.div
        aria-hidden
        className="absolute inset-x-0 -top-[15%] bottom-0"
        style={{ y: bgY }}
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
      >
        <HeroBackground images={heroTiles} />
      </motion.div>

      {/* Oscurecido uniforme para legibilidad */}
      <div aria-hidden className="absolute inset-0 bg-carbon/80" />

      {/* Viñeta lateral: recorre toda la sección, sin cortes horizontales */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(35,35,35,0.85)_0%,transparent_28%,transparent_72%,rgba(35,35,35,0.85)_100%)]"
      />

      {/* Gradiente superior para el nav */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-carbon/80 to-transparent" />

      {/* ── Primera pantalla: retrato + texto como UN solo bloque ── */}
      <div className={`relative z-10 flex ${SCREEN} flex-col items-center justify-center px-6 pb-16 pt-20`}>
        <motion.div
          className="relative z-10 shrink-0"
          style={{ width: portraitWidth, aspectRatio: `${heroPortrait.width} / ${heroPortrait.height}` }}
          initial={reduce ? false : { opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.15, ease }}
        >
          <Image
            src={heroPortrait.src}
            alt={heroPortrait.alt}
            width={heroPortrait.width}
            height={heroPortrait.height}
            priority
            sizes="(min-width:768px) 460px, 78vw"
            className="h-full w-full object-contain object-bottom [mask-image:linear-gradient(to_bottom,black_68%,transparent_99%)]"
          />
        </motion.div>

        <motion.div
          className="relative z-20 -mt-[clamp(2.5rem,9svh,5.5rem)] flex max-w-3xl flex-col items-center text-center"
          variants={container}
          initial={initial}
          animate="show"
        >
          {/* Halo suave tras el texto: legibilidad sin cortar el carrusel */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-10 -inset-y-6 -z-10 bg-[radial-gradient(closest-side,rgba(35,35,35,0.7),transparent)]"
          />

        <h1 className="font-display text-[clamp(1.05rem,4.4vw,2.1rem)] font-bold uppercase leading-[1.15] tracking-[0.01em] text-beige">
          <span className="block overflow-hidden py-[0.12em]">
            <motion.span variants={line} className="block">
              Convierte el miedo en
            </motion.span>
          </span>
          <span className="block overflow-hidden py-[0.12em]">
            <motion.span variants={line} className="block">
              tu próxima habilidad<span className="text-piedra">.</span>
            </motion.span>
          </span>
        </h1>

        <motion.p
          variants={fade}
          className="mt-5 max-w-md text-balance md:max-w-xl text-[clamp(0.8rem,3.4vw,1.0rem)] leading-relaxed text-white/90 md:text-lg"
        >
          Aprende manicura profesional con quien lo vivió primero:{" "}
          <span className="text-piedra">5 años de experiencia real</span>, ahora compartidos contigo.
        </motion.p>

          <motion.div variants={fade} className="mt-8">
            <Button href="/#cursos" variant="stone" className="min-w-44">
              Descubre los cursos
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Franja de transición: empieza donde termina el viewport ── */}
      <div className={`relative ${FADE_ZONE}`}>
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(35,35,35,0)_0%,rgba(35,35,35,0.35)_30%,rgba(35,35,35,0.75)_65%,#232323_100%)]"
        />
      </div>
    </section>
  );
}


// "use client";

// import Image from "next/image";
// import { useRef } from "react";
// import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
// import { Button } from "@/components/ui/Button";
// import { HeroBackground } from "./hero/HeroBackground";
// import { heroPortrait, heroTiles } from "@/data/hero";

// const ease = [0.22, 1, 0.36, 1] as const;

// const container = {
//   hidden: {},
//   show: { transition: { staggerChildren: 0.14, delayChildren: 0.35 } },
// };
// const line = {
//   hidden: { y: "110%" },
//   show: { y: 0, transition: { duration: 0.95, ease } },
// };
// const fade = {
//   hidden: { opacity: 0, y: 16 },
//   show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
// };

// /** Altura de la primera pantalla. */
// const SCREEN = "h-svh min-h-[640px]";
// /** Franja DESPUÉS del viewport donde el carrusel se desvanece a #232323. */
// const FADE_ZONE = "h-[clamp(100px,50svh,200px)]";

// const portraitRatio = heroPortrait.width / heroPortrait.height;
// /** Ancho del retrato: limitado por ancho de pantalla, por un máximo y por ~48% del alto del viewport. */
// const portraitWidth = `min(78vw, 460px, ${(48 * portraitRatio).toFixed(1)}svh)`;

// export function Hero() {
//   const ref = useRef<HTMLElement>(null);
//   const reduce = useReducedMotion();
//   const initial = reduce ? "show" : "hidden";

//   // Parallax: el fondo baja más lento que el contenido al hacer scroll.
//   const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
//   const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

//   return (
//     <section id="inicio" ref={ref} className="relative isolate overflow-hidden bg-carbon">
//       {/* ── Fondo: cubre la primera pantalla + la franja de transición ── */}
//       <motion.div
//         aria-hidden
//         className="absolute inset-x-0 -top-[15%] bottom-0"
//         style={{ y: bgY }}
//         initial={reduce ? false : { opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1.6, ease: "easeOut" }}
//       >
//         <HeroBackground images={heroTiles} />
//       </motion.div>

//       {/* Oscurecido uniforme para legibilidad */}
//       <div aria-hidden className="absolute inset-0 bg-carbon/88" />

//       {/* Viñeta lateral: recorre toda la sección, sin cortes horizontales */}
//       <div
//         aria-hidden
//         className="absolute inset-0 bg-[linear-gradient(to_right,rgba(35,35,35,0.85)_0%,transparent_28%,transparent_72%,rgba(35,35,35,0.85)_100%)]"
//       />

//       {/* Gradiente superior para el nav */}
//       <div aria-hidden className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-carbon/80 to-transparent" />

//       {/* ── Primera pantalla: retrato + texto como UN solo bloque ── */}
//       <div className={`relative z-10 flex ${SCREEN} flex-col items-center justify-center px-6 pb-14 md:pb-16`}>
//         <motion.div
//           className="relative z-10 shrink-0"
//           style={{ width: portraitWidth, aspectRatio: `${heroPortrait.width} / ${heroPortrait.height}` }}
//           initial={reduce ? false : { opacity: 0, scale: 1.04 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 1.4, delay: 0.15, ease }}
//         >
//           <Image
//             src={heroPortrait.src}
//             alt={heroPortrait.alt}
//             width={heroPortrait.width}
//             height={heroPortrait.height}
//             priority
//             sizes="(min-width:768px) 460px, 78vw"
//             className="h-full w-full object-contain object-bottom [mask-image:linear-gradient(to_bottom,black_68%,transparent_99%)]"
//           />
//         </motion.div>

//         <motion.div
//           className="relative z-20 -mt-[clamp(2.5rem,9svh,5.5rem)] flex max-w-3xl flex-col items-center text-center"
//           variants={container}
//           initial={initial}
//           animate="show"
//         >
//           {/* Halo suave tras el texto: legibilidad sin cortar el carrusel */}
//           <div
//             aria-hidden
//             className="pointer-events-none absolute -inset-x-10 -inset-y-6 -z-10 bg-[radial-gradient(closest-side,rgba(35,35,35,0.7),transparent)]"
//           />

        // <h1 className="font-display text-[clamp(1.05rem,4.4vw,2.1rem)] font-bold uppercase leading-[1.15] tracking-[0.01em] text-beige">
        //   <span className="block overflow-hidden py-[0.12em]">
        //     <motion.span variants={line} className="block">
        //       Convierte el miedo en
        //     </motion.span>
        //   </span>
        //   <span className="block overflow-hidden py-[0.12em]">
        //     <motion.span variants={line} className="block">
        //       tu próxima habilidad<span className="text-piedra">.</span>
        //     </motion.span>
        //   </span>
        // </h1>

        // <motion.p
        //   variants={fade}
        //   className="mt-5 max-w-md text-balance md:max-w-xl text-[clamp(0.05rem,3.4vw,1.0rem)] leading-relaxed text-white/90 md:text-lg"
        // >
        //   Aprende manicura profesional con quien lo vivió primero:{" "}
        //   <span className="text-piedra">5 años de experiencia real</span>, ahora compartidos contigo.
        // </motion.p>

//           <motion.div variants={fade} className="mt-8">
//             <Button href="/#cursos" variant="stone" className="min-w-44">
//               Descubre los cursos
//             </Button>
//           </motion.div>
//         </motion.div>
//       </div>

//       {/* ── Franja de transición: empieza donde termina el viewport ── */}
//       <div className={`relative ${FADE_ZONE}`}>
//         <div
//           aria-hidden
//           className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(35,35,35,0)_0%,rgba(35,35,35,0.35)_30%,rgba(35,35,35,0.75)_65%,#232323_100%)]"
//         />
//       </div>
//     </section>
//   );
// }
