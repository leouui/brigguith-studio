import { MessageCircle } from "lucide-react";
import { waMessages, whatsappLink } from "@/lib/whatsapp";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink(waMessages.general)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbeme por WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-carbon text-beige shadow-lg transition-transform duration-300 hover:scale-105"
    >
      <MessageCircle />
    </a>
  );
}
