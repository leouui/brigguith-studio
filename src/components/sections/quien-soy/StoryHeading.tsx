import type { StoryBlockData } from "@/data/historia";

/**
 * Jerarquía tipográfica compartida por todos los bloques:
 * etiqueta pequeña numerada (mayúsculas, #aaa396) + titular grande con la frase emocional.
 */
export function StoryHeading({ block }: { block: StoryBlockData }) {
  return (
    <>
      <p className="font-display text-[11px] font-bold uppercase tracking-[0.24em] text-piedra md:text-xs">
        {block.label}
      </p>
      <h3
        id={`historia-${block.id}`}
        className="mt-3 text-balance font-display text-[clamp(1.4rem,5.4vw,2rem)] font-bold leading-[1.12] text-beige md:text-[clamp(1.6rem,2.7vw,2.6rem)]"
      >
        {block.headline}
      </h3>
    </>
  );
}