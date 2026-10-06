"use client";

import { useState, type FormEvent } from "react";
import { Check, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/config/site.config";

interface PropertyContactCardProps {
  propertyName: string;
  price: string;
}

const fieldClass =
  "w-full rounded-xl border border-fg/10 bg-fg/5 px-4 py-3 text-sm text-fg placeholder:text-fg/40 transition-[border-color,background-color] duration-200 focus:border-fg/40 focus:bg-fg/10 focus:outline-none";

const labelClass = "mb-1.5 block text-xs text-fg/60";

export default function PropertyContactCard({ propertyName, price }: PropertyContactCardProps) {
  const [sent, setSent] = useState(false);

  const whatsappHref = `https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
    `Hola, quisiera más información sobre ${propertyName} (${price}).`,
  )}`;

  // No CRM is connected yet, so this only confirms locally. Wire it to the lead store when Firebase lands.
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <aside className="sticky top-24 flex flex-col gap-6 rounded-2xl border border-fg/10 bg-surface/70 p-6 backdrop-blur-md">
      <div className="flex flex-col gap-2">
        <h2 className="font-serif text-2xl">Consulte por esta Propiedad</h2>
        <p className="text-sm text-fg/60">Un agente se comunicará con usted a la brevedad.</p>
      </div>

      <div className="flex flex-col gap-3">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-full bg-emerald-500 py-3.5 text-sm font-medium text-white transition-[background-color,transform] duration-200 ease-out hover:bg-emerald-600 active:scale-[0.97]"
        >
          <MessageCircle size={16} aria-hidden />
          Consultar por WhatsApp
        </a>
        <a
          href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
          className="flex items-center justify-center gap-2 rounded-full border border-fg/20 py-3.5 text-sm font-medium transition-[background-color,transform] duration-200 ease-out hover:bg-fg/10 active:scale-[0.97]"
        >
          <Phone size={16} aria-hidden />
          {siteConfig.contact.phone}
        </a>
      </div>

      <div className="border-t border-fg/10 pt-6">
        {sent ? (
          <div role="status" className="flex items-start gap-3 text-sm text-fg/80">
            <Check size={16} className="mt-0.5 shrink-0" aria-hidden />
            <p>Recibimos su consulta. Un agente se comunicará con usted pronto.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="lead-name" className={labelClass}>
                Nombre completo
              </label>
              <input id="lead-name" name="name" required autoComplete="name" className={fieldClass} />
            </div>

            <div>
              <label htmlFor="lead-email" className={labelClass}>
                Correo electrónico
              </label>
              <input
                id="lead-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className={fieldClass}
              />
            </div>

            <div>
              <label htmlFor="lead-phone" className={labelClass}>
                Teléfono / WhatsApp
              </label>
              <input
                id="lead-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                className={fieldClass}
              />
            </div>

            <div>
              <label htmlFor="lead-message" className={labelClass}>
                Mensaje
              </label>
              <textarea
                id="lead-message"
                name="message"
                rows={3}
                placeholder="Hola, quisiera coordinar una visita o recibir más información sobre esta propiedad..."
                className={`${fieldClass} resize-none`}
              />
            </div>

            <button
              type="submit"
              className="mt-1 w-full rounded-full border border-fg/30 py-3 text-sm font-medium transition-[background-color,transform] duration-200 ease-out hover:bg-fg/10 active:scale-[0.97]"
            >
              Enviar consulta
            </button>
          </form>
        )}
      </div>
    </aside>
  );
}
