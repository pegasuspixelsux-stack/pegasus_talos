"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { properties, zones } from "@/config/catalog";
import { siteConfig } from "@/config/site.config";

const viewport = { once: true, margin: "-80px" };

const rise = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 160, damping: 24 } },
} as const;

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

function countLabel(count: number) {
  if (count === 0) return "Consultar disponibilidad";
  return `${count} ${count === 1 ? "propiedad" : "propiedades"}`;
}

export default function Zones() {
  return (
    <section className="relative border-t border-fg/10 py-24 lg:py-32">
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-16">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger}
          className="mb-14 max-w-2xl"
        >
          <motion.span variants={rise} className="mb-3 block text-xs font-medium tracking-widest text-emerald-500 uppercase">
            Destinos exclusivos
          </motion.span>
          <motion.h2 variants={rise} className="mb-4 font-serif text-4xl leading-tight tracking-[-0.01em] md:text-5xl">
            Explore por ubicación
          </motion.h2>
          <motion.p variants={rise} className="text-sm leading-relaxed text-fg/60">
            Recorra nuestro catálogo filtrado por las zonas más codiciadas de la costa.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {zones.map((zone) => {
            const zoneProperties = properties.filter((property) => property.area === zone.area);
            const image = zoneProperties[0]?.images[0] ?? siteConfig.assets.placeholderProperty;

            return (
              <motion.div key={zone.slug} variants={rise}>
                <Link
                  href={`/properties?zona=${zone.slug}`}
                  className="group relative flex h-80 cursor-pointer flex-col justify-end overflow-hidden rounded-2xl border border-fg/10 p-6 text-white transition-[border-color,box-shadow] duration-300 hover:border-emerald-400/50 hover:shadow-[0_0_32px_rgba(52,211,153,0.2)]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image}
                    alt={zone.name}
                    className="absolute inset-0 h-full w-full object-cover opacity-70 transition-[transform,opacity] duration-500 ease-out group-hover:scale-105 group-hover:opacity-85"
                  />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />

                  <div className="relative z-10 flex flex-col gap-2">
                    <span className="w-fit rounded-full border border-emerald-300/50 bg-black/40 px-2.5 py-1 text-[10px] font-semibold tracking-widest text-emerald-300 uppercase backdrop-blur-md">
                      {zone.descriptor}
                    </span>
                    <h3 className="font-serif text-2xl leading-snug">{zone.name}</h3>
                    <p className="flex items-center justify-between text-xs text-white/75">
                      <span>{countLabel(zoneProperties.length)}</span>
                      <ArrowRight
                        size={14}
                        aria-hidden
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
