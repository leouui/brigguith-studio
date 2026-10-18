"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { StoryBlockData } from "@/data/historia";

type Props = { media: StoryBlockData["media"]; tilt: number };

/**
 * Marco de video decorativo: autoplay, en bucle, sin sonido y sin controles.
 * - Se pausa fuera de pantalla (ahorra batería y datos en móvil).
 * - Con "reducir movimiento" o sin `media.video`, se muestra solo la portada.
 */
export function VideoFrame({ media, tilt }: Props) {
  const reduce = usePrefersReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const showVideo = Boolean(media.video) && !reduce;

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    // `muted` como propiedad: React no siempre lo refleja como atributo y Safari lo exige.
    el.muted = true;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [showVideo]);

  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden rounded-[22px] bg-piedra/20 shadow-[0_24px_50px_-18px_rgba(0,0,0,0.7)]"
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      {showVideo ? (
        <video
          ref={videoRef}
          src={media.video}
          poster={media.poster}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          disablePictureInPicture
          disableRemotePlayback
          aria-label={media.alt}
          className="pointer-events-none h-full w-full object-cover"
        />
      ) : (
        <Image
          src={media.poster}
          alt={media.alt}
          fill
          sizes="(min-width:1024px) 480px, (min-width:768px) 44vw, 88vw"
          quality={70}
          className="object-cover"
        />
      )}
    </div>
  );
}