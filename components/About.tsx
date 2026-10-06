"use client";

import { motion } from "motion/react";

const pillars = [
  {
    title: "Curaduría Exclusiva",
    description:
      "Selección rigurosa de propiedades residenciales y comerciales con alto potencial de inversión, ubicación estratégica y valor de diseño.",
  },
  {
    title: "Seguridad Jurídica",
    description:
      "Asesoría legal y fiscal integral en cada etapa del contrato y del cierre, para que cada transacción sea clara y segura.",
  },
  {
    title: "Atención Personalizada",
    description:
      "Un consultor dedicado y un trato directo, con búsqueda personalizada y absoluta discreción en cada operación.",
  },
  {
    title: "Valuación Real de Mercado",
    description:
      "Valoraciones respaldadas por datos y un conocimiento profundo de cada zona, para fijar precios competitivos y maximizar el rendimiento.",
  },
];

const viewport = { once: true, margin: "-80px" };

const rise = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 160, damping: 24 } },
} as const;

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export default function About() {
  return (
    <section id="nosotros" className="relative border-t border-fg/10 py-24 lg:py-32">
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-16">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            <motion.span variants={rise} className="mb-3 block text-xs font-medium tracking-widest text-emerald-500 uppercase">
              Sobre Nosotros
            </motion.span>
            <motion.h2
              variants={rise}
              className="mb-6 font-serif text-3xl leading-tight tracking-[-0.01em] lg:text-4xl"
            >
              Asesoramiento inmobiliario de precisión y propiedades de alta gama.
            </motion.h2>
            <motion.p variants={rise} className="mb-4 leading-relaxed text-fg/70">
              Somos una firma inmobiliaria dedicada al asesoramiento integral en la compra, venta y alquiler de propiedades destacadas. Combinamos visión de mercado con una atención personalizada para respaldar cada decisión de inversión.
            </motion.p>
            <motion.p variants={rise} className="text-sm leading-relaxed text-fg/60">
              Acompañamos a nuestros clientes durante todo el proceso, con transparencia, confidencialidad y una gestión sin complicaciones de principio a fin.
            </motion.p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6"
          >
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                variants={rise}
                className="rounded-xl border border-fg/10 bg-surface/70 p-6 backdrop-blur-md transition-colors duration-300 hover:border-fg/20"
              >
                <div className="mb-4 font-mono text-sm text-emerald-500">[{String(index + 1).padStart(2, "0")}]</div>
                <h3 className="mb-2 text-base font-medium">{pillar.title}</h3>
                <p className="text-xs leading-relaxed text-fg/60">{pillar.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
