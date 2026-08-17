"use client";

import { useState } from "react";
import FloorPlan from "@/components/reservation/FloorPlan";
import { SectionHeading, GoldButton } from "@/components/ui/kit";
import { Reveal } from "@/components/ui/motion-primitives";

export default function PlanSection() {
  const [sel, setSel] = useState<string | null>(null);

  return (
    <section className="border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <SectionHeading
          label="Plan de salle"
          title={
            <>
              Choisissez <em className="text-gold">votre place</em>
            </>
          }
          intro="Le plan reprend la disposition réelle du club : DJ booth, dancefloor central, carrés VIP sur les côtés, loges en hauteur et terrasse chicha à l'extérieur."
        />
        <Reveal delay={0.12}>
          <div className="mx-auto mt-12 max-w-4xl">
            <FloorPlan selected={sel} onSelect={(id) => setSel(id)} />
            <div className="mt-8 text-center">
              <GoldButton
                href={sel ? `/reservation?spot=${sel}` : "/reservation"}
                variant="outline"
              >
                {sel ? `Réserver l'emplacement ${sel}` : "Réserver une table"}
              </GoldButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
