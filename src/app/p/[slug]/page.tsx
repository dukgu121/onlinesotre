import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProduct } from "@/lib/data";
import { Gallery } from "@/components/product/Gallery";
import { PriceBlock } from "@/components/product/PriceBlock";
import { HighlightChips } from "@/components/product/HighlightChips";
import { PharmacistNote } from "@/components/product/PharmacistNote";
import { UsageRitual } from "@/components/product/UsageRitual";
import { Tabs } from "@/components/product/Tabs";
import { Reviews } from "@/components/product/Reviews";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { StickyCTA } from "@/components/product/StickyCTA";

type Params = { slug: string };

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "제품을 찾을 수 없습니다" };
  return {
    title: `${product.name}`,
    description: product.hero,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <article className="relative">
      <Gallery product={product} />
      <PriceBlock product={product} />
      <HighlightChips product={product} />
      <PharmacistNote product={product} />
      <UsageRitual product={product} />
      <Tabs product={product} />
      <Reviews product={product} />
      <RelatedProducts product={product} />

      {/* Spacer for sticky CTA + bottom nav */}
      <div className="h-[200px]" aria-hidden />

      <StickyCTA product={product} />
    </article>
  );
}
