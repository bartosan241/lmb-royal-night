import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import FormulesContent from "@/components/pages/FormulesContent";

export const metadata: Metadata = {
  title: "Seaux & formules",
  description:
    "Seau de 6, 10, 15 ou 24 bouteilles à panacher librement — bières, Booster, premix. Packs champagne et formules anniversaire au LMB Royal Night, Libreville.",
};

export default function Page() {
  return (
    <>
      <PageHero
        index="03"
        label="Seaux & formules"
        title="Composez, on s'occupe du reste"
        intro="Le principe de la maison : vous choisissez le format, vous panachez les bouteilles, la remise s'applique toute seule. Aucun mélange n'est refusé."
        image="/img/champ-01.jpg"
      />
      <FormulesContent />
    </>
  );
}
