"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { GoldButton } from "@/components/ui/kit";
import { VENUE } from "@/lib/data";

const SLIDES = [
  { src: "/img/club-06.jpg", alt: "Lightshow doré sur le dancefloor du LMB", tag: "SAMEDI · ROYAL SATURDAY" },
  { src: "/img/champ-06.jpg", alt: "Bouteille de champagne et sparklers", tag: "DÉFILÉ BOUTEILLE" },
  { src: "/img/bar-09.jpg", alt: "Carré VIP en velours", tag: "CARRÉS VIP" },
  { src: "/img/club-04.jpg", alt: "Ambiance dancefloor", tag: "AFROBEATS NIGHT" },
];

export default function Hero() {
  const [i, setI] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const touchX = useRef<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "38%"]);
  const yImg = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  /* Le parallaxe n'a de sens qu'en deux colonnes. En une seule colonne il fait
     descendre le texte pendant que l'image monte : les deux se chevauchent. */
  useEffect(() => {
    const mq = window.matchMedia(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)"
    );
    const apply = () => setIsDesktop(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const go = (d: number) =>
    setI((v) => (v + d + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    const t = setInterval(() => go(1), 5200);
    return () => clearInterval(t);
  }, [i]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    touchX.current = null;
  };

  return (
    <section
      ref={ref}
      className="grain relative min-h-[100svh] overflow-hidden border-b border-line pt-24"
    >
      {/* ---- vertical grid rules ---- */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 mx-auto hidden max-w-[1600px] grid-cols-12 px-6 lg:grid"
      >
        {Array.from({ length: 13 }).map((_, k) => (
          <div key={k} className="border-l border-line/45 last:border-r" />
        ))}
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1600px] grid-cols-1 gap-10 px-5 pb-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 lg:pb-24">
        {/* ------------- Left: type block ------------- */}
        <motion.div
          style={isDesktop ? { y: yText, opacity: fade } : undefined}
          className="flex flex-col justify-center pt-8 lg:pt-0"
        >
          {/* meta line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-wrap items-center gap-x-4 gap-y-2"
          >
            <span className="label border border-gold/45 px-2.5 py-1.5 text-gold">
              BAR · LOUNGE · CLUB
            </span>
            <span className="label text-cream/45">
              {VENUE.city.toUpperCase()} — {VENUE.country.toUpperCase()}
            </span>
            <span className="h-px flex-1 bg-line" />
          </motion.div>

          {/* headline */}
          <h1 className="font-display hero-type mt-7 text-cream">
            {["ROYAL", "NIGHT"].map((w, wi) => (
              <span key={w} className="block overflow-hidden">
                <motion.span
                  className={`inline-block ${wi === 1 ? "text-gold" : ""}`}
                  initial={{ y: "104%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 1.05,
                    delay: 0.25 + wi * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* sub */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 border-t border-line pt-7"
          >
            <p className="max-w-lg text-[0.95rem] leading-relaxed text-cream/60">
              Bar, lounge et club au Quartier&nbsp;Louis. Réservez votre carré,
              composez votre seau bouteille par bouteille, choisissez votre
              champagne — la table est prête avant que vous n&apos;arriviez.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <GoldButton href="/reservation" cursor="Composer ma table">
              Réserver une table
            </GoldButton>
            <GoldButton href="/carte" variant="outline">
              La carte
            </GoldButton>
          </motion.div>
        </motion.div>

        {/* ------------- Right: image stack ------------- */}
        <motion.div
          style={isDesktop ? { y: yImg } : undefined}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-h-[340px] lg:min-h-[78vh]"
        >
          <div
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            className="relative h-full w-full touch-pan-y overflow-hidden border border-line select-none"
          >
            {SLIDES.map((s, idx) => (
              <motion.div
                key={s.src}
                className="absolute inset-0"
                initial={false}
                animate={{ opacity: i === idx ? 1 : 0 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src={s.src}
                  alt={s.alt}
                  className="h-full w-full object-cover"
                  fetchPriority={idx === 0 ? "high" : "auto"}
                />
              </motion.div>
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />

            {/* caption + counter */}
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
              <motion.span
                key={SLIDES[i].tag}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="label bg-ink/70 px-2.5 py-1.5 text-gold-light backdrop-blur-sm"
              >
                {SLIDES[i].tag}
              </motion.span>
              <span className="label text-cream/60">
                {String(i + 1).padStart(2, "0")}/
                {String(SLIDES.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* slide ticks */}
          <div className="mt-3 flex gap-1.5">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Visuel ${idx + 1}`}
                className="group flex-1 py-2"
              >
                <span
                  className={`block h-[2px] transition-colors duration-500 ${
                    i === idx ? "bg-gold" : "bg-line group-hover:bg-cream/40"
                  }`}
                />
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
