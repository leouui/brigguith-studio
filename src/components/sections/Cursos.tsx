import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cursos, cursosCierre, cursosIntro } from "@/data/cursos";
import { waMessages, whatsappLink } from "@/lib/whatsapp";
import { CourseCard } from "./cursos/CourseCard";
import { FeaturedCourse } from "./cursos/FeaturedCoursed";

/** Venta principal. Fondo beige para contrastar con "Quién soy" (carbón). */
export function Cursos() {
  const featured = cursos.find((c) => c.featured);
  const others = cursos.filter((c) => !c.featured);

  return (
    <section
      id="cursos"
      aria-labelledby="cursos-titulo"
      className="scroll-mt-20 bg-beige px-6 py-20 text-carbon md:px-10 md:py-28"
    >
      <div className="mx-auto w-full max-w-6xl">
                <Reveal>
          <h2
            id="cursos-titulo"
            className="font-display text-[clamp(2.4rem,11vw,5rem)] font-bold uppercase leading-none"
          >
            {cursosIntro.title}
          </h2>
          <p className="mt-5 max-w-xl text-balance text-base leading-relaxed text-carbon/80 md:mt-6 md:text-lg">
            {cursosIntro.text}
          </p>
        </Reveal>

        <div className="mt-10 space-y-5 md:mt-14 md:space-y-8">
          {featured && <FeaturedCourse course={featured} />}

          <div className="grid gap-5 md:grid-cols-2 md:gap-8">
            {others.map((course, i) => (
              <CourseCard key={course.slug} course={course} delay={i * 0.1} />
            ))}
          </div>
        </div>

        <Reveal className="mx-auto mt-16 max-w-2xl text-center md:mt-24">
          <p className="text-balance font-display text-[clamp(1.15rem,4.6vw,1.75rem)] font-bold leading-snug">
            {cursosCierre.text}
          </p>
          <Button
            href={whatsappLink(waMessages.ayudaElegir)}
            external
            variant="primary"
            className="mt-7 w-full sm:w-auto"
          >
            {cursosCierre.cta}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}