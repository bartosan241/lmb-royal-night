import Hero from "@/components/home/Hero";
import {
  Bandeau,
  Intro,
  EspacesSection,
  SeauxSection,
  ChampagneSection,
  ProgrammeSection,
  GaleriePreview,
  FaqSection,
  FinalCta,
} from "@/components/home/sections";

export default function Home() {
  return (
    <>
      <Hero />
      <Bandeau />
      <Intro />
      <EspacesSection />
      <SeauxSection />
      <ChampagneSection />
      <ProgrammeSection />
      <GaleriePreview />
      <FaqSection />
      <FinalCta />
    </>
  );
}
