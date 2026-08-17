import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import { VENUE, FAQ } from "@/lib/data";
import { GoldButton, SectionHeading, Accordion } from "@/components/ui/kit";
import { Reveal } from "@/components/ui/motion-primitives";
import ContactForm from "@/components/pages/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez le LMB Royal Night à Libreville : téléphone, WhatsApp, email, adresse au Quartier Louis et horaires d'ouverture.",
};

export default function Page() {
  return (
    <>
      <PageHero
        index="06"
        label="Contact"
        title="Parlons de votre soirée"
        intro="Une question, un groupe important, une demande particulière ? Nos équipes répondent en quelques minutes pendant les heures d'ouverture."
        image="/img/bar-10.jpg"
        compact
      />

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            {/* Coordonnées */}
            <div>
              <SectionHeading
                align="left"
                label="Nous joindre"
                title={
                  <>
                    Le plus simple,
                    <br />
                    <em className="text-gold">c&apos;est WhatsApp</em>
                  </>
                }
                intro="Pour une réservation, une privatisation ou une simple question, écrivez-nous directement — c'est le canal le plus rapide."
              />

              <Reveal delay={0.15}>
                <div className="mt-9 flex flex-wrap gap-4">
                  <a
                    href={`https://wa.me/${VENUE.phoneRaw}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 bg-gold px-8 py-4 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-ink transition-all hover:bg-gold-light"
                  >
                    Écrire sur WhatsApp
                    <span className="h-px w-6 bg-current transition-all group-hover:w-10" />
                  </a>
                  <GoldButton href="/reservation" variant="outline">
                    Réserver en ligne
                  </GoldButton>
                </div>
              </Reveal>

              <div className="mt-12 space-y-px">
                {[
                  { l: "Adresse", v: VENUE.address, href: VENUE.maps },
                  {
                    l: "Téléphone",
                    v: VENUE.phone,
                    href: `tel:${VENUE.phone.replace(/\s/g, "")}`,
                  },
                  { l: "Email", v: VENUE.email, href: `mailto:${VENUE.email}` },
                  { l: "Instagram", v: "@lmb_bar_lounge", href: VENUE.instagram },
                ].map((c, i) => (
                  <Reveal key={c.l} delay={0.08 + i * 0.05}>
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-6 border-b border-line py-5 transition-colors"
                    >
                      <span className="text-[0.62rem] uppercase tracking-[0.2em] text-cream/40">
                        {c.l}
                      </span>
                      <span className="text-right text-sm text-cream/75 transition-colors group-hover:text-gold-light">
                        {c.v}
                      </span>
                    </a>
                  </Reveal>
                ))}
              </div>

              {/* Horaires */}
              <Reveal delay={0.2}>
                <div className="panel mt-10 p-7">
                  <p className="label text-gold">Ouverture</p>
                  <ul className="mt-5 space-y-2.5">
                    {VENUE.hours.map((h) => (
                      <li
                        key={h.d}
                        className="flex justify-between gap-4 text-[0.85rem]"
                      >
                        <span className="text-cream/50">{h.d}</span>
                        <span
                          className={
                            "closed" in h && h.closed
                              ? "text-cream/25"
                              : "text-gold/85"
                          }
                        >
                          {h.h}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

            {/* Formulaire */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Carte */}
      <section className="border-t border-line py-20 sm:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <SectionHeading
            label="Nous trouver"
            title={
              <>
                Quartier Louis,{" "}
                <em className="text-gold">ex Le Manoir</em>
              </>
            }
            intro="Au cœur du quartier le plus animé de Libreville. Voiturier disponible sur réservation."
          />
          <Reveal delay={0.15}>
            <div className="panel mt-12 overflow-hidden">
              <iframe
                title="Plan d'accès au LMB Royal Night"
                src="https://www.openstreetmap.org/export/embed.html?bbox=9.44%2C0.39%2C9.48%2C0.43&layer=mapnik"
                className="h-[420px] w-full grayscale-[0.4] contrast-[1.1]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="mt-6 text-center">
              <GoldButton href={VENUE.maps} variant="outline">
                Ouvrir dans Google Maps
              </GoldButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-line bg-ink-2 py-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <SectionHeading
            label="Questions fréquentes"
            title="Avant de nous écrire"
          />
          <Reveal delay={0.12}>
            <div className="mt-12">
              <Accordion items={FAQ} />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
