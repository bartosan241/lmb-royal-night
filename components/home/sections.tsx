"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  Reveal,
  ScrollFadeWords,
  Marquee,
  TiltCard,
  ParallaxImage,
  Spotlight,
} from "@/components/ui/motion-primitives";
import { GoldButton, SectionHeading, Badge, Accordion } from "@/components/ui/kit";
import {
  ESPACES,
  SEAUX,
  CHAMPAGNES,
  PROGRAMME,
  GALERIE,
  FAQ,
  BOUTEILLES,
  fcfa,
} from "@/lib/data";

/* ================================================================== */
/*  Bandeau marquee                                                    */
/* ================================================================== */

export function Bandeau() {
  return (
    <div className="border-y border-line bg-ink-2 py-4">
      <Marquee
        items={[
          "CARRÉS VIP",
          "LOGES ROYALES",
          "CAVE À CHAMPAGNE",
          "SEAUX À COMPOSER",
          "TERRASSE CHICHA",
          "DÉFILÉ BOUTEILLE",
          "AFROBEATS · RUMBA · AMAPIANO",
        ]}
        speed={40}
        className="label text-gold/70"
      />
    </div>
  );
}

/* ================================================================== */
/*  Intro                                                              */
/* ================================================================== */

export function Intro() {
  return (
    <section className="relative overflow-hidden py-28 sm:py-36">
      <div className="mx-auto grid max-w-[1400px] items-center gap-16 px-5 sm:px-8 lg:grid-cols-2 lg:gap-24">
        <div className="relative">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden">
              <ParallaxImage
                src="/img/bar-01.jpg"
                alt="Le bar principal du LMB et sa cave"
                className="h-full w-full"
                amount={40}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
            </div>
          </Reveal>

        </div>

        <div>
          <SectionHeading
            index="01"
            align="left"
            label="La maison"
            title={
              <>
Une adresse pour ceux qui <em className="text-gold">savent recevoir</em>
              </>
            }
          />
          <div className="mt-8">
            <ScrollFadeWords
              className="text-[0.98rem] leading-[1.9] text-cream/70"
              text="Au Quartier Louis, le LMB a construit sa réputation sur un principe simple : la nuit se prépare. Ici, on ne fait pas la queue pour trouver une table — on arrive, son prénom est sur le seau, la bouteille est fraîche et le carré n'attend que vous."
            />
          </div>
          <Reveal delay={0.2}>
            <p className="mt-6 border-t border-line pt-6 text-[0.92rem] leading-relaxed text-cream/45">
              Plusieurs espaces, une cave à champagne, une terrasse chicha et
              une programmation régulière. Du dîner tardif entre amis à la
              privatisation d&apos;entreprise, la maison s&apos;adapte — sans
              jamais baisser le niveau de service.
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-10">
              <GoldButton href="/espaces" variant="outline">
                Visiter les espaces
              </GoldButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  Espaces                                                            */
/* ================================================================== */

export function EspacesSection() {
  const [active, setActive] = useState(2);

  return (
    <section className="relative overflow-hidden border-t border-line bg-ink-2 py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <SectionHeading
            index="02"
          label="Nos espaces"
          title={
            <>
              Choisissez votre <em className="text-gold">hauteur</em>{" "}
              de vue
            </>
          }
          intro="Du salon intimiste à la loge surplombant le dancefloor, chaque espace a son minimum de consommation — intégralement consommé en bouteilles et en cuisine."
        />

        {/* Selector */}
        <div className="mt-14 flex flex-wrap justify-center gap-2">
          {ESPACES.map((e, i) => (
            <button
              key={e.id}
              onClick={() => setActive(i)}
              className={`border px-5 py-2.5 text-[0.66rem] uppercase tracking-[0.16em] transition-all duration-400 ${
                active === i
                  ? "border-gold bg-gold text-ink"
                  : "border-line text-cream/55 hover:border-gold/60 hover:text-gold-light"
              }`}
            >
              {e.name}
            </button>
          ))}
        </div>

        {/* Active panel */}
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <motion.div
            key={ESPACES[active].id}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="grain relative aspect-[16/11] overflow-hidden"
          >
            <img
              src={ESPACES[active].image}
              alt={ESPACES[active].name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
            <div className="absolute left-6 top-6">
              <Badge>{ESPACES[active].accent}</Badge>
            </div>
          </motion.div>

          <motion.div
            key={ESPACES[active].id + "-txt"}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            <h3 className="font-display text-4xl  text-cream sm:text-5xl">
              {ESPACES[active].name}
            </h3>
            <p className="mt-3 text-lg font-medium text-gold/85">
              {ESPACES[active].subtitle}
            </p>

            <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-y border-line py-6">
              <div>
                <p className="text-[0.6rem] uppercase tracking-[0.2em] text-cream/35">
                  Capacité
                </p>
                <p className="mt-1.5 font-display text-lg text-cream">
                  {ESPACES[active].capacity}
                </p>
              </div>
              <div>
                <p className="text-[0.6rem] uppercase tracking-[0.2em] text-cream/35">
                  Minimum de conso.
                </p>
                <p className="mt-1.5 font-display text-lg text-gold">
                  {ESPACES[active].minSpend >= 1500000
                    ? "Sur devis"
                    : fcfa(ESPACES[active].minSpend)}
                </p>
              </div>
            </div>

            <ul className="mt-7 space-y-3">
              {ESPACES[active].perks.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm text-cream/60">
                  <span className="mt-2 h-1 w-1 shrink-0 rotate-45 bg-gold" />
                  {p}
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <GoldButton
                href={`/reservation?espace=${ESPACES[active].id}`}
                cursor="Réserver"
              >
                Réserver cet espace
              </GoldButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  Seaux                                                              */
/* ================================================================== */

export function SeauxSection() {
  const example = BOUTEILLES.filter((b) =>
    ["regab65", "booster-blue", "booster-red", "heineken", "smirnoff"].includes(b.id)
  );

  return (
    <section className="relative overflow-hidden py-28 sm:py-36">
      <Spotlight />
      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <SectionHeading
            index="03"
          label="Seaux & formules"
          title={
            <>
              Le seau, <em className="text-gold">à votre façon</em>
            </>
          }
          intro="Dix Booster au choix, six bières panachées, quinze bouteilles mélangées : vous composez, le prix se calcule en direct et la remise du format s'applique automatiquement."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SEAUX.map((s, i) => {
            const base = 3000 * s.count;
            const prix = Math.round((base * (1 - s.discount)) / 500) * 500;
            return (
              <Reveal key={s.id} delay={i * 0.08}>
                <TiltCard className="group h-full" max={7}>
                  <div className="panel glass relative flex h-full flex-col p-7 transition-colors duration-500 hover:border-gold/45">
                    {s.badge && (
                      <span className="absolute -top-3 left-7">
                        <Badge>{s.badge}</Badge>
                      </span>
                    )}
                    <p className="font-display text-6xl leading-none text-gold/25 transition-colors duration-500 group-hover:text-gold/50">
                      {s.count}
                    </p>
                    <h3 className="font-display mt-4 text-2xl text-cream">
                      {s.name}
                    </h3>
                    <p className="mt-3 flex-1 text-[0.85rem] leading-relaxed text-cream/45">
                      {s.desc}
                    </p>

                    {s.offert && (
                      <p className="mt-4 border-l border-gold/40 pl-3 text-[0.75rem] italic text-gold/75">
                        {s.offert}
                      </p>
                    )}

                    <div className="mt-6 border-t border-line pt-5">
                      <p className="text-[0.6rem] uppercase tracking-[0.18em] text-cream/35">
                        à partir de
                      </p>
                      <p className="font-display mt-1 text-2xl text-gold">
                        {fcfa(prix)}
                      </p>
                      <p className="mt-1 text-[0.68rem] text-cream/30">
                        soit −{Math.round(s.discount * 100)} % sur le prix à
                        l&apos;unité
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>

        {/* Mini preview of bottle choice */}
        <Reveal delay={0.15}>
          <div className="panel mt-14 flex flex-col items-center gap-8 bg-ink-2/60 p-8 lg:flex-row lg:justify-between lg:p-12">
            <div className="max-w-md text-center lg:text-left">
              <h3 className="font-display text-2xl text-cream sm:text-3xl">
                Panachez comme vous voulez
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-cream/50">
                Quatre Régab, trois Blue Paradise et trois Smirnoff dans le même
                seau ? Aucun problème. Le configurateur accepte tous les
                mélanges.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {example.map((b, i) => (
                <motion.span
                  key={b.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.6 }}
                  className="panel rounded-full px-4 py-2 text-[0.7rem] text-cream/70"
                >
                  {b.name}
                </motion.span>
              ))}
              <span className="panel rounded-full border-dashed px-4 py-2 text-[0.7rem] text-gold">
                +{BOUTEILLES.length - example.length} autres
              </span>
            </div>

            <GoldButton href="/reservation" cursor="Composer">
              Composer mon seau
            </GoldButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  Champagne                                                          */
/* ================================================================== */

export function ChampagneSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [70, -70]);

  const stars = CHAMPAGNES.filter((c) =>
    ["moet-imperial", "veuve", "dom-perignon", "ace"].includes(c.id)
  );

  return (
    <section
      ref={ref}
      className="grain relative overflow-hidden border-y border-line py-28 sm:py-36"
    >
      <motion.img
        src="/img/champ-10.jpg"
        alt=""
        aria-hidden
        style={{ y }}
        className="absolute inset-0 h-[125%] w-full object-cover opacity-[0.16]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/85 to-ink" />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <SectionHeading
            index="04"
          label="La cave"
          title={
            <>
              Une entrée qu&apos;on               <em className="text-gold">n&apos;oublie pas</em>
            </>
          }
          intro="Sparklers, cortège et projecteur : chez nous, une bouteille de champagne ne se pose pas sur une table, elle traverse la salle."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stars.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.09}>
              <TiltCard className="group h-full" max={9}>
                <div className="panel relative flex h-full flex-col overflow-hidden bg-ink-2/70 p-7 transition-all duration-500 hover:border-gold/50">
                  {c.tag && (
                    <span className="absolute right-5 top-5">
                      <Badge>{c.tag}</Badge>
                    </span>
                  )}
                  <p className="text-[0.6rem] uppercase tracking-[0.22em] text-gold/60">
                    {c.house}
                  </p>
                  <h3 className="font-display mt-3 text-2xl leading-tight text-cream">
                    {c.name}
                  </h3>
                  <p className="mt-3 flex-1 text-[0.82rem] leading-relaxed text-cream/45">
                    {c.desc}
                  </p>
                  <div className="mt-6 flex items-end justify-between border-t border-line pt-5">
                    <span className="text-[0.65rem] tracking-[0.15em] text-cream/35">
                      {c.vol}
                    </span>
                    <span className="font-display text-xl text-gold">
                      {fcfa(c.price)}
                    </span>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-14 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <GoldButton href="/carte#champagne">Voir toute la cave</GoldButton>
            <GoldButton href="/reservation" variant="outline">
              Commander pour ma table
            </GoldButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  Programmation                                                      */
/* ================================================================== */

export function ProgrammeSection() {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            index="05"
            align="left"
            label="Programmation"
            title={
              <>
                Six nuits,                 <em className="text-gold">six ambiances</em>
              </>
            }
          />
          <Reveal delay={0.15}>
            <GoldButton href="/evenements" variant="outline">
              Tout le programme
            </GoldButton>
          </Reveal>
        </div>

        <div className="mt-14 border-t border-line">
          {PROGRAMME.map((p, i) => (
            <Reveal key={p.day} delay={i * 0.05}>
              <Link
                href="/evenements"
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                className="group relative flex flex-col gap-3 border-b border-line py-7 transition-colors sm:flex-row sm:items-center sm:gap-8"
              >
                {/* hover image */}
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute right-[16%] top-1/2 z-20 hidden h-40 w-64 -translate-y-1/2 overflow-hidden xl:block"
                  initial={false}
                  animate={{
                    opacity: hover === i ? 1 : 0,
                    scale: hover === i ? 1 : 0.9,
                    rotate: hover === i ? -3 : 0,
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <img src={p.image} alt="" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-ink/25" />
                </motion.div>

                <span className="w-28 shrink-0 text-[0.65rem] uppercase tracking-[0.16em] text-gold/70">
                  {p.day}
                </span>
                <h3 className="font-display flex-1 text-3xl  text-cream transition-all duration-500 group-hover:translate-x-3 group-hover:text-gold-light sm:text-4xl">
                  {p.name}
                </h3>
                <p className="max-w-sm text-[0.83rem] leading-relaxed text-cream/40 lg:max-w-md">
                  {p.desc}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  Galerie preview                                                    */
/* ================================================================== */

export function GaleriePreview() {
  const shots = GALERIE.slice(0, 8);
  return (
    <section className="border-t border-line bg-ink-2 py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <SectionHeading
            index="06"
          label="Galerie"
          title={
            <>
              L&apos;ambiance,{" "}
              <em className="text-gold">sans filtre</em>
            </>
          }
        />
        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {shots.map((g, i) => (
            <Reveal key={`${g.src}-${i}`} delay={(i % 4) * 0.07}>
              <div className="group relative aspect-[4/5] overflow-hidden">
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-ink/35 transition-opacity duration-500 group-hover:opacity-0" />
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.15}>
          <div className="mt-12 text-center">
            <GoldButton href="/galerie" variant="outline">
              Voir la galerie complète
            </GoldButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}


/* ================================================================== */
/*  FAQ                                                                */
/* ================================================================== */

export function FaqSection() {
  return (
    <section className="border-t border-line bg-ink-2 py-28 sm:py-36">
      <div className="mx-auto grid max-w-[1400px] gap-14 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
        <div>
          <SectionHeading
            index="07"
            align="left"
            label="Questions fréquentes"
            title={
              <>
                Tout ce qu&apos;il faut                 savoir <em className="text-gold">avant de venir</em>
              </>
            }
          />
          <Reveal delay={0.2}>
            <p className="mt-8 text-sm leading-relaxed text-cream/45">
              Une question qui n&apos;est pas ici ? Écrivez-nous sur WhatsApp,
              on répond en quelques minutes pendant les heures d&apos;ouverture.
            </p>
            <div className="mt-6">
              <GoldButton href="/contact" variant="outline">
                Nous écrire
              </GoldButton>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.12}>
          <Accordion items={FAQ} />
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  CTA final                                                          */
/* ================================================================== */

export function FinalCta() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      ref={ref}
      className="grain relative flex min-h-[80vh] items-center justify-center overflow-hidden"
    >
      <motion.img
        src="/img/club-08.jpg"
        alt=""
        aria-hidden
        style={{ y }}
        className="absolute inset-0 h-[122%] w-full object-cover"
      />
      <div className="absolute inset-0 bg-ink/78" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 55%, rgba(212,175,95,0.18), transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6 py-28 text-center">
        <Reveal>
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-gold/50" />
            <span className="label text-gold">Ce soir</span>
            <span className="h-px w-10 bg-gold/50" />
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="font-display mt-7 text-4xl leading-[1.05]  text-cream sm:text-6xl lg:text-7xl">
            Votre table vous
            <br />
            <em className="text-gold">attend déjà</em>
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mx-auto mt-7 max-w-lg text-[0.95rem] leading-relaxed text-cream/60">
            Composez votre soirée en deux minutes : espace, seau, champagne,
            options. Confirmation par WhatsApp sous 30 minutes.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <GoldButton href="/reservation" cursor="C'est parti">
              Composer ma soirée
            </GoldButton>
            <GoldButton href="/contact" variant="outline">
              Parler à un responsable
            </GoldButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
