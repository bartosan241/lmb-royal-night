import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import GalerieGrid from "@/components/pages/GalerieGrid";

export const metadata: Metadata = {
  title: "Galerie",
  description:
    "L'ambiance du LMB Royal Night en images : dancefloor, carrés VIP, service champagne, terrasse chicha et soirées à Libreville.",
};

export default function Page() {
  return (
    <>
      <PageHero
        index="05"
        label="Galerie"
        title="L'ambiance, sans filtre"
        intro="Les carrés, le dancefloor, la cave, la terrasse. Ce que vous verrez en poussant la porte."
        image="/img/club-04.jpg"
        compact
      />
      <GalerieGrid />
    </>
  );
}
