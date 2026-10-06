"use client";

import { motion } from "motion/react";
import { Feather } from "lucide-react";
import { siteConfig } from "@/config/site.config";

// "#" entries are placeholders until those sections have pages.
const navItems = [
  { label: "Propiedades", href: "/properties" },
  { label: "Alquileres", href: "/properties" },
  { label: "Proyectos", href: "#" },
  { label: "Zonas", href: "#" },
  { label: "Contacto", href: "#contacto" },
];

// Fixed 80px height so the hero can offset itself by the same amount (-mt-20 / pt-20).
export default function Navbar({ overHero = false }: { overHero?: boolean }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      className={
        overHero
          ? "sticky top-0 z-50 h-20 w-full border-b border-white/10 bg-white/10 text-white [-webkit-backdrop-filter:blur(12px)] backdrop-blur-md"
          : "sticky top-0 z-50 h-20 w-full bg-canvas/70 backdrop-blur-md"
      }
    >
      <nav className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-6 lg:px-16">
        <a href="#" className="flex items-center gap-2.5">
          <Feather size={18} strokeWidth={1.5} aria-hidden />
          <span className="flex items-baseline gap-1.5">
            <span className="font-serif text-lg italic">{siteConfig.name.split(" ")[0]}</span>
            <span className="text-[11px] font-medium uppercase tracking-[0.2em]">
              {siteConfig.name.split(" ").slice(1).join(" ")}
            </span>
          </span>
        </a>

        <div className="flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`hidden text-sm font-medium transition-colors duration-200 md:inline ${
                overHero ? "text-white hover:text-white/80" : "text-fg/70 hover:text-fg"
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contacto"
            className={`rounded-full border px-5 py-2 text-sm font-medium transition-[background-color,transform] duration-200 ease-out active:scale-[0.97] ${
              overHero ? "border-white/40 hover:bg-white/10" : "border-fg/30 hover:bg-fg/10"
            }`}
          >
            Consultar Agente
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
