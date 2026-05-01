import type { Product } from "@/lib/data";
import type { SortKey } from "./SortMenu";

export type PriceBucket =
  | "all"
  | "u30"   // < 30,000
  | "30-50" // 30,000 - 50,000
  | "50-100"// 50,000 - 100,000
  | "100p"; // >= 100,000

export type RatingMin = 0 | 4.0 | 4.5;

export type FilterState = {
  price: PriceBucket;
  brands: string[];
  badges: string[]; // NEW / BEST / EDITOR / ...
  rating: RatingMin;
};

export const EMPTY_FILTERS: FilterState = {
  price: "all",
  brands: [],
  badges: [],
  rating: 0,
};

export const PRICE_OPTIONS: { key: PriceBucket; label: string }[] = [
  { key: "all",     label: "전체"        },
  { key: "u30",     label: "3만원 이하"  },
  { key: "30-50",   label: "3-5만원"     },
  { key: "50-100",  label: "5-10만원"    },
  { key: "100p",    label: "10만원 이상" },
];

export const BADGE_OPTIONS: { key: string; label: string }[] = [
  { key: "NEW",     label: "신상품"   },
  { key: "BEST",    label: "베스트"   },
  { key: "EDITOR",  label: "에디터스" },
  { key: "LIMITED", label: "리미티드" },
];

export const RATING_OPTIONS: { key: RatingMin; label: string }[] = [
  { key: 0,   label: "전체"   },
  { key: 4.0, label: "4.0 이상" },
  { key: 4.5, label: "4.5 이상" },
];

export function priceMatch(price: number, bucket: PriceBucket): boolean {
  switch (bucket) {
    case "u30":    return price < 30_000;
    case "30-50":  return price >= 30_000 && price < 50_000;
    case "50-100": return price >= 50_000 && price < 100_000;
    case "100p":   return price >= 100_000;
    default:       return true;
  }
}

export function applyFilters(
  products: Product[],
  f: FilterState
): Product[] {
  return products.filter((p) => {
    if (!priceMatch(p.price, f.price)) return false;
    if (f.brands.length > 0 && !f.brands.includes(p.brand)) return false;
    if (f.badges.length > 0 && (!p.badge || !f.badges.includes(p.badge)))
      return false;
    if (f.rating > 0 && p.rating < f.rating) return false;
    return true;
  });
}

export function applySort(products: Product[], sort: SortKey): Product[] {
  const copy = [...products];
  switch (sort) {
    case "newest":
      // No date field — approximate: NEW first, then by reviewCount asc (less established)
      return copy.sort((a, b) => {
        const aNew = a.badge === "NEW" ? 1 : 0;
        const bNew = b.badge === "NEW" ? 1 : 0;
        if (aNew !== bNew) return bNew - aNew;
        return a.reviewCount - b.reviewCount;
      });
    case "popular":
      return copy.sort((a, b) => b.reviewCount - a.reviewCount);
    case "rating":
      return copy.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
    case "priceAsc":
      return copy.sort((a, b) => a.price - b.price);
    case "priceDesc":
      return copy.sort((a, b) => b.price - a.price);
    case "recommended":
    default:
      // Editor's > Best > Newest, then rating, then reviews
      return copy.sort((a, b) => {
        const order: Record<string, number> = {
          EDITOR: 4, BEST: 3, NEW: 2, LIMITED: 1,
        };
        const ar = a.badge ? order[a.badge] ?? 0 : 0;
        const br = b.badge ? order[b.badge] ?? 0 : 0;
        if (ar !== br) return br - ar;
        if (a.rating !== b.rating) return b.rating - a.rating;
        return b.reviewCount - a.reviewCount;
      });
  }
}

export function activeFilterCount(f: FilterState): number {
  let n = 0;
  if (f.price !== "all") n += 1;
  n += f.brands.length;
  n += f.badges.length;
  if (f.rating > 0) n += 1;
  return n;
}
