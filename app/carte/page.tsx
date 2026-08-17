import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import CarteContent from "@/components/pages/CarteContent";

export const metadata: Metadata = {
  title: "La carte",
  description:
    "Cave à champagne, spiritueux, cocktails signature, bières et Booster, chicha et tapas. Toute la carte du LMB Royal Night à Libreville.",
};

export default function Page() {
  return (
    <>
      <PageHero
        index="02"
        label="La carte"
        title="Tout ce qui se sert"
        intro="De la Régab glacée au Ace of Spades. Une carte pensée pour toutes les tables — et des prix affichés, sans mauvaise surprise à l'addition."
        image="/img/bar-01.jpg"
      />
      <CarteContent />
    </>
  );
}
