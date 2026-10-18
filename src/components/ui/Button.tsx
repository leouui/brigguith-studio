import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "inverted" | "stone";

const variants: Record<Variant, string> = {
  primary: "bg-carbon text-beige hover:bg-carbon/85",
  outline: "border border-piedra text-carbon hover:bg-piedra/15",
  inverted: "bg-beige text-carbon hover:bg-beige/85",
  stone: "bg-piedra text-white hover:bg-beige/80",
};
/** Escala responsive: compacto en móvil, más amplio desde sm y md. */
const sizing =
  "px-6 py-3 text-[10px] tracking-[0.12em] " +
  "sm:px-8 sm:py-3.5 sm:text-[11px] sm:tracking-[0.14em] " +
  "md:px-8 md:py-4.5 md:text-xs";

type Props = {
  href: string;
  variant?: Variant;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function Button({ href, variant = "primary", external, className, children }: Props) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-full text-center font-display font-bold uppercase leading-snug transition-colors duration-300",
    sizing,
    variants[variant],
    className,
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}