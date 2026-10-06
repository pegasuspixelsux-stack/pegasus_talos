"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

interface PropertyGalleryProps {
  images: string[];
  alt: string;
  // Rendered over the image, bottom-left. Keep text light here: the image is dark-tinted in both themes.
  children?: React.ReactNode;
}

export default function PropertyGallery({ images, alt, children }: PropertyGalleryProps) {
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const count = images.length;

  const next = () => setIndex((i) => (i + 1) % count);
  const prev = () => setIndex((i) => (i - 1 + count) % count);

  // Keyboard support for the lightbox: arrows move, Escape closes.
  useEffect(() => {
    if (!lightbox) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % count);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + count) % count);
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, count]);

  const counter = `${String(index + 1).padStart(2, "0")} / ${String(count).padStart(2, "0")}`;

  return (
    <>
      <section className="relative h-[70svh] min-h-[500px] w-full overflow-hidden bg-canvas">
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={images[index]}
            src={images[index]}
            alt={`${alt} ${index + 1}`}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

        {children}

        <div className="absolute right-6 bottom-6 z-20 flex items-center gap-3">
          <span className="rounded-full border border-white/15 bg-black/50 px-3 py-1.5 font-mono text-xs text-white backdrop-blur-md">
            {counter}
          </span>
          <button
            type="button"
            onClick={prev}
            aria-label="Imagen anterior"
            className="rounded-full border border-white/15 bg-black/50 p-2.5 text-white backdrop-blur-md transition-[background-color,transform] duration-200 hover:bg-white/20 active:scale-[0.94]"
          >
            <ChevronLeft size={18} aria-hidden />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Imagen siguiente"
            className="rounded-full border border-white/15 bg-black/50 p-2.5 text-white backdrop-blur-md transition-[background-color,transform] duration-200 hover:bg-white/20 active:scale-[0.94]"
          >
            <ChevronRight size={18} aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => setLightbox(true)}
            aria-label="Ver en pantalla completa"
            className="rounded-full border border-white/15 bg-black/50 p-2.5 text-white backdrop-blur-md transition-[background-color,transform] duration-200 hover:bg-white/20 active:scale-[0.94]"
          >
            <Maximize2 size={18} aria-hidden />
          </button>
        </div>
      </section>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Vista previa de imagen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setLightbox(false)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-6 backdrop-blur-sm"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[index]}
              alt={`${alt} ${index + 1}`}
              onClick={(e) => e.stopPropagation()}
              className="max-h-full max-w-full rounded-2xl object-contain"
            />
            <button
              type="button"
              onClick={() => setLightbox(false)}
              aria-label="Cerrar vista previa"
              className="absolute top-6 right-6 rounded-full border border-white/15 bg-black/50 p-2.5 text-white transition-colors duration-200 hover:bg-white/20"
            >
              <X size={18} aria-hidden />
            </button>
            <span className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs text-white/70">
              {counter}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
