import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-carbon px-6 py-12 text-beige md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:justify-between">
        <div>
          <p className="font-display text-2xl">{SITE.name}</p>
          <p className="mt-2 text-sm text-piedra">Home studio · {SITE.location}</p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {NAV_LINKS.map((l) => (
            <li key={l.id}>
              <Link href={l.href} className="hover:underline">
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="hover:underline">
              Instagram
            </a>
          </li>
        </ul>
      </div>
      <p className="mx-auto mt-10 max-w-6xl text-xs text-piedra">
        © {new Date().getFullYear()} {SITE.name}. Todos los derechos reservados.
      </p>
    </footer>
  );
}
