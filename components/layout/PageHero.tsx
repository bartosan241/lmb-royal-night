"use client";

import { motion } from "framer-motion";

export default function PageHero({
  label,
  title,
  intro,
  image,
  index = "01",
  compact = false,
}: {
  label: string;
  title: React.ReactNode;
  intro?: string;
  image: string;
  index?: string;
  compact?: boolean;
}) {
  return (
    <section className="grain relative overflow-hidden border-b border-line pt-28 sm:pt-32">
      {/* background image, right-anchored, heavily veiled */}
      <motion.div
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-y-0 right-0 w-full lg:w-[58%]"
      >
        <img src={image} alt="" aria-hidden className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/72" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/25" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink to-transparent" />
      </motion.div>

      <div
        className={`relative z-10 mx-auto max-w-[1600px] px-5 sm:px-6 ${
          compact ? "pb-14 sm:pb-16" : "pb-20 sm:pb-28"
        }`}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="flex items-center gap-3"
        >
          <span className="label text-gold">{index}</span>
          <span className="h-px w-8 bg-line" />
          <span className="label text-cream/50">{label}</span>
        </motion.div>

        <h1 className="font-display mt-6 max-w-4xl text-[clamp(2.6rem,8vw,6.5rem)] text-cream">
          <span className="block overflow-hidden">
            <motion.span
              className="inline-block"
              initial={{ y: "104%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              {title}
            </motion.span>
          </span>
        </h1>

        {intro && (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-7 max-w-xl border-t border-line pt-6 text-[0.95rem] leading-relaxed text-cream/60"
          >
            {intro}
          </motion.p>
        )}
      </div>
    </section>
  );
}
