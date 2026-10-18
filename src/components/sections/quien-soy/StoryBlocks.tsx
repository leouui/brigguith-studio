import { historia } from "@/data/historia";
import { StoryBlock } from "./StoryBlock";

/**
 * Bloques que siguen a la escena fija. El primero ("El comienzo") vive dentro de
 * IntroScene, por eso aquí se omite.
 */
export function StoryBlocks() {
  return (
    <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 pb-24 pt-0 md:gap-28 md:px-10 md:pb-32 md:pt-0">
      {historia.slice(1).map((block) => (
        <StoryBlock key={block.id} block={block} />
      ))}
    </div>
  );
}