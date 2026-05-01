"use client";

import { useMemo, useState } from "react";
import { categories, products } from "@/lib/data";
import { CategoryHero } from "@/components/category/CategoryHero";
import { CategoryTile } from "@/components/category/CategoryTile";
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
import { StaggerGroup, StaggerItem } from "@/components/motion/Reveal";

export default function AllCategoriesPage() {
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);
  const [sort, setSort] = useState<SortKey>("recommended");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [layout, setLayout] = useState<"grid" | "list">("grid");

  const filtered = useMemo(
    () => applySort(applyFilters(products, filters), sort),
    [filters, sort]
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
        eyebrow="Browse"
        title={
          <>
            오늘은 어떤
            <br />
            <span className="italic">처방</span>이 필요하신가요?
          </>
        }
        body="약사가 직접 분류한 열 가지 카테고리. 매일의 컨디션에 맞춘 카탈로그를 천천히 둘러보세요."
        meta={`Catalogue · ${products.length.toLocaleString()}점 · ${categories.length}개 카테고리`}
        glyph="✦"
        swatch="from-sage-100 via-cream-100 to-clay-100"
      />

      {/* Category tiles grid */}
      <section className="container max-w-[480px] pb-10">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="font-serif text-display-sm text-ink-900">
            카테고리
          </h2>
          <span className="eyebrow">Categories</span>
        </div>

        <StaggerGroup className="grid grid-cols-2 gap-3" stagger={0.06}>
          {categories.map((c, i) => (
            <StaggerItem key={c.slug}>
              <CategoryTile category={c} index={i} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <div className="rule mx-5 my-2" />

      {/* Universal product browse */}
      <section>
        <div className="container max-w-[480px] pt-6 pb-2">
          <div className="flex items-baseline justify-between">
            <h2 className="font-serif text-display-sm text-ink-900">
              전체 상품
            </h2>
            <span className="eyebrow">All products</span>
          </div>
          <p className="mt-2 text-body-sm text-ink-500 max-w-[34ch]">
            큐레이션의 처음과 끝. 필터로 좁히거나 정렬을 바꿔 천천히 살펴보세요.
          </p>
        </div>

        <CategoryRail topOffset={56} />

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

        <ActiveFilters
          chips={chips}
          onClearAll={() => setFilters(EMPTY_FILTERS)}
        />

        {filtered.length === 0 ? (
          <EmptyState onAction={() => setFilters(EMPTY_FILTERS)} />
        ) : (
          <ProductGrid products={filtered} layout={layout} />
        )}
      </section>

      <FilterSheet
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        pool={products}
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
