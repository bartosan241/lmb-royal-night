import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import { PROGRAMME, VENUE } from "@/lib/data";
import { GoldButton, SectionHeading, Badge } from "@/components/ui/kit";
import { Reveal, ParallaxImage } from "@/components/ui/motion-primitives";

export const metadata: Metadata = {
  title: "Programmation",
  description:
    "Afrobeats Night, Ladies Night, Royal Saturday, Rumba, Karaoké et Sunday Chill — la programmation du LMB Royal Night, six nuits sur sept à Libreville.",
};

export default function Page() {
  return (
    <>
      <PageHero
        index="04"
        label="Programmation"
        title="Six nuits, six ambiances"
        intro="Du mardi au dimanche, chaque soir a son identité, son DJ et son public. Réservez la nuit qui vous ressemble."
        image="/img/club-06.jpg"
      />

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-[1400px] space-y-20 px-5 sm:space-y-28 sm:px-8">
          {PROGRAMME.map((p, i) => {
            const flip = i % 2 === 1;
            return (
              <div
                key={p.day}
                className={`grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16 ${
                  flip ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <Reveal>
                  <div className="grain relative aspect-[16/10] overflow-hidden">
                    <ParallaxImage
                      src={p.image}
                      alt={`${p.name} au LMB Royal Night`}
                      className="h-full w-full"
                      amount={35}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                    {p.tag && (
                      <span className="absolute left-6 top-6">
                        <Badge>{p.tag}</Badge>
                      </span>
                    )}
                  </div>
                </Reveal>

                <div>
                  <Reveal>
                    <div className="flex items-center gap-4">
                      <span className="h-px w-8 bg-gold/50" />
                      <span className="label text-gold">{p.day}</span>
                    </div>
                    <h2 className="font-display mt-5 text-4xl leading-tight  text-cream sm:text-5xl">
                      {p.name}
                    </h2>
                  </Reveal>

                  <Reveal delay={0.1}>
                    <p className="mt-5 max-w-lg text-[0.95rem] leading-relaxed text-cream/55">
                      {p.desc}
                    </p>
                  </Reveal>

                  <Reveal delay={0.16}>
                    <div className="mt-8 flex flex-wrap gap-x-12 gap-y-4 border-y border-line py-6">
                      <div>
                        <p className="label text-cream/35">Horaires</p>
                        <p className="font-display mt-1.5 text-lg text-gold">
                          {VENUE.hours.find((h) => h.d === p.day)?.h ?? "—"}
                        </p>
                      </div>
                    </div>
                  </Reveal>

                  <Reveal delay={0.22}>
                    <div className="mt-9">
                      <GoldButton href="/reservation">
                        Réserver pour {p.day.toLowerCase()}
                      </GoldButton>
                    </div>
                  </Reveal>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="border-t border-line bg-ink-2 py-24">
        <div className="mx-auto max-w-[1400px] px-5 text-center sm:px-8">
          <SectionHeading
            label="Soirées privées"
            title={
              <>
                Votre événement,
                <br />
                <em className="text-gold">notre salle</em>
              </>
            }
            intro="Lancement de marque, afterwork d'entreprise, anniversaire à grande échelle : nous privatisons tout ou partie du club, avec DJ, sécurité et carte sur mesure."
          />
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <GoldButton href="/reservation?espace=privatisation">
                Demander un devis
              </GoldButton>
              <GoldButton href="/contact" variant="outline">
                Nous contacter
              </GoldButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
