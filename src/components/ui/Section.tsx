import { cn } from "@/lib/cn";

type Props = {
  id: string;
  className?: string;
  children: React.ReactNode;
};

/** Contenedor base de cada sección del Home (ancla + ancho máximo + padding). */
export function Section({ id, className, children }: Props) {
  return (
    <section id={id} className={cn("scroll-mt-20 px-6 py-24 md:px-10", className)}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}
