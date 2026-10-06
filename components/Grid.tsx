"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { badgeLabel, properties, type PropertyStatus } from "@/config/catalog";
import { siteConfig } from "@/config/site.config";
import { formatPrice } from "@/lib/format";

// Homepage shows a preview; the full list lives on /properties.
const HOME_LIMIT = 5;

// Badges sit on the dark photo scrim, so they use light tints in both themes.
const overlayStatusTone: Record<PropertyStatus, string> = {
  Available: "text-emerald-300 border-emerald-300/50",
  Reserved: "text-amber-300 border-amber-300/50",
  Sold: "text-white/60 border-white/25",
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 160, damping: 24 },
  },
} as const;

export default function Grid() {
  return (
    <section id="properties" className="mx-auto w-full max-w-[1440px] px-6 py-24 lg:px-16 lg:py-32">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ type: "spring", stiffness: 160, damping: 24 }}
        className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
      >
        <h2 className="font-serif text-4xl leading-tight tracking-[-0.01em] md:text-5xl">
          Propiedades destacadas
        </h2>
        <p className="max-w-sm text-sm leading-relaxed text-fg/60">
          Una selección de propiedades disponibles para comprar y alquilar en la costa.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ staggerChildren: 0.07 }}
        className="grid grid-cols-1 gap-8 md:grid-cols-6 lg:gap-12"
      >
        {/* 5 cards: two wide on the first row (3 of 6 columns each), three on the second (2 of 6 each). */}
        {properties.slice(0, HOME_LIMIT).map((property, index) => (
          <motion.article
            key={property.id}
            variants={cardVariants}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`group relative flex aspect-square flex-col justify-end overflow-hidden rounded-2xl border border-fg/10 transition-[border-color] duration-300 hover:border-fg/15 ${
              index < 2 ? "md:col-span-3" : "md:col-span-2"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={siteConfig.assets.placeholderProperty}
              alt={property.name}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

            <span
              className={`absolute top-4 left-4 z-10 rounded-full border bg-black/30 px-3 py-1 text-xs backdrop-blur-md ${overlayStatusTone[property.status]}`}
            >
              {badgeLabel(property)}
            </span>

            <div className="relative flex flex-col gap-3 p-6 text-white">
              <div className="text-xs text-white/75">
                <span>{property.location}</span>
              </div>

              <h3 className="font-serif text-2xl leading-snug">{property.name}</h3>
              <p className="text-sm text-white/75">{formatPrice(property.price)}</p>

              <Link
                href={`/properties/${property.id}`}
                className="mt-1 flex items-center gap-1.5 text-sm font-medium text-white/90 transition-colors duration-200 hover:text-white"
              >
                Ver propiedad
                <ArrowRight size={14} aria-hidden />
              </Link>
            </div>
          </motion.article>
        ))}
      </motion.div>

      <div className="mt-16 flex justify-center">
        <Link
          href="/properties"
          className="flex items-center gap-2 rounded-full border border-fg/30 px-8 py-3.5 text-sm font-medium transition-[background-color,transform] duration-200 ease-out hover:bg-fg/10 active:scale-[0.97]"
        >
          Ver todas las propiedades
          <ArrowRight size={14} aria-hidden />
        </Link>
      </div>
    </section>
  );
}
