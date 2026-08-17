"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SEAUX, BOUTEILLES, CAT_LABEL, EXTRAS, fcfa } from "@/lib/data";
import { GoldButton, SectionHeading, Badge } from "@/components/ui/kit";
import { Reveal, TiltCard, Marquee } from "@/components/ui/motion-primitives";

/** Packs pré-composés, pensés pour les tables qui veulent aller vite. */
const PACKS = [
  {
    id: "duo",
    name: "Pack Duo",
    price: 65000,
    desc: "Pour deux, sans se poser de questions.",
    includes: [
      "1 bouteille de spiritueux au choix (≤ 80 000)",
      "4 softs au choix",
      "1 planche de nems",
      "Table lounge garantie",
    ],
    image: "/img/cock-04.jpg",
  },
  {
    id: "amis",
    name: "Pack Entre Amis",
    price: 180000,
    desc: "Le format qui marche pour une tablée de six.",
    includes: [
      "1 Seau Classique (10 bouteilles au choix)",
      "1 bouteille de spiritueux au choix (≤ 90 000)",
      "1 planche mixte",
      "Carré VIP selon disponibilité",
    ],
    image: "/img/afro-03.jpg",
    badge: "Le plus commandé",
  },
  {
    id: "anniv",
    name: "Pack Anniversaire",
    price: 320000,
    desc: "Tout ce qu'il faut pour que la salle sache que c'est votre soir.",
    includes: [
      "1 Moët Impérial + défilé bouteille",
      "1 Seau Royal (15 bouteilles au choix)",
      "Gâteau 8 parts & sparklers",
      "Message LED personnalisé",
      "Planche Royale",
    ],
    image: "/img/champ-06.jpg",
    badge: "Signature",
  },
  {
    id: "royal",
    name: "Pack Royal",
    price: 850000,
    desc: "La loge, la cave, le cortège. La totale.",
    includes: [
      "Loge Royale privatisée",
      "1 Dom Pérignon + 1 Moët Impérial",
      "1 Seau Empereur (24 bouteilles)",
      "Défilé bouteille & photographe",
      "Majordome de table & voiturier",
    ],
    image: "/img/club-08.jpg",
  },
];

export default function FormulesContent() {
  const [format, setFormat] = useState(SEAUX[1].id);
  const active = SEAUX.find((s) => s.id === format)!;

  return (
    <>
      {/* ---------- Seaux ---------- */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <SectionHeading
            label="Les seaux"
            title={
              <>
                Quatre formats,
                <br />
                <em className="text-gold">un seul principe</em>
              </>
            }
            intro="Plus le seau est grand, plus la remise est forte. Le contenu, lui, est entièrement libre."
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            {/* Format selector */}
            <div className="space-y-3">
              {SEAUX.map((s) => {
                const on = format === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setFormat(s.id)}
                    className={`flex w-full items-center gap-5 p-5 text-left transition-all duration-400 ${
                      on ? "border border-gold bg-gold/8" : "panel hover:border-gold/50"
                    }`}
                  >
                    <span
                      className={`font-display text-4xl leading-none transition-colors ${
                        on ? "text-gold" : "text-gold/25"
                      }`}
                    >
                      {s.count}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="font-display text-lg text-cream">
                          {s.name}
                        </span>
                        {s.badge && <Badge>{s.badge}</Badge>}
                      </span>
                      <span className="mt-1 block text-[0.78rem] text-cream/45">
                        {s.desc}
                      </span>
                    </span>
                    <span className="shrink-0 text-sm text-gold">
                      −{Math.round(s.discount * 100)} %
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Detail panel */}
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="panel glass flex flex-col p-8"
            >
              <p className="label text-gold">{active.name}</p>
              <p className="font-display mt-4 text-5xl text-cream">
                {active.count}{" "}
                <span className="text-2xl text-cream/40">bouteilles</span>
              </p>

              <div className="mt-7 space-y-2.5 border-t border-line pt-6">
                {(["biere", "booster", "premix"] as const).map((c) => (
                  <div key={c} className="flex items-baseline justify-between gap-4">
                    <span className="text-sm text-cream/55">{CAT_LABEL[c]}</span>
                    <span className="text-[0.78rem] text-cream/35">
                      {BOUTEILLES.filter((b) => b.cat === c).length} références —
                      dès{" "}
                      {fcfa(
                        Math.min(
                          ...BOUTEILLES.filter((b) => b.cat === c).map((b) => b.unit)
                        )
                      )}
                    </span>
                  </div>
                ))}
              </div>

              {active.offert && (
                <p className="mt-6 border-l-2 border-gold/50 bg-gold/5 py-3 pl-4 text-sm italic text-gold/85">
                  {active.offert}
                </p>
              )}

              <div className="mt-7 border-t border-line pt-6">
                <p className="text-[0.62rem] uppercase tracking-[0.2em] text-cream/40">
                  Exemple — {active.count} Booster Blue Paradise
                </p>
                <div className="mt-3 flex items-end justify-between">
                  <span className="text-sm text-cream/35 line-through">
                    {fcfa(3000 * active.count)}
                  </span>
                  <span className="font-display text-3xl text-gold">
                    {fcfa(
                      Math.round((3000 * active.count * (1 - active.discount)) / 500) * 500
                    )}
                  </span>
                </div>
              </div>

              <div className="mt-8">
                <GoldButton href="/reservation" cursor="Composer">
                  Composer ce seau
                </GoldButton>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="border-y border-line bg-ink-2 py-4">
        <Marquee
          items={BOUTEILLES.slice(0, 12).map((b) => b.name)}
          speed={55}
          className="label text-gold/55"
        />
      </div>

      {/* ---------- Packs ---------- */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <SectionHeading
            label="Packs prêts à réserver"
            title={
              <>
                Pour ceux qui veulent
                <br />
                <em className="text-gold">décider en une minute</em>
              </>
            }
            intro="Des combinaisons éprouvées, au tarif déjà négocié. Chaque pack reste modifiable à l'étape suivante."
          />

          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {PACKS.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.08}>
                <TiltCard className="group h-full" max={6}>
                  <div className="panel relative flex h-full flex-col overflow-hidden bg-ink-2/50 transition-colors duration-500 hover:border-gold/45">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-full w-full object-cover transition-transform duration-[1.3s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-108"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                      {p.badge && (
                        <span className="absolute left-5 top-5">
                          <Badge>{p.badge}</Badge>
                        </span>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col p-7">
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="font-display text-2xl text-cream">
                          {p.name}
                        </h3>
                        <span className="font-display shrink-0 text-xl text-gold">
                          {fcfa(p.price)}
                        </span>
                      </div>
                      <p className="mt-2 text-[0.82rem] text-cream/45">{p.desc}</p>

                      <ul className="mt-6 flex-1 space-y-2.5 border-t border-line pt-6">
                        {p.includes.map((it) => (
                          <li
                            key={it}
                            className="flex items-start gap-3 text-[0.85rem] text-cream/60"
                          >
                            <span className="mt-2 h-1 w-1 shrink-0 rotate-45 bg-gold" />
                            {it}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-7">
                        <GoldButton
                          href="/reservation"
                          variant="outline"
                          className="!px-6 !py-3"
                        >
                          Réserver ce pack
                        </GoldButton>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Options ---------- */}
      <section className="border-t border-line bg-ink-2 py-24 sm:py-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <SectionHeading
            label="Les options"
            title={
              <>
                Les détails qui font
                <br />
                <em className="text-gold">la différence</em>
              </>
            }
            intro="À ajouter à n'importe quelle réservation, quel que soit l'espace ou le budget."
          />

          <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {EXTRAS.map((e, i) => (
              <Reveal key={e.id} delay={(i % 4) * 0.06}>
                <div className="panel flex h-full flex-col p-6 transition-colors duration-400 hover:border-gold/45">
                  <p className="font-display text-lg text-cream">{e.name}</p>
                  <p className="mt-2 flex-1 text-[0.8rem] leading-relaxed text-cream/45">
                    {e.desc}
                  </p>
                  <p className="mt-5 border-t border-line pt-4 text-sm text-gold">
                    {fcfa(e.price)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-14 text-center">
              <GoldButton href="/reservation">Composer ma soirée</GoldButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
