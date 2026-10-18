import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { VideoFrame } from "@/components/sections/quien-soy/VideoFrame";
import { waMessages, whatsappLink } from "@/lib/whatsapp";
import type { Course } from "@/data/types";
import { CourseMeta } from "./CourseMeta";

/** Curso insignia: tarjeta oscura y ancha, con el recorrido por módulos numerado. */
export function FeaturedCourse({ course }: { course: Course }) {
  const titleId = `curso-${course.slug}`;
  const modules = course.modules ?? [];

  return (
    <Reveal>
      <article
        aria-labelledby={titleId}
        className="grid gap-6 rounded-[25px] bg-carbon p-4 text-beige md:grid-cols-2 md:gap-12 md:p-8 lg:gap-16 lg:p-10"
      >
        <div className="md:sticky md:top-24 md:self-start">
          <VideoFrame media={course.media} tilt={0} />
          <div className="mt-6 hidden md:block">
            <CourseMeta details={course.details} certificate={course.certificate} inverted />
          </div>
        </div>

        <div className="flex flex-col px-1 pb-1 md:py-2">
          <span className="self-start rounded-full bg-piedra px-4 py-1.5 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-carbon md:text-[11px]">
            {course.badge}
          </span>

          <h3
            id={titleId}
            className="mt-5 text-balance font-display text-[clamp(1.6rem,6.4vw,2.9rem)] font-bold leading-[1.1] text-beige"
          >
            {course.headline}
          </h3>
          <p className="mt-4 text-[15px] leading-relaxed text-beige/80 md:text-base">{course.subtitle}</p>

          <p className="mt-8 font-display text-[11px] font-bold uppercase tracking-[0.2em] text-piedra">
            Qué aprenderás · 4 módulos
          </p>
          <ol className="mt-4 space-y-0">
            {modules.map((m, i) => (
              <li key={m.title} className="relative flex gap-4 pb-6 last:pb-0">
                {i < modules.length - 1 && (
                  <span aria-hidden className="absolute left-[19px] top-10 h-[calc(100%-2.25rem)] w-px bg-beige/20" />
                )}
                <span
                  aria-hidden
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-piedra/60 font-display text-[11px] font-bold tracking-[0.08em] text-piedra"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="pt-1.5">
                  <h4 className="font-display text-[13px] font-bold uppercase tracking-[0.08em] text-beige md:text-sm">
                    {m.title}
                  </h4>
                  <p className="mt-1 text-[14px] leading-snug text-beige/75 md:text-[15px]">{m.description}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-7 border-t border-beige/15 pt-5 md:hidden">
            <CourseMeta details={course.details} certificate={course.certificate} inverted />
          </div>

          <div className="pt-7 md:mt-auto md:pt-9">
            <Button
              href={whatsappLink(waMessages.curso(course.name))}
              external
              variant="inverted"
              className="w-full md:w-auto"
            >
              {course.cta}
            </Button>
          </div>
        </div>
      </article>
    </Reveal>
  );
}