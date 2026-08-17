import Link from "next/link";
import { VENUE } from "@/lib/data";
import { Marquee } from "@/components/ui/motion-primitives";

const COLS = [
  {
    title: "Découvrir",
    links: [
      { href: "/espaces", label: "Nos espaces" },
      { href: "/carte", label: "La carte" },
      { href: "/formules", label: "Seaux & formules" },
      { href: "/evenements", label: "Programmation" },
      { href: "/galerie", label: "Galerie" },
    ],
  },
  {
    title: "Réserver",
    links: [
      { href: "/reservation", label: "Table lounge" },
      { href: "/reservation?espace=vip", label: "Carré VIP" },
      { href: "/reservation?espace=royale", label: "Loge Royale" },
      { href: "/reservation?espace=privatisation", label: "Privatisation" },
      { href: "/contact", label: "Nous contacter" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink-2">
      <div className="border-b border-line py-5">
        <Marquee
          items={[
            "LMB ROYAL NIGHT",
            "BAR & LOUNGE",
            "LIBREVILLE · GABON",
            "OUVERT DU MARDI AU DIMANCHE",
            "RÉSERVATION 24/7",
          ]}
          speed={46}
          className="font-display text-2xl tracking-[0.12em] text-cream/25 sm:text-3xl"
        />
      </div>

      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <img
              src="/logo-lmb.png"
              alt="LMB Royal Night"
              className="h-24 w-24 object-contain"
            />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-cream/45">
              Le rendez-vous des nuits de Libreville. Bar, lounge et club —
              une adresse pensée pour ceux qui savent recevoir.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { href: VENUE.instagram, label: "Instagram", short: "IG" },
                { href: VENUE.facebook, label: "Facebook", short: "FB" },
                {
                  href: `https://wa.me/${VENUE.phoneRaw}`,
                  label: "WhatsApp",
                  short: "WA",
                },
              ].map((s) => (
                <a
                  key={s.short}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/25 text-[0.6rem] tracking-[0.1em] text-gold/80 transition-all duration-400 hover:border-gold hover:bg-gold hover:text-ink"
                >
                  {s.short}
                </a>
              ))}
            </div>
          </div>

          {COLS.map((c) => (
            <div key={c.title}>
              <h3 className="label text-gold">{c.title}</h3>
              <ul className="mt-6 space-y-3">
                {c.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-cream/50 transition-colors hover:text-gold-light"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Hours + contact */}
          <div>
            <h3 className="label text-gold">Ouverture</h3>
            <ul className="mt-6 space-y-2">
              {VENUE.hours.map((h) => (
                <li
                  key={h.d}
                  className="flex justify-between gap-4 text-[0.82rem]"
                >
                  <span className="text-cream/50">{h.d}</span>
                  <span
                    className={
                      "closed" in h && h.closed ? "text-cream/25" : "text-gold/80"
                    }
                  >
                    {h.h}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-7 space-y-2 border-t border-line pt-6 text-sm">
              <p className="text-cream/50">{VENUE.address}</p>
              <a
                href={`tel:${VENUE.phone.replace(/\s/g, "")}`}
                className="block text-gold transition-colors hover:text-gold-light"
              >
                {VENUE.phone}
              </a>
              <a
                href={`mailto:${VENUE.email}`}
                className="block text-cream/50 transition-colors hover:text-gold-light"
              >
                {VENUE.email}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 text-[0.7rem] text-cream/30 sm:flex-row">
          <p>© {new Date().getFullYear()} LMB Royal Night — Tous droits réservés.</p>
          <p className="flex items-center gap-2 text-center">
            L&apos;abus d&apos;alcool est dangereux pour la santé.
            <span className="text-gold/40">·</span> Interdit aux moins de 18 ans.
          </p>
        </div>
      </div>
    </footer>
  );
}
