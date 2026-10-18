import { Award, Clock, MapPin, Users } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Course, CourseDetail } from "@/data/types";

const ICONS = { time: Clock, place: MapPin, group: Users } as const;

/** Datos rápidos del curso (duración, modalidad, grupo) + certificado. */
export function CourseMeta({
  details,
  certificate,
  inverted,
}: {
  details: Course["details"];
  certificate: string;
  inverted?: boolean;
}) {
  const row = "flex items-center gap-2.5 text-[13px] leading-snug md:text-sm";
  const icon = cn("h-4 w-4 shrink-0", inverted ? "text-piedra" : "text-carbon/60");

  return (
    <ul className={cn("space-y-2", inverted ? "text-beige/85" : "text-carbon/80")}>
      {details.map((d: CourseDetail) => {
        const Icon = ICONS[d.kind];
        return (
          <li key={d.text} className={row}>
            <Icon aria-hidden className={icon} />
            {d.text}
          </li>
        );
      })}
      <li className={row}>
        <Award aria-hidden className={icon} />
        {certificate}
      </li>
    </ul>
  );
}