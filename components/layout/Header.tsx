"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { VENUE } from "@/lib/data";
import { GoldButton } from "@/components/ui/kit";

const NAV = [
  { href: "/", label: "Accueil" },
  { href: "/espaces", label: "Espaces" },
  { href: "/carte", label: "La carte" },
  { href: "/formules", label: "Seaux & Formules" },
  { href: "/evenements", label: "Programmation" },
  { href: "/galerie", label: "Galerie" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-[130] transition-all duration-500 ${
          scrolled
            ? "glass border-b border-line py-3"
            : "border-b border-transparent py-6"
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-5 sm:px-6">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label="LMB Royal Night — accueil"
          >
            <img
              src="/logo-lmb.png"
              alt=""
              className={`object-contain transition-all duration-500 ${
                scrolled ? "h-11 w-11" : "h-14 w-14"
              }`}
            />
            <span className="hidden leading-none sm:block">
              <span className="font-display block text-xl text-cream">
                Royal Night
              </span>
              <span className="label mt-1.5 block text-gold/70">
                BAR &amp; LOUNGE — LIBREVILLE
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 xl:flex">
            {NAV.slice(1, 6).map((n) => {
              const active = pathname === n.href;
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className="label group relative text-cream/65 transition-colors hover:text-gold-light"
                >
                  {n.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-px bg-gold transition-all duration-500 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${VENUE.phone.replace(/\s/g, "")}`}
              className="label hidden text-cream/60 transition-colors hover:text-gold lg:block"
            >
              {VENUE.phone}
            </a>
            <div className="hidden sm:block">
              <GoldButton href="/reservation" className="!px-6 !py-3" cursor="Réserver">
                Réserver
              </GoldButton>
            </div>

            {/* Burger */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              className="relative z-[141] flex h-11 w-11 items-center justify-center xl:hidden"
            >
              <span className="relative block h-3 w-6">
                <motion.span
                  className="absolute left-0 block h-px w-full bg-gold"
                  animate={open ? { top: 6, rotate: 45 } : { top: 0, rotate: 0 }}
                  transition={{ duration: 0.35 }}
                />
                <motion.span
                  className="absolute left-0 block h-px w-full bg-gold"
                  animate={
                    open ? { top: 6, rotate: -45 } : { top: 12, rotate: 0 }
                  }
                  transition={{ duration: 0.35 }}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Fullscreen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[135] bg-ink/97 backdrop-blur-xl"
          >
            <div className="flex h-full flex-col justify-center px-8 sm:px-16">
              <nav className="space-y-1">
                {NAV.map((n, i) => (
                  <motion.div
                    key={n.href}
                    initial={{ opacity: 0, y: 26 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.08 + i * 0.06,
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={n.href}
                      className="font-display group flex items-baseline gap-4 py-2 text-4xl  text-cream/85 transition-colors hover:text-gold-light sm:text-5xl"
                    >
                      <span className="font-sans text-[0.6rem] tracking-[0.2em] text-gold/45">
                        0{i + 1}
                      </span>
                      {n.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-12 space-y-4 border-t border-gold/15 pt-8"
              >
                <GoldButton href="/reservation">Réserver une table</GoldButton>
                <div className="space-y-1 text-sm text-cream/45">
                  <p>{VENUE.address}</p>
                  <a href={`tel:${VENUE.phone.replace(/\s/g, "")}`} className="block text-gold">
                    {VENUE.phone}
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
