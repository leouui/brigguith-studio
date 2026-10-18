"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, SECTION_IDS, SITE } from "@/lib/constants";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useScrolled } from "@/hooks/useScrolled";
import { cn } from "@/lib/cn";

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label={`${SITE.name} — inicio`}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-beige font-display text-[13px] font-bold tracking-tight text-carbon"
    >
      BM
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const sectionActive = useActiveSection(SECTION_IDS);
  const scrolled = useScrolled(24);
  const [open, setOpen] = useState(false);

  // Transparente solo sobre el hero; sólido al hacer scroll, fuera del Home o con el menú abierto.
  const solid = scrolled || pathname !== "/" || open;

  const isActive = (id: string) =>
    id === "galeria" ? pathname === "/galeria" : pathname === "/" && sectionActive === id;

  // Bloquea el scroll del fondo mientras el menú móvil está abierto.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  // Cierra con Escape y si la pantalla pasa a tamaño desktop.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 768px)");
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500",
          solid
            ? "border-beige/10 bg-carbon/80 backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <nav
          className={cn(
            "mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-6 transition-[height] duration-500 md:px-10",
            scrolled || open ? "h-16" : "h-20",
          )}
        >
          <div className="justify-self-start">
            <Logo onClick={() => setOpen(false)} />
          </div>

          <ul className="hidden items-center gap-10 md:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <Link
                  href={l.href}
                  className={cn(
                    "font-display text-[11px] font-bold uppercase tracking-[0.14em] text-beige transition-opacity duration-300",
                    isActive(l.id)
                      ? "underline decoration-1 underline-offset-[10px]"
                      : "opacity-75 hover:opacity-100",
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="col-start-3 justify-self-end p-1 text-beige md:hidden"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </nav>
      </header>

      {/*
        El menú móvil va FUERA del <header>: el backdrop-filter del header crea un
        "containing block" que rompería el `position: fixed` de este panel.
      */}
      <div
        id="mobile-menu"
        data-lenis-prevent
        aria-hidden={!open}
        className={cn(
          "fixed inset-0 z-40 overflow-y-auto overscroll-contain bg-carbon px-6 pb-10 pt-24 transition-opacity duration-300 md:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <ul className="flex flex-col">
          {NAV_LINKS.map((l, i) => (
            <li key={l.id} className="border-b border-beige/10">
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className={cn(
                  "flex items-baseline justify-between py-5 font-display text-2xl font-bold uppercase tracking-[0.06em] transition-colors",
                  isActive(l.id) ? "text-piedra" : "text-beige",
                )}
              >
                {l.label}
                <span className="text-xs font-normal tracking-widest text-beige/30">
                  0{i + 1}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-sm text-piedra">
          Home studio · {SITE.location}
        </p>
      </div>
    </>
  );
}