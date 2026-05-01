"use client";

import { useMemo, useState, use } from "react";
import { notFound } from "next/navigation";
import { getCategory, getProductsByCategory } from "@/lib/data";
import { CategoryHero } from "@/components/category/CategoryHero";
import { CategoryRail } from "@/components/category/CategoryRail";
import { FilterBar } from "@/components/category/FilterBar";
import { FilterSheet } from "@/components/category/FilterSheet";
import { SortMenu, sortLabel, type SortKey } from "@/components/category/SortMenu";
import { ProductGrid } from "@/components/category/ProductGrid";
import { ActiveFilters, type ActiveFilterChip } from "@/components/category/ActiveFilters";
import { EmptyState } from "@/components/category/EmptyState";
import {
  EMPTY_FILTERS,
  PRICE_OPTIONS,
  BADGE_OPTIONS,
  applyFilters,
  applySort,
  activeFilterCount,
  type FilterState,
} from "@/components/category/filters";

const HERO_GRADIENT: Record<string, string> = {
  immunity:  "from-sage-100 via-sage-50 to-cream-100",
  sleep:     "from-clay-100 via-cream-100 to-sage-100",
  digestive: "from-sage-50 via-cream-100 to-sage-100",
  joint:     "from-cream-200 via-clay-100 to-cream-100",
  women:     "from-clay-100 via-clay-200 to-cream-100",
  skin:      "from-clay-100 via-cream-100 to-clay-200",
  eye:       "from-clay-100 via-clay-200 to-cream-100",
  kids:      "from-cream-200 via-clay-100 to-sage-50",
  device:    "from-cream-200 via-cream-100 to-ink-100",
  otc:       "from-sage-100 via-cream-100 to-sage-50",
};

const HERO_GLYPH: Record<string, string> = {
  immunity: "Ω",  sleep: "ζ",     digestive: "β",   joint: "II",
  women: "♀",     skin: "α",      eye: "λ",         kids: "δ",
  device: "°",    otc: "+",
};

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const category = getCategory(slug);
  if (!category) notFound();

  const pool = useMemo(() => getProductsByCategory(slug), [slug]);

  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);
  const [sort, setSort] = useState<SortKey>("recommended");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [layout, setLayout] = useState<"grid" | "list">("grid");

  const filtered = useMemo(
    () => applySort(applyFilters(pool, filters), sort),
    [pool, filters, sort]
  );

  const chips: ActiveFilterChip[] = useMemo(() => {
    const arr: ActiveFilterChip[] = [];
    if (filters.price !== "all") {
      const label = PRICE_OPTIONS.find((p) => p.key === filters.price)?.label ?? "";
      arr.push({
        id: `price-${filters.price}`,
        label,
        onRemove: () => setFilters((f) => ({ ...f, price: "all" })),
      });
    }
    filters.brands.forEach((b) =>
      arr.push({
        id: `brand-${b}`,
        label: b,
        onRemove: () =>
          setFilters((f) => ({ ...f, brands: f.brands.filter((x) => x !== b) })),
      })
    );
    filters.badges.forEach((b) => {
      const label = BADGE_OPTIONS.find((o) => o.key === b)?.label ?? b;
      arr.push({
        id: `badge-${b}`,
        label,
        onRemove: () =>
          setFilters((f) => ({ ...f, badges: f.badges.filter((x) => x !== b) })),
      });
    });
    if (filters.rating > 0) {
      arr.push({
        id: `rating-${filters.rating}`,
        label: `평점 ${filters.rating.toFixed(1)} 이상`,
        onRemove: () => setFilters((f) => ({ ...f, rating: 0 })),
      });
    }
    return arr;
  }, [filters]);

  return (
    <>
      <CategoryHero
        eyebrow={category.nameEn}
        title={
          <>
            <span className="italic">{category.tagline}</span>
            <br />
            {category.name}
          </>
        }
        body={`${category.name} 카테고리. 약사가 직접 큐레이션한 ${category.count.toLocaleString()}개의 처방 중에서, 오늘 가장 어울리는 한 가지를 발견해 보세요.`}
        meta={`Curated by Atelier Pharmacy · ${pool.length.toLocaleString()}점 표시`}
        glyph={HERO_GLYPH[slug] ?? "·"}
        swatch={HERO_GRADIENT[slug] ?? "from-cream-200 via-cream-100 to-sage-50"}
      />

      <CategoryRail activeSlug={slug} topOffset={56} />

      <FilterBar
        count={filtered.length}
        filtersActive={activeFilterCount(filters)}
        sortLabel={sortLabel(sort)}
        onOpenFilter={() => setFilterOpen(true)}
        onOpenSort={() => setSortOpen(true)}
        layout={layout}
        onToggleLayout={() =>
          setLayout((l) => (l === "grid" ? "list" : "grid"))
        }
        topOffset={56 + 60}
      />

      <ActiveFilters chips={chips} onClearAll={() => setFilters(EMPTY_FILTERS)} />

      {filtered.length === 0 ? (
        <EmptyState onAction={() => setFilters(EMPTY_FILTERS)} />
      ) : (
        <ProductGrid products={filtered} layout={layout} />
      )}

      <FilterSheet
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        pool={pool}
        value={filters}
        onApply={setFilters}
      />
      <SortMenu
        open={sortOpen}
        onClose={() => setSortOpen(false)}
        value={sort}
        onChange={setSort}
      />
    </>
  );
}
