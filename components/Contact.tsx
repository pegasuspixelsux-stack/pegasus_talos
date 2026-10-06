"use client";

import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { Check, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/config/site.config";

const viewport = { once: true, margin: "-80px" };

const rise = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 160, damping: 24 } },
} as const;

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const whatsappHref = `https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, "")}`;
const phoneHref = `tel:${siteConfig.contact.phone.replace(/\s/g, "")}`;

const fieldClass =
  "w-full rounded-xl border border-fg/10 bg-fg/5 px-4 py-3 text-sm text-fg placeholder:text-fg/40 transition-[border-color,background-color] duration-200 focus:border-fg/40 focus:bg-fg/10 focus:outline-none";

const labelClass = "mb-1.5 block text-xs uppercase tracking-wider text-fg/60";

const details = [
  {
    icon: MapPin,
    label: "Oficina",
    lines: [
      `${siteConfig.address.street}`,
      `${siteConfig.address.city}, ${siteConfig.address.state}, ${siteConfig.address.country}`,
    ],
  },
  {
    icon: Phone,
    label: "Teléfono directo",
    lines: [siteConfig.contact.phone],
    href: phoneHref,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    lines: [siteConfig.contact.whatsapp.startsWith("+") ? siteConfig.contact.whatsapp : `+${siteConfig.contact.whatsapp}`],
    href: whatsappHref,
    external: true,
  },
  {
    icon: Mail,
    label: "Correo electrónico",
    lines: [siteConfig.contact.email],
    href: `mailto:${siteConfig.contact.email}`,
  },
  {
    icon: Clock,
    label: "Horario de atención",
    lines: ["Lunes a viernes: 09:00 - 19:00 hs", "Sábados: 10:00 - 14:00 hs"],
  },
];

export default function Contact() {
  const [sent, setSent] = useState(false);

  // No CRM is connected yet, so this only confirms locally. Wire it to the lead store when Firebase lands.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <section id="contacto" className="relative scroll-mt-24 border-t border-fg/10 py-24 lg:py-32">
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-16">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="flex flex-col gap-10 lg:col-span-5"
          >
            <motion.div variants={rise}>
              <span className="mb-3 block text-xs font-medium tracking-widest text-emerald-500 uppercase">
                Contacto
              </span>
              <h2 className="mb-4 font-serif text-3xl leading-tight tracking-[-0.01em] lg:text-4xl">
                Hablemos de su próxima inversión inmobiliaria.
              </h2>
              <p className="text-sm leading-relaxed text-fg/60">
                Nuestro equipo de asesores está disponible para responder sus consultas y coordinar visitas a las
                propiedades de su interés.
              </p>
            </motion.div>

            <motion.ul variants={stagger} className="flex flex-col gap-6 border-t border-fg/10 pt-8">
              {details.map(({ icon: Icon, label, lines, href, external }) => (
                <motion.li key={label} variants={rise} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-fg/10 bg-fg/5 text-emerald-500">
                    <Icon size={16} aria-hidden />
                  </div>
                  <div>
                    <p className="text-xs tracking-wider text-fg/50 uppercase">{label}</p>
                    {lines.map((line, index) =>
                      href && index === 0 ? (
                        <a
                          key={line}
                          href={href}
                          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="mt-0.5 block text-sm font-medium transition-colors duration-200 hover:text-fg/70"
                        >
                          {line}
                        </a>
                      ) : (
                        <p key={line} className={`mt-0.5 text-sm ${index === 0 ? "font-medium" : "text-fg/60"}`}>
                          {line}
                        </p>
                      ),
                    )}
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            variants={rise}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="lg:col-span-7"
          >
            <div className="rounded-2xl border border-fg/10 bg-surface/70 p-8 backdrop-blur-md">
              <h3 className="mb-6 text-xl font-medium">Enviar una consulta</h3>

              {sent ? (
                <div role="status" className="flex items-start gap-3 text-sm text-fg/80">
                  <Check size={16} className="mt-0.5 shrink-0" aria-hidden />
                  <p>Recibimos su consulta. Un agente se comunicará con usted pronto.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className={labelClass}>
                        Nombre y apellido
                      </label>
                      <input id="contact-name" name="name" required autoComplete="name" className={fieldClass} />
                    </div>
                    <div>
                      <label htmlFor="contact-phone" className={labelClass}>
                        Teléfono / WhatsApp
                      </label>
                      <input id="contact-phone" name="phone" type="tel" autoComplete="tel" className={fieldClass} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-email" className={labelClass}>
                      Correo electrónico
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className={fieldClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-type" className={labelClass}>
                      Tipo de consulta
                    </label>
                    <select id="contact-type" name="type" defaultValue="buy" className={fieldClass}>
                      <option value="buy">Comprar</option>
                      <option value="sell">Vender</option>
                      <option value="rent">Alquilar</option>
                      <option value="appraisal">Tasación</option>
                      <option value="other">Otro</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className={labelClass}>
                      Mensaje
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      placeholder="Describa su consulta o el tipo de propiedad que está buscando..."
                      className={`${fieldClass} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-1 w-full rounded-full bg-fg py-3.5 text-sm font-medium text-canvas transition-[background-color,transform,box-shadow] duration-200 ease-out hover:bg-fg/90 hover:shadow-lg active:scale-[0.98]"
                  >
                    Enviar consulta
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
