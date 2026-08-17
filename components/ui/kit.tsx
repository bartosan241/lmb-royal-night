"use client";

import Link from "next/link";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./motion-primitives";

/* ------------------------------------------------------------------ */
/*  Button — hard-edged, poster/ticket feel                            */
/* ------------------------------------------------------------------ */

export function GoldButton({
  children,
  href,
  onClick,
  variant = "solid",
  className = "",
  type = "button",
  disabled,
  cursor,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "outline" | "ghost";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  cursor?: string;
}) {
  const base =
    "group relative inline-flex items-center justify-center gap-3 overflow-hidden px-7 py-4 font-mono text-[0.7rem] uppercase tracking-[0.16em] transition-colors duration-300 disabled:pointer-events-none disabled:opacity-35";

  const styles = {
    solid: "bg-gold text-ink hover:bg-gold-light",
    outline:
      "border border-line text-cream hover:border-gold hover:text-gold-light",
    ghost: "text-cream/65 hover:text-gold-light",
  }[variant];

  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      {variant !== "ghost" && (
        <span
          aria-hidden
          className="relative z-10 block h-px w-5 bg-current transition-all duration-300 group-hover:w-8"
        />
      )}
    </>
  );

  const cls = `${base} ${styles} ${className}`;

  return href ? (
    <Link href={href} className={cls} data-cursor={cursor}>
      {inner}
    </Link>
  ) : (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cls}
      data-cursor={cursor}
    >
      {inner}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  SectionHeading — mono index + poster headline, left-aligned        */
/* ------------------------------------------------------------------ */

export function SectionHeading({
  index,
  label,
  title,
  intro,
  align = "left",
  className = "",
}: {
  index?: string;
  label?: string;
  title: React.ReactNode;
  intro?: string;
  align?: "center" | "left";
  className?: string;
}) {
  const isCenter = align === "center";
  return (
    <div className={`${isCenter ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}>
      {label && (
        <Reveal>
          <div
            className={`flex items-center gap-3 ${isCenter ? "justify-center" : ""}`}
          >
            {index && <span className="label text-gold">{index}</span>}
            <span className="h-px w-6 bg-line" />
            <span className="label text-cream/50">{label}</span>
          </div>
        </Reveal>
      )}
      <Reveal delay={0.06}>
        <h2 className="font-display mt-5 text-[clamp(2.1rem,5.5vw,4.5rem)] text-cream">
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.12}>
          <p
            className={`mt-5 max-w-xl text-[0.95rem] leading-relaxed text-cream/55 ${isCenter ? "mx-auto" : ""}`}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Accordion                                                          */
/* ------------------------------------------------------------------ */

export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="border-t border-line">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="border-b border-line">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center gap-6 py-6 text-left"
              aria-expanded={isOpen}
            >
              <span className="label shrink-0 text-gold/60">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={`flex-1 text-[1.05rem] font-medium transition-colors ${isOpen ? "text-gold-light" : "text-cream hover:text-gold-light"}`}
              >
                {it.q}
              </span>
              <span className="relative h-3.5 w-3.5 shrink-0">
                <span className="absolute left-0 top-1/2 h-px w-3.5 -translate-y-1/2 bg-gold" />
                <motion.span
                  className="absolute left-1/2 top-0 h-3.5 w-px -translate-x-1/2 bg-gold"
                  animate={{ scaleY: isOpen ? 0 : 1 }}
                  transition={{ duration: 0.25 }}
                />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-7 pl-11 text-[0.9rem] leading-relaxed text-cream/55">
                    {it.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PriceRow                                                           */
/* ------------------------------------------------------------------ */

export function PriceRow({
  name,
  desc,
  price,
  tag,
  sub,
}: {
  name: string;
  desc?: string;
  price: string;
  tag?: string;
  sub?: string;
}) {
  return (
    <div className="group flex items-baseline gap-4 py-4">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="text-[1.02rem] font-medium text-cream transition-colors group-hover:text-gold-light">
            {name}
          </span>
          {sub && <span className="label text-cream/30">{sub}</span>}
          {tag && <Badge>{tag}</Badge>}
        </div>
        {desc && (
          <p className="mt-1.5 max-w-lg text-[0.85rem] leading-relaxed text-cream/40">
            {desc}
          </p>
        )}
      </div>
      <div
        aria-hidden
        className="mx-2 hidden min-w-6 flex-1 translate-y-[-4px] border-b border-dotted border-line sm:block"
      />
      <span className="font-mono shrink-0 text-sm text-gold">{price}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Badge                                                              */
/* ------------------------------------------------------------------ */

export function Badge({
  children,
  tone = "gold",
}: {
  children: React.ReactNode;
  tone?: "gold" | "dark";
}) {
  const t =
    tone === "gold"
      ? "border-gold/45 bg-gold/12 text-gold-light"
      : "border-line bg-ink-3 text-cream/55";
  return (
    <span
      className={`label inline-flex items-center border px-2.5 py-1 ${t}`}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Stat — mono label + poster number                                  */
/* ------------------------------------------------------------------ */

export function Stat({
  value,
  label,
}: {
  value: React.ReactNode;
  label: string;
}) {
  return (
    <div>
      <p className="font-display text-4xl text-gold">{value}</p>
      <p className="label mt-2 text-cream/40">{label}</p>
    </div>
  );
}
