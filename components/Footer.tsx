"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { ArrowRight, Check, Feather } from "lucide-react";
import ThemeSelector from "@/components/ThemeSelector";
import { siteConfig } from "@/config/site.config";

// "#" entries are placeholders until those pages exist.
const navigation = [
  { label: "Inicio", href: "/" },
  { label: "Propiedades", href: "/properties" },
  { label: "Sobre Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
  { label: "Ingresar", href: "/login" },
];

const categories = [
  { label: "Casas y Villas", href: "/properties" },
  { label: "Departamentos", href: "/properties" },
  { label: "Terrenos y Chacras", href: "/properties" },
  { label: "Tasaciones", href: "#contacto" },
];

const locations = [
  { label: "Punta del Este", href: "/properties" },
  { label: "La Barra", href: "/properties" },
  { label: "José Ignacio", href: "/properties" },
  { label: "Inversiones", href: "/properties" },
];

const legal = [
  { label: "Política de Privacidad", href: "#" },
  { label: "Términos de Uso", href: "#" },
  { label: "Política de Cookies", href: "#" },
];

const columnHeading = "mb-4 text-xs font-medium tracking-wider text-fg uppercase";
const columnLink = "text-sm text-fg/60 transition-colors duration-200 hover:text-fg";

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  // No mailing list is connected yet, so this only confirms locally. Wire it to the lead store when Firebase lands.
  function handleSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubscribed(true);
  }

  return (
    <footer className="w-full border-t border-fg/10">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col px-6 pt-20 pb-8 lg:px-16">
        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 160, damping: 24 }}
          className="flex flex-col gap-6 pb-12 lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="max-w-xl">
            <span className="mb-2 block text-xs font-medium tracking-widest text-emerald-500 uppercase">
              Boletín informativo
            </span>
            <h3 className="font-serif text-2xl leading-snug">
              Reciba novedades del mercado e inversiones exclusivas.
            </h3>
          </div>

          {subscribed ? (
            <p role="status" className="flex items-center gap-2 text-sm text-fg/80">
              <Check size={16} aria-hidden />
              Gracias por suscribirse.
            </p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
              <label htmlFor="newsletter" className="sr-only">
                Correo electrónico
              </label>
              <input
                id="newsletter"
                type="email"
                required
                placeholder="Tu correo electrónico"
                autoComplete="email"
                className="min-w-0 flex-1 rounded-xl border border-fg/10 bg-fg/5 px-4 py-3 text-sm text-fg placeholder:text-fg/40 transition-[border-color,background-color] duration-200 focus:border-fg/40 focus:bg-fg/10 focus:outline-none"
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-xl bg-fg px-6 py-3 text-sm font-medium whitespace-nowrap text-canvas transition-[background-color,transform] duration-200 ease-out hover:bg-fg/90 active:scale-[0.97]"
              >
                Suscribirse
                <ArrowRight size={14} aria-hidden />
              </button>
            </form>
          )}
        </motion.div>

        {/* Navigation columns */}
        <div className="grid grid-cols-2 gap-10 border-t border-b border-fg/10 py-12 md:grid-cols-4">
          <div className="col-span-2 flex flex-col gap-4 md:col-span-1">
            <Link href="/" className="flex w-fit items-center gap-2.5">
              <Feather size={18} strokeWidth={1.5} aria-hidden />
              <span className="flex items-baseline gap-1.5">
                <span className="font-serif text-lg italic">Pegasus</span>
                <span className="text-[11px] font-medium uppercase tracking-[0.2em]">Talos</span>
              </span>
            </Link>
            <p className="max-w-xs text-xs leading-relaxed text-fg/60">{siteConfig.description}</p>
          </div>

          <div>
            <p className={columnHeading}>Navegación</p>
            <ul className="flex flex-col gap-2.5">
              {navigation.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={columnLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className={columnHeading}>Propiedades</p>
            <ul className="flex flex-col gap-2.5">
              {categories.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={columnLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className={columnHeading}>Ubicaciones</p>
            <ul className="flex flex-col gap-2.5">
              {locations.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={columnLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-xs text-fg/50 md:flex-row">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Todos los derechos reservados.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {legal.map((item) => (
              <a key={item.label} href={item.href} className="transition-colors duration-200 hover:text-fg/80">
                {item.label}
              </a>
            ))}
            <ThemeSelector />
          </div>
        </div>
      </div>
    </footer>
  );
}
