"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GALERIE } from "@/lib/data";
import { Reveal } from "@/components/ui/motion-primitives";
import { GoldButton } from "@/components/ui/kit";

export default function GalerieGrid() {
  const [open, setOpen] = useState<number | null>(null);

  const move = useCallback(
    (d: number) =>
      setOpen((i) =>
        i === null ? null : (i + d + GALERIE.length) % GALERIE.length
      ),
    []
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, move]);

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
        {/* Masonry via CSS columns: fills without leaving holes whatever the
            item count, and keeps each photo's natural aspect ratio. */}
        <div className="columns-2 gap-3 sm:gap-4 lg:columns-3 xl:columns-4">
          {GALERIE.map((g, i) => (
            <Reveal
              key={`${g.src}-${i}`}
              delay={(i % 4) * 0.06}
              className="mb-3 break-inside-avoid sm:mb-4"
            >
              <button
                onClick={() => setOpen(i)}
                data-cursor="Agrandir"
                className="group relative block w-full overflow-hidden"
              >
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  className="w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-ink/40 transition-opacity duration-500 group-hover:opacity-10" />
                <div className="absolute inset-x-0 bottom-0 translate-y-3 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-left text-[0.72rem] tracking-[0.1em] text-cream/85">
                    {g.alt}
                  </p>
                </div>
                <span className="pointer-events-none absolute inset-0 border border-gold/0 transition-colors duration-500 group-hover:border-gold/45" />
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-16 text-center">
            <p className="mx-auto max-w-lg text-sm leading-relaxed text-cream/45">
              Envie de voir votre soirée ici ? Réservez votre table et ajoutez
              l&apos;option photographe.
            </p>
            <div className="mt-7">
              <GoldButton href="/reservation">Réserver une table</GoldButton>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[160] flex items-center justify-center bg-ink/96 p-4 backdrop-blur-sm sm:p-10"
            onClick={() => setOpen(null)}
          >
            <button
              onClick={() => setOpen(null)}
              aria-label="Fermer"
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center border border-gold/45 text-gold transition-colors hover:bg-gold hover:text-ink sm:right-8 sm:top-8"
            >
              ✕
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                move(-1);
              }}
              aria-label="Précédent"
              className="absolute left-3 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-gold/25 text-gold transition-colors hover:bg-gold hover:text-ink sm:left-8"
            >
              ←
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                move(1);
              }}
              aria-label="Suivant"
              className="absolute right-3 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-gold/25 text-gold transition-colors hover:bg-gold hover:text-ink sm:right-8"
            >
              →
            </button>

            <motion.figure
              key={open}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="max-h-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={GALERIE[open].src}
                alt={GALERIE[open].alt}
                className="max-h-[78vh] w-auto object-contain"
              />
              <figcaption className="mt-4 flex items-center justify-between gap-4 text-[0.75rem] text-cream/50">
                <span>{GALERIE[open].alt}</span>
                <span className="text-gold/60">
                  {String(open + 1).padStart(2, "0")} /{" "}
                  {String(GALERIE.length).padStart(2, "0")}
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
