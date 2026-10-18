import type { Service } from "./types";

export const servicioDestacado: Service = {
  name: "Uñas Esculpidas",
  from: 80,
  featured: true,
  description:
    "La técnica que más refleja precisión y acabado profesional. Ideal si buscas una extensión resistente y personalizada desde cero.",
};

export const servicios: Service[] = [
  { name: "Servicio básico", from: 60 },
  { name: "Dual System", from: 80 },
  { name: "Técnica Híbrida", from: 80 },
  { name: "Soft Gel", from: 70 },
  { name: "Acrílicas", from: 70 },
  { name: "Polygel", from: 70 },
  { name: "Builder Gel", from: 60 },
];
