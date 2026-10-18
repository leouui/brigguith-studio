import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { VideoFrame } from "@/components/sections/quien-soy/VideoFrame";
import { waMessages, whatsappLink } from "@/lib/whatsapp";
import type { Course } from "@/data/types";
import { CourseMeta } from "./CourseMeta";

/** Tarjeta de curso estándar (Master Class y Soft Gel). */
export function CourseCard({ course, delay = 0 }: { course: Course; delay?: number }) {
  const titleId = `curso-${course.slug}`;
  return (
    <Reveal delay={delay} className="h-full">
      <article
        aria-labelledby={titleId}
        className="flex h-full flex-col rounded-[25px] border border-carbon/15 bg-carbon/[0.04] p-4 md:p-6"
      >
        <VideoFrame media={course.media} tilt={0} />

        <div className="flex flex-1 flex-col px-1 pb-1 pt-5 md:pt-6">
          <p className="font-display text-[11px] font-bold uppercase tracking-[0.24em] text-carbon/60 md:text-xs">
            {course.badge}
          </p>
          <h3
            id={titleId}
            className="mt-3 text-balance font-display text-[clamp(1.25rem,5vw,1.75rem)] font-bold leading-[1.15] text-carbon"
          >
            {course.headline}
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-carbon/80 md:text-base">{course.subtitle}</p>

          <p className="mt-6 font-display text-[11px] font-bold uppercase tracking-[0.2em] text-carbon">
            Qué aprenderás
          </p>
          <ul className="mt-3 space-y-2">
            {course.learn.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[14px] leading-snug text-carbon/85 md:text-[15px]">
                <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-carbon/60" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t border-carbon/15 pt-5">
            <CourseMeta details={course.details} certificate={course.certificate} />
          </div>

          <div className="mt-auto pt-7">
            <Button
              href={whatsappLink(waMessages.curso(course.name))}
              external
              variant="primary"
              className="w-full"
            >
              {course.cta}
            </Button>
          </div>
        </div>
      </article>
    </Reveal>
  );
}