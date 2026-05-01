"use client";

import { ConsultIntro } from "@/components/consult/ConsultIntro";
import { ConsultForm } from "@/components/consult/ConsultForm";
import { PharmacistCard } from "@/components/consult/PharmacistCard";
import { FaqAccordion } from "@/components/consult/FaqAccordion";

export default function ConsultPage() {
  return (
    <div className="pb-24">
      <ConsultIntro />

      <PharmacistCard />

      <ConsultForm />

      <div className="rule mx-auto max-w-[480px]" />

      <FaqAccordion />
    </div>
  );
}
