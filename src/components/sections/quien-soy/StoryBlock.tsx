import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import type { StoryBlockData } from "@/data/historia";
import { StoryHeading } from "./StoryHeading";
import { VideoFrame } from "./VideoFrame";

export function StoryBlock({ block }: { block: StoryBlockData }) {
  const mediaLeft = block.side === "left";

  return (
    <article
      aria-labelledby={`historia-${block.id}`}
      className="grid items-center gap-8 md:grid-cols-2 md:gap-14"
    >
      <Reveal
        y={20}
        className={cn("mx-auto w-full max-w-md md:max-w-none", !mediaLeft && "md:order-2")}
      >
        <VideoFrame media={block.media} tilt={block.tilt} />
      </Reveal>

      <Reveal
        delay={0.12}
        className={cn("mx-auto w-full max-w-md md:max-w-none", !mediaLeft && "md:order-1")}
      >
        <StoryHeading block={block} />
        <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-beige/85 md:text-base">
          {block.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </Reveal>
    </article>
  );
}