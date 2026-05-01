import { Hero } from "@/components/home/Hero";
import { BrandStrip } from "@/components/home/BrandStrip";
import { PharmacistsPick } from "@/components/home/PharmacistsPick";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { Bestsellers } from "@/components/home/Bestsellers";
import { EditorialBanner } from "@/components/home/EditorialBanner";
import { IngredientStory } from "@/components/home/IngredientStory";
import { NewArrivals } from "@/components/home/NewArrivals";
import { ConsultCTA } from "@/components/home/ConsultCTA";
import { Journal } from "@/components/home/Journal";
import { BrandClose } from "@/components/home/BrandClose";

export default function Home() {
  return (
    <>
      <Hero />
      <BrandStrip />
      <PharmacistsPick />
      <CategoryGrid />
      <Bestsellers />
      <IngredientStory />
      <EditorialBanner />
      <NewArrivals />
      <ConsultCTA />
      <Journal />
      <BrandClose />
    </>
  );
}
