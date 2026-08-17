"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import React, { useEffect, useState } from "react";

/* ================================================================== */
/*  Preloader — logo + gold sweep + progress                           */
/* ================================================================== */

export function Preloader() {
  const [done, setDone] = useState(false);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    // Only show on first visit of the session.
    if (sessionStorage.getItem("lmb-seen")) {
      setDone(true);
      return;
    }
    document.body.style.overflow = "hidden";
    let raf = 0;
    const start = performance.now();
    const DUR = 2000;
    const tick = (now: number) => {
      const p = Math.min((now - start) / DUR, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setPct(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        sessionStorage.setItem("lmb-seen", "1");
        setTimeout(() => setDone(true), 380);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ink"
          exit={{ opacity: 0, filter: "blur(12px)" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.86 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* rotating gold ring */}
            <motion.div
              aria-hidden
              className="absolute -inset-8 rounded-full"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0deg, rgba(212,175,95,0.55) 90deg, transparent 180deg)",
                maskImage:
                  "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))",
                WebkitMaskImage:
                  "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
            />
            <img
              src="/logo-lmb.png"
              alt="LMB"
              className="h-40 w-40 object-contain drop-shadow-[0_0_28px_rgba(212,175,95,0.35)] sm:h-52 sm:w-52"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-10 w-52"
          >
            <div className="h-px w-full bg-gold/15">
              <motion.div
                className="h-px bg-gradient-to-r from-gold-deep via-gold-light to-gold-deep"
                style={{ width: `${pct}%` }}
              />
            </div>
            <div className="mt-3 flex justify-between font-sans text-[0.6rem] tracking-[0.35em] text-gold/60">
              <span>ROYAL NIGHT</span>
              <span>{String(pct).padStart(3, "0")}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ================================================================== */
/*  CustomCursor — gold ring, grows on interactive elements            */
/* ================================================================== */

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 34, mass: 0.28 });
  const sy = useSpring(y, { stiffness: 500, damping: 34, mass: 0.28 });

  useEffect(() => {
    const fine =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-none-desktop");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const el = (e.target as HTMLElement)?.closest(
        "a,button,[role=button],input,select,textarea,[data-cursor]"
      );
      setHovering(!!el);
      setLabel(el?.getAttribute("data-cursor") ?? null);
    };
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.documentElement.classList.remove("cursor-none-desktop");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[150] -translate-x-1/2 -translate-y-1/2"
        style={{ x: sx, y: sy }}
      >
        <motion.div
          className="flex items-center justify-center rounded-full border border-gold/70"
          animate={{
            width: label ? 88 : hovering ? 46 : 26,
            height: label ? 88 : hovering ? 46 : 26,
            opacity: visible ? 1 : 0,
            backgroundColor: hovering
              ? "rgba(212,175,95,0.10)"
              : "rgba(212,175,95,0)",
          }}
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
        >
          {label && (
            <span className="text-center text-[0.55rem] font-medium uppercase leading-tight tracking-[0.18em] text-gold-light">
              {label}
            </span>
          )}
        </motion.div>
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[150] h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-light"
        style={{ x, y, opacity: visible && !hovering ? 1 : 0 }}
      />
    </>
  );
}

/* ================================================================== */
/*  ScrollProgress — gold panel at the top of the viewport          */
/* ================================================================== */

export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? window.scrollY / h : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[120] h-px origin-left bg-gradient-to-r from-gold-deep via-gold-light to-gold-deep"
      style={{ transform: `scaleX(${p})` }}
    />
  );
}

/* ================================================================== */
/*  Noise + atmosphere layer                                  */
/* ================================================================== */

export function Atmosphere() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100]"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, transparent 45%, rgba(3,3,6,0.35) 100%)",
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.045] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
