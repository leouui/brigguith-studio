import type { Metadata } from "next";

export const metadata: Metadata = { title: "Galería" };

export default function GaleriaPage() {
  return (
    <section className="min-h-screen px-6 pb-24 pt-32 md:px-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-display text-5xl">Galería</h1>
        <p className="mt-2 text-sm opacity-60">Pendiente de definir contenido</p>
      </div>
    </section>
  );
}
