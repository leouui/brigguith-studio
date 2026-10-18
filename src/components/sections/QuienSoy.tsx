import { IntroScene } from "./quien-soy/IntroScene";
import { StoryBlocks } from "./quien-soy/StoryBlocks";

export function QuienSoy() {
  return (
    <section id="quien-soy" className="bg-carbon text-beige">
      <IntroScene />
      <StoryBlocks />
    </section>
  );
}