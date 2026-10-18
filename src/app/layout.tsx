import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE } from "@/lib/constants";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { SmoothScroll } from "@/components/providers/SmoothScroll";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Cursos de manicura y uñas esculpidas en Huarmey`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    title: SITE.name,
    description: SITE.description,
    locale: "es_PE",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#232323",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="antialiased">
      <body>
        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppFloat />
        </SmoothScroll>
      </body>
    </html>
  );
}
