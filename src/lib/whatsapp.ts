const NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

/** Genera un enlace wa.me con mensaje prellenado. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${NUMBER}?text=${encodeURIComponent(message)}`;
}

export const waMessages = {
  general: "Hola Brigguith, quisiera más información.",
  ayudaElegir:
    "Hola Brigguith, no sé qué curso es para mí. ¿Me ayudas a elegir según mi nivel y metas?",
  curso: (nombre: string) =>
    `Hola Brigguith, quiero información del curso ${nombre}.`,
  servicio: (nombre: string) =>
    `Hola Brigguith, quiero reservar una cita para ${nombre}.`,
  reserva: "Hola Brigguith, quiero reservar mi cita.",
} as const;
