import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/layout/PageHero";
import { ESPACES, fcfa } from "@/lib/data";
import { GoldButton, SectionHeading, Badge } from "@/components/ui/kit";
import { Reveal, ParallaxImage } from "@/components/ui/motion-primitives";
import PlanSection from "@/components/pages/PlanSection";

export const metadata: Metadata = {
  title: "Nos espaces",
  description:
    "Table lounge, terrasse chicha, carré VIP, loge royale ou privatisation complète — découvrez les espaces du LMB Royal Night à Libreville.",
};

export default function Page() {
  return (
    <>
      <PageHero
        index="01"
        label="Nos espaces"
        title="Cinq façons de passer la nuit"
        intro="Chaque espace a sa capacité, son ambiance et son minimum de consommation — intégralement consommé en bouteilles et en cuisine, jamais en droit d'entrée."
        image="/img/club-08.jpg"
      />

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-[1400px] space-y-24 px-5 sm:space-y-32 sm:px-8">
          {ESPACES.map((e, i) => {
            const flip = i % 2 === 1;
            return (
              <div
                key={e.id}
                className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-20 ${
                  flip ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <Reveal>
                  <div className="grain relative aspect-[4/3] overflow-hidden">
                    <ParallaxImage
                      src={e.image}
                      alt={e.name}
                      className="h-full w-full"
                      amount={38}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
                    <span className="absolute left-6 top-6">
                      <Badge>{e.accent}</Badge>
                    </span>
                  </div>
                </Reveal>

                <div>
                  <Reveal>
                    <span className="font-display text-sm text-gold/50">
                      0{i + 1}
                    </span>
                    <h2 className="font-display mt-2 text-4xl leading-tight  text-cream sm:text-5xl">
                      {e.name}
                    </h2>
                    <p className="mt-3 text-lg font-medium text-gold/85">
                      {e.subtitle}
                    </p>
                  </Reveal>

                  <Reveal delay={0.1}>
                    <div className="mt-8 flex flex-wrap gap-x-12 gap-y-4 border-y border-line py-6">
                      <div>
                        <p className="text-[0.6rem] uppercase tracking-[0.2em] text-cream/35">
                          Capacité
                        </p>
                        <p className="font-display mt-1.5 text-lg text-cream">
                          {e.capacity}
                        </p>
                      </div>
                      <div>
                        <p className="text-[0.6rem] uppercase tracking-[0.2em] text-cream/35">
                          Minimum de conso.
                        </p>
                        <p className="font-display mt-1.5 text-lg text-gold">
                          {e.minSpend >= 1500000 ? "Sur devis" : fcfa(e.minSpend)}
                        </p>
                      </div>
                    </div>
                  </Reveal>

                  <Reveal delay={0.16}>
                    <ul className="mt-7 space-y-3">
                      {e.perks.map((p) => (
                        <li
                          key={p}
                          className="flex items-start gap-3 text-sm text-cream/60"
                        >
                          <span className="mt-2 h-1 w-1 shrink-0 rotate-45 bg-gold" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </Reveal>

                  <Reveal delay={0.22}>
                    <div className="mt-10 flex flex-wrap gap-4">
                      <GoldButton href={`/reservation?espace=${e.id}`}>
                        Réserver
                      </GoldButton>
                      <Link
                        href="/carte"
                        className="self-center text-[0.7rem] uppercase tracking-[0.2em] text-cream/45 transition-colors hover:text-gold"
                      >
                        Voir la carte →
                      </Link>
                    </div>
                  </Reveal>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <PlanSection />

      <section className="border-t border-line bg-ink-2 py-24">
        <div className="mx-auto max-w-[1400px] px-5 text-center sm:px-8">
          <SectionHeading
            label="Une demande particulière ?"
            title={
              <>
                Anniversaire, entreprise,
                <br />
                <em className="text-gold">grande tablée</em>
              </>
            }
            intro="Au-delà de 20 personnes, nous construisons une proposition sur mesure : espace, carte, décoration, sécurité et programmation musicale."
          />
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <GoldButton href="/reservation?espace=privatisation">
                Demander un devis
              </GoldButton>
              <GoldButton href="/contact" variant="outline">
                Parler à un responsable
              </GoldButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
