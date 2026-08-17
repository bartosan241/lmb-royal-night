"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CHAMPAGNES,
  SPIRITUEUX,
  COCKTAILS,
  BOUTEILLES,
  CHICHAS,
  TAPAS,
  SOFTS,
  CAT_LABEL,
  fcfa,
} from "@/lib/data";
import { PriceRow, GoldButton, SectionHeading } from "@/components/ui/kit";
import { Reveal, ParallaxImage } from "@/components/ui/motion-primitives";

const TABS = [
  { id: "champagne", label: "Champagnes" },
  { id: "spiritueux", label: "Spiritueux" },
  { id: "cocktails", label: "Cocktails" },
  { id: "bieres", label: "Bières & Booster" },
  { id: "chicha", label: "Chicha" },
  { id: "tapas", label: "Tapas" },
  { id: "softs", label: "Softs" },
];

const TAB_IMAGE: Record<string, string> = {
  champagne: "/img/champ-06.jpg",
  spiritueux: "/img/bar-06.jpg",
  cocktails: "/img/cock-04.jpg",
  bieres: "/img/club-05.jpg",
  chicha: "/img/chicha-01.jpg",
  tapas: "/img/cock-03.jpg",
  softs: "/img/cock-01.jpg",
};

export default function CarteContent() {
  const [tab, setTab] = useState("champagne");

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        {/* Tabs */}
        <div className="sticky top-16 z-30 -mx-5 bg-ink/92 px-5 py-4 backdrop-blur-md sm:-mx-8 sm:px-8">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`shrink-0 border px-5 py-2.5 text-[0.66rem] uppercase tracking-[0.14em] transition-all duration-300 ${
                  tab === t.id
                    ? "border-gold bg-gold text-ink"
                    : "border-line text-cream/55 hover:border-gold/55 hover:text-gold-light"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_360px] lg:gap-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {tab === "champagne" && (
                <Block
                  title="Cave à champagne"
                  note="Toute bouteille est servie avec seau, glace pilée, softs au choix et sparklers. Le défilé avec cortège se commande en supplément."
                >
                  {CHAMPAGNES.map((c) => (
                    <PriceRow
                      key={c.id}
                      name={c.name}
                      desc={c.desc}
                      sub={`${c.house} · ${c.vol}`}
                      tag={c.tag}
                      price={fcfa(c.price)}
                    />
                  ))}
                </Block>
              )}

              {tab === "spiritueux" && (
                <Block
                  title="Spiritueux"
                  note="Bouteille servie avec deux softs et un seau de glace. Softs supplémentaires : 2 500 FCFA."
                >
                  {SPIRITUEUX.map((s) => (
                    <PriceRow
                      key={s.id}
                      name={s.name}
                      sub={`${s.house} · ${s.vol}`}
                      tag={s.tag}
                      price={fcfa(s.price)}
                    />
                  ))}
                </Block>
              )}

              {tab === "cocktails" && (
                <Block
                  title="Cocktails signature"
                  note="Préparés au shaker, à la commande. Nos deux signatures sont conçues par le chef de bar de la maison."
                >
                  {COCKTAILS.map((c) => (
                    <PriceRow
                      key={c.name}
                      name={c.name}
                      desc={c.desc}
                      tag={c.tag}
                      price={fcfa(c.price)}
                    />
                  ))}
                </Block>
              )}

              {tab === "bieres" && (
                <div className="space-y-14">
                  {(["biere", "booster", "premix"] as const).map((cat) => (
                    <Block
                      key={cat}
                      title={CAT_LABEL[cat]}
                      note={
                        cat === "booster"
                          ? "Disponibles à l'unité ou en seau de 6, 10, 15 ou 24 — à panacher librement."
                          : undefined
                      }
                    >
                      {BOUTEILLES.filter((b) => b.cat === cat).map((b) => (
                        <PriceRow
                          key={b.id}
                          name={b.name}
                          sub={b.vol}
                          desc={b.note}
                          price={fcfa(b.unit)}
                        />
                      ))}
                    </Block>
                  ))}
                </div>
              )}

              {tab === "chicha" && (
                <Block
                  title="Chicha"
                  note="Charbon naturel, têtes en argile, changement de charbon assuré par nos équipes toute la soirée."
                >
                  {CHICHAS.map((c) => (
                    <PriceRow
                      key={c.name}
                      name={c.name}
                      desc={c.desc}
                      tag={c.tag}
                      price={fcfa(c.price)}
                    />
                  ))}
                </Block>
              )}

              {tab === "tapas" && (
                <Block title="Cuisine & tapas" note="Service en cuisine jusqu'à 01h00.">
                  {TAPAS.map((t) => (
                    <PriceRow
                      key={t.name}
                      name={t.name}
                      desc={t.desc}
                      tag={t.tag}
                      price={fcfa(t.price)}
                    />
                  ))}
                </Block>
              )}

              {tab === "softs" && (
                <Block title="Softs & sans alcool">
                  {SOFTS.map((s) => (
                    <PriceRow
                      key={s.name}
                      name={s.name}
                      desc={s.desc}
                      price={fcfa(s.price)}
                    />
                  ))}
                </Block>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Aside visual */}
          <aside className="hidden lg:block">
            <div className="sticky top-40">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7 }}
                  className="grain relative aspect-[3/4] overflow-hidden"
                >
                  <img
                    src={TAB_IMAGE[tab]}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" />
                </motion.div>
              </AnimatePresence>

              <div className="panel mt-4 p-6">
                <p className="label text-gold">Bon à savoir</p>
                <p className="mt-4 text-[0.82rem] leading-relaxed text-cream/50">
                  Les prix sont affichés en FCFA, service compris. Une carte
                  complète est remise à table, et nos équipes vous conseillent
                  volontiers sur les accords.
                </p>
                <div className="mt-6">
                  <GoldButton href="/reservation" className="!px-6 !py-3">
                    Commander pour ma table
                  </GoldButton>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Bandeau bas */}
      <div className="mt-24 border-t border-line bg-ink-2 py-20">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <ParallaxImage
                src="/img/champ-04.jpg"
                alt="Service champagne au LMB"
                className="aspect-[4/3]"
                amount={35}
              />
            </Reveal>
            <div>
              <SectionHeading
                align="left"
                label="Service"
                title={
                  <>
                    Une bouteille ne se pose pas.
                    <br />
                    <em className="text-gold">Elle arrive.</em>
                  </>
                }
                intro="Sparklers, projecteur, sirène et cortège d'hôtesses : le défilé bouteille est devenu la signature de la maison. Il se commande à l'avance, dans le configurateur."
              />
              <Reveal delay={0.2}>
                <div className="mt-8">
                  <GoldButton href="/reservation">Réserver et commander</GoldButton>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Block({
  title,
  note,
  children,
}: {
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="font-display text-3xl  text-cream sm:text-4xl">
        {title}
      </h2>
      {note && (
        <p className="mt-3 max-w-xl text-[0.82rem] leading-relaxed text-cream/40">
          {note}
        </p>
      )}
      <div className="mt-8 divide-y divide-line border-t border-line">
        {children}
      </div>
    </div>
  );
}
