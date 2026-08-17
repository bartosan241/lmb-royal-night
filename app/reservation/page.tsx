import { Suspense } from "react";
import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import Reservation from "@/components/reservation/Reservation";

export const metadata: Metadata = {
  title: "Réserver une table",
  description:
    "Composez votre soirée au LMB Royal Night : espace, plan de salle, seau de bouteilles à panacher, champagnes et options. Confirmation WhatsApp sous 30 minutes.",
};

export default function Page() {
  return (
    <>
      <PageHero
        compact
        index="07"
        label="Réservation"
        title="Composez votre soirée"
        intro="Six étapes, deux minutes. Choisissez votre espace sur le plan de salle, composez votre seau bouteille par bouteille, ajoutez vos options — et recevez votre confirmation sur WhatsApp."
        image="/img/bar-09.jpg"
      />
      <div className="pt-16 sm:pt-20">
        <Suspense
          fallback={
            <div className="mx-auto max-w-[1400px] px-5 py-20 text-center text-cream/40 sm:px-8">
              Chargement du configurateur…
            </div>
          }
        >
          <Reservation />
        </Suspense>
      </div>
    </>
  );
}
