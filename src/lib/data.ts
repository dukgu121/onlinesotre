// Mock data — premium pharmacy catalog. UI-only (real services attach later).

export type Category = {
  slug: string;
  name: string;
  nameEn: string;
  tagline: string;
  count: number;
  swatch: string; // tailwind bg class for chip
};

export type Product = {
  slug: string;
  name: string;
  nameEn?: string;
  brand: string;
  category: string; // category slug
  categoryName: string;
  badge?: "NEW" | "BEST" | "EDITOR" | "LIMITED" | "PRESCRIPTION";
  price: number;
  original?: number;
  capacity: string; // e.g., "60정", "120ml"
  intake: string; // e.g., "1일 1회"
  rating: number;
  reviewCount: number;
  hero: string; // single line tagline
  description: string;
  ingredients: string[];
  highlights: { label: string; value: string }[];
  notes: { title: string; body: string }[];
  warnings: string[];
  pharmacistNote?: string;
  imageTone: string; // tailwind bg gradient class for hero/card
  accent: string; // tailwind color class for product accent
  glyph: string; // small visual identifier (single char/letter)
};

export type Review = {
  id: string;
  productSlug: string;
  author: string;
  rating: number;
  date: string;
  body: string;
  verified: boolean;
  helpful: number;
};

export type JournalEntry = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  imageTone: string;
};

export const categories: Category[] = [
  { slug: "immunity",   name: "면역 · 비타민",     nameEn: "Immunity",   tagline: "매일의 균형을 위한",        count: 142, swatch: "bg-sage-100" },
  { slug: "sleep",      name: "수면 · 스트레스",   nameEn: "Sleep",      tagline: "고요한 밤의 회복",          count: 68,  swatch: "bg-clay-100" },
  { slug: "digestive",  name: "위 · 장 건강",      nameEn: "Digestive",  tagline: "내일의 컨디션",             count: 96,  swatch: "bg-sage-50" },
  { slug: "joint",      name: "관절 · 뼈",         nameEn: "Joint",      tagline: "가벼운 움직임",             count: 54,  swatch: "bg-cream-200" },
  { slug: "women",      name: "여성 건강",         nameEn: "Women",      tagline: "리듬에 맞춘 케어",          count: 73,  swatch: "bg-clay-200" },
  { slug: "skin",       name: "피부 · 이너뷰티",   nameEn: "Inner Beauty", tagline: "안에서부터 빛나는",       count: 88,  swatch: "bg-sage-100" },
  { slug: "eye",        name: "눈 · 시력",         nameEn: "Eye",        tagline: "맑은 시야",                 count: 32,  swatch: "bg-cream-200" },
  { slug: "kids",       name: "임산부 · 키즈",     nameEn: "Family",     tagline: "처음부터 신중하게",         count: 47,  swatch: "bg-sage-50" },
  { slug: "device",     name: "의료기기",          nameEn: "Devices",    tagline: "집에서 계속되는 케어",     count: 28,  swatch: "bg-clay-100" },
  { slug: "otc",        name: "일반의약품",        nameEn: "OTC",        tagline: "갑작스런 순간을 위해",     count: 119, swatch: "bg-cream-200" },
];

export const products: Product[] = [
  {
    slug: "marine-omega-3",
    name: "프리미엄 마린 오메가-3",
    nameEn: "Marine Omega-3",
    brand: "ATELIER PHARMACY",
    category: "immunity",
    categoryName: "면역 · 비타민",
    badge: "EDITOR",
    price: 68000,
    original: 82000,
    capacity: "60캡슐 · 30일분",
    intake: "1일 2회 식후",
    rating: 4.9,
    reviewCount: 1284,
    hero: "북대서양 청정 해역에서 정제한 알티지 오메가-3.",
    description:
      "rTG 형태의 고순도 오메가-3 1,200mg을 한 캡슐에. EPA·DHA 비율을 한국인 식단 기준으로 재설계해 매일의 균형을 부드럽게 회복합니다.",
    ingredients: ["정제어유 1,200mg (rTG)", "EPA 540mg", "DHA 360mg", "비타민 E 12mg α-TE"],
    highlights: [
      { label: "형태",   value: "rTG 알티지" },
      { label: "원료",   value: "EPAX® 노르웨이산" },
      { label: "정제",   value: "11단계 분자증류" },
      { label: "냄새",   value: "무비린, 레몬 미향" },
    ],
    notes: [
      { title: "복용법", body: "1일 2회, 아침·저녁 식후 1캡슐씩. 충분한 물과 함께 섭취하세요." },
      { title: "보관",   body: "직사광선을 피해 서늘한 곳에 보관. 개봉 후 60일 이내 섭취 권장." },
    ],
    warnings: ["임산부, 수유부는 전문가와 상담 후 섭취", "항응고제 복용 중인 경우 주의"],
    pharmacistNote: "심혈관 컨디션이 신경 쓰이는 30대 이상에게 가장 먼저 권하는 한 알입니다.",
    imageTone: "from-sage-100 via-sage-50 to-cream-100",
    accent: "text-sage-700",
    glyph: "Ω",
  },
  {
    slug: "deep-sleep-magnesium",
    name: "딥 슬립 마그네슘 글리시네이트",
    nameEn: "Deep Sleep Magnesium",
    brand: "NUIT APOTHÉCAIRE",
    category: "sleep",
    categoryName: "수면 · 스트레스",
    badge: "BEST",
    price: 42000,
    capacity: "90정 · 30일분",
    intake: "취침 30분 전 3정",
    rating: 4.8,
    reviewCount: 2104,
    hero: "잠들기 전, 부드럽게 풀어지는 한 잔의 의식.",
    description:
      "위장 부담이 적은 글리시네이트 형태의 마그네슘에 L-테아닌과 GABA를 더했습니다. 깊은 잠과 다음 날의 컨디션을 동시에 설계합니다.",
    ingredients: ["마그네슘 글리시네이트 300mg", "L-테아닌 200mg", "GABA 100mg", "비타민 B6 1.4mg"],
    highlights: [
      { label: "흡수율", value: "산화형 대비 4.2배" },
      { label: "각성감", value: "무카페인" },
      { label: "맛",     value: "라벤더-카모마일" },
      { label: "캡슐",   value: "식물성 HPMC" },
    ],
    notes: [
      { title: "복용법", body: "취침 30분 전 3정. 따뜻한 물 또는 무카페인 차와 함께 권장합니다." },
      { title: "느낌",   body: "복용 후 4–7일째부터 입면 시간이 짧아지는 경험을 보고하는 편입니다." },
    ],
    warnings: ["신장 질환자는 섭취 전 상담", "운전 직전 섭취는 권장하지 않습니다"],
    pharmacistNote: "잠들기 어렵고 자다가 자주 깨는 분들께 가장 자주 추천합니다.",
    imageTone: "from-clay-100 via-cream-100 to-sage-100",
    accent: "text-clay-600",
    glyph: "ζ",
  },
  {
    slug: "vitamin-c-1000-buffered",
    name: "버퍼드 비타민 C 1000",
    nameEn: "Buffered Vitamin C",
    brand: "ATELIER PHARMACY",
    category: "immunity",
    categoryName: "면역 · 비타민",
    badge: "BEST",
    price: 28000,
    capacity: "120정 · 60일분",
    intake: "1일 2회 식후",
    rating: 4.7,
    reviewCount: 3421,
    hero: "위에 부드러운 산도, 매일이 가벼운 비타민 C.",
    description:
      "스코틀랜드 DSM 사의 Quali®-C 비타민 C 1,000mg에 미네랄 버퍼링을 적용해 위 자극을 최소화했습니다.",
    ingredients: ["비타민 C 1,000mg (Quali®-C)", "칼슘 110mg", "마그네슘 40mg", "퀘르세틴 25mg"],
    highlights: [
      { label: "원료",   value: "DSM Quali®-C" },
      { label: "산도",   value: "버퍼링 pH 5.0" },
      { label: "정제",   value: "코팅 무첨가" },
      { label: "지속",   value: "8시간 슬로우" },
    ],
    notes: [
      { title: "복용법", body: "아침·저녁 식후 1정. 흡연·음주가 잦은 날에는 1정 추가 가능." },
    ],
    warnings: ["철분제 복용 직후 함께 섭취 시 흡수 변화 가능"],
    pharmacistNote: "위가 약한 분들이 가장 편하게 매일 챙길 수 있는 비타민 C입니다.",
    imageTone: "from-cream-200 via-cream-100 to-clay-100",
    accent: "text-clay-500",
    glyph: "C",
  },
  {
    slug: "probiotic-19-strain",
    name: "19종 멀티 프로바이오틱스",
    nameEn: "19-Strain Probiotic",
    brand: "MAISON GUT",
    category: "digestive",
    categoryName: "위 · 장 건강",
    badge: "NEW",
    price: 56000,
    original: 62000,
    capacity: "30포 · 30일분",
    intake: "1일 1포 공복",
    rating: 4.9,
    reviewCount: 882,
    hero: "장 점막에 정착하는 19종, 200억 CFU.",
    description:
      "이중 코팅 캡슐을 대체한 듀얼-매트릭스 분말 공법. 위산을 통과해 장에 도달하는 비율을 90% 이상으로 끌어올렸습니다.",
    ingredients: ["19종 유산균 200억 CFU", "프락토올리고당", "이눌린", "효모추출물"],
    highlights: [
      { label: "균종",   value: "19 strains" },
      { label: "보장",   value: "유통기한 200억" },
      { label: "공법",   value: "Dual-Matrix" },
      { label: "보관",   value: "실온 가능" },
    ],
    notes: [
      { title: "복용법", body: "공복에 미온수와 함께. 발효유와 함께 섭취하면 정착률이 더 높아집니다." },
    ],
    warnings: ["면역억제제 복용자는 상담 후 섭취"],
    pharmacistNote: "여행, 출장, 환절기에 컨디션이 흔들리는 분들의 첫 선택지로 추천합니다.",
    imageTone: "from-sage-50 via-cream-100 to-sage-100",
    accent: "text-sage-700",
    glyph: "β",
  },
  {
    slug: "joint-collagen-uc2",
    name: "비변성 II형 콜라겐 UC-II®",
    nameEn: "UC-II® Collagen",
    brand: "MOVE LAB",
    category: "joint",
    categoryName: "관절 · 뼈",
    price: 78000,
    capacity: "30캡슐 · 30일분",
    intake: "1일 1회 취침 전",
    rating: 4.8,
    reviewCount: 511,
    hero: "관절의 부드러운 움직임, 한 알의 정밀함.",
    description:
      "글루코사민의 1/40 용량으로 동등 이상의 효과를 보고하는 비변성 II형 콜라겐 UC-II® 40mg. 면역관용 메커니즘으로 작용합니다.",
    ingredients: ["UC-II® 40mg", "비타민 D 25μg", "망간 2mg", "MSM 100mg"],
    highlights: [
      { label: "원료",   value: "Lonza UC-II®" },
      { label: "특허",   value: "면역관용 기전" },
      { label: "용량",   value: "1일 1캡슐" },
      { label: "임상",   value: "12주 RCT" },
    ],
    notes: [
      { title: "복용법", body: "공복 또는 취침 전. 고온의 음식과 함께 섭취하지 않습니다." },
    ],
    warnings: ["임산부, 수유부 섭취 금지", "글루코사민 알레르기 시 주의"],
    pharmacistNote: "걷기·러닝을 즐기는 40대 이상의 일상 회복에 가장 권하고 싶은 제품입니다.",
    imageTone: "from-cream-200 via-clay-100 to-cream-100",
    accent: "text-clay-600",
    glyph: "II",
  },
  {
    slug: "iron-bisglycinate",
    name: "철분 비스글리시네이트",
    nameEn: "Iron Bisglycinate",
    brand: "MAISON FEMME",
    category: "women",
    categoryName: "여성 건강",
    badge: "BEST",
    price: 32000,
    capacity: "60정 · 60일분",
    intake: "1일 1회 공복",
    rating: 4.9,
    reviewCount: 1903,
    hero: "변비 없이, 위 부담 없이. 매일의 철분.",
    description:
      "Albion® 비스글리시네이트 철 25mg. 위장 부담과 변비 부작용을 최소화한 흡수율 4배 형태. 비타민 C·B12·엽산을 함께 설계했습니다.",
    ingredients: ["Albion® 철분 25mg", "비타민 C 80mg", "엽산 400μg", "비타민 B12 2.4μg"],
    highlights: [
      { label: "형태",   value: "Bisglycinate" },
      { label: "흡수",   value: "산화철 대비 4×" },
      { label: "부작용", value: "변비·구역 ↓" },
      { label: "복용",   value: "공복 가능" },
    ],
    notes: [
      { title: "복용법", body: "공복에 비타민 C와 함께. 우유·커피·녹차와는 2시간 간격을 둡니다." },
    ],
    warnings: ["철분 과잉 시 두통 가능"],
    pharmacistNote: "생리량이 많거나, 채식 비중이 높은 여성에게 가장 먼저 권합니다.",
    imageTone: "from-clay-100 via-clay-200 to-cream-100",
    accent: "text-clay-600",
    glyph: "Fe",
  },
  {
    slug: "low-molecular-collagen",
    name: "저분자 피쉬 콜라겐 펩타이드",
    nameEn: "Low-MW Collagen",
    brand: "PEAU CLAIRE",
    category: "skin",
    categoryName: "피부 · 이너뷰티",
    badge: "BEST",
    price: 48000,
    capacity: "30포 · 30일분",
    intake: "1일 1포",
    rating: 4.8,
    reviewCount: 2842,
    hero: "1,000Da, 흡수되는 콜라겐의 새 기준.",
    description:
      "Peptan® IIm 저분자 콜라겐 5,000mg. 비타민 C, 엘라스틴, 히알루론산을 함께 담아 한 포로 안에서부터 빛나는 피부를 설계합니다.",
    ingredients: ["Peptan® 콜라겐 5,000mg", "비타민 C 100mg", "히알루론산 30mg", "엘라스틴 10mg"],
    highlights: [
      { label: "분자량", value: "1,000 Da" },
      { label: "원료",   value: "프랑스 Rousselot" },
      { label: "맛",     value: "라이트 자몽" },
      { label: "당",     value: "0g" },
    ],
    notes: [
      { title: "복용법", body: "물 또는 차에 풀어 1일 1포. 공복 또는 잠자기 전이 효과적입니다." },
    ],
    warnings: ["어류 알레르기 주의"],
    imageTone: "from-clay-100 via-cream-100 to-clay-200",
    accent: "text-clay-600",
    glyph: "α",
  },
  {
    slug: "lutein-zeaxanthin-20",
    name: "루테인 지아잔틴 20",
    nameEn: "Lutein-Zeaxanthin 20",
    brand: "ATELIER PHARMACY",
    category: "eye",
    categoryName: "눈 · 시력",
    price: 36000,
    capacity: "60캡슐 · 60일분",
    intake: "1일 1회 식후",
    rating: 4.7,
    reviewCount: 1102,
    hero: "스크린 너머로 향하는 시선을 위해.",
    description:
      "FloraGLO® 루테인 20mg + 지아잔틴 4mg, 황반 색소밀도를 위한 황금 비율 5:1.",
    ingredients: ["루테인 20mg (FloraGLO®)", "지아잔틴 4mg", "비타민 A 350μg RAE", "아연 8mg"],
    highlights: [
      { label: "원료",   value: "Kemin FloraGLO®" },
      { label: "비율",   value: "Lutein:Zea 5:1" },
      { label: "오일",   value: "MCT 베이스" },
      { label: "캡슐",   value: "어류 젤라틴" },
    ],
    notes: [{ title: "복용법", body: "식후 1캡슐. 지방과 함께 섭취 시 흡수율이 높아집니다." }],
    warnings: ["흡연자는 베타카로틴 함량 제품과 동시 섭취 주의"],
    imageTone: "from-clay-100 via-clay-200 to-cream-100",
    accent: "text-clay-500",
    glyph: "λ",
  },
  {
    slug: "milk-thistle-silymarin",
    name: "밀크씨슬 실리마린 600",
    nameEn: "Milk Thistle 600",
    brand: "MAISON GUT",
    category: "digestive",
    categoryName: "간 · 해독",
    price: 39000,
    capacity: "60정 · 30일분",
    intake: "1일 2정",
    rating: 4.6,
    reviewCount: 904,
    hero: "회식 다음 날의 가벼움.",
    description:
      "독일산 밀크씨슬 추출물 실리마린 600mg. 비타민 B군과 함께 간 컨디션을 보호합니다.",
    ingredients: ["밀크씨슬 추출물 600mg (실리마린 80%)", "비타민 B1 1.2mg", "비타민 B2 1.4mg"],
    highlights: [
      { label: "원료",   value: "독일 Euromed" },
      { label: "함량",   value: "실리마린 480mg" },
      { label: "정제",   value: "셀룰로오스 코팅" },
      { label: "용량",   value: "30일분" },
    ],
    notes: [{ title: "복용법", body: "아침·저녁 1정씩. 음주 전후 추가 1정 권장." }],
    warnings: ["담낭 질환자는 섭취 전 상담"],
    imageTone: "from-sage-100 via-cream-100 to-sage-50",
    accent: "text-sage-700",
    glyph: "ψ",
  },
  {
    slug: "kids-d3-drops",
    name: "키즈 비타민 D3 드롭",
    nameEn: "Kids D3 Drops",
    brand: "PETIT SOIN",
    category: "kids",
    categoryName: "임산부 · 키즈",
    badge: "NEW",
    price: 24000,
    capacity: "10ml · 약 400회",
    intake: "1일 1방울",
    rating: 4.9,
    reviewCount: 612,
    hero: "한 방울이면 충분합니다.",
    description:
      "유기농 MCT 오일에 녹인 비타민 D3 400IU. 무향, 무첨가로 신생아부터 안전하게 사용합니다.",
    ingredients: ["비타민 D3 400IU", "유기농 MCT 오일"],
    highlights: [
      { label: "사용",   value: "신생아 가능" },
      { label: "맛",     value: "무향·무미" },
      { label: "용량",   value: "약 400회분" },
      { label: "베이스", value: "유기농 MCT" },
    ],
    notes: [{ title: "사용법", body: "유두, 분유 또는 음식에 한 방울. 직접 입에 떨어뜨려도 됩니다." }],
    warnings: ["1일 권장량 초과 섭취 금지"],
    imageTone: "from-cream-200 via-clay-100 to-sage-50",
    accent: "text-sage-700",
    glyph: "D",
  },
  {
    slug: "thermometer-precision",
    name: "프리시전 비접촉 체온계",
    nameEn: "Precision Thermometer",
    brand: "MEDLINE STUDIO",
    category: "device",
    categoryName: "의료기기",
    price: 89000,
    capacity: "본체 · 케이스 · 보증 2년",
    intake: "비접촉 1초",
    rating: 4.8,
    reviewCount: 421,
    hero: "1초의 정확함, 매일의 안심.",
    description:
      "독일제 적외선 센서. ±0.2°C 정밀도, 32회 메모리, 무진동 알림. 신생아부터 사용 가능한 비접촉 적외선 체온계.",
    ingredients: ["독일제 적외선 센서", "32회 메모리", "무진동 알림 모드", "USB-C 충전"],
    highlights: [
      { label: "정확도", value: "±0.2°C" },
      { label: "측정",   value: "비접촉 1초" },
      { label: "메모리", value: "32회" },
      { label: "보증",   value: "2년" },
    ],
    notes: [{ title: "사용법", body: "이마에서 3–5cm 거리에서 측정. 사용 전 30분 실내 적응 권장." }],
    warnings: ["직사광선 아래 측정 시 오차 발생"],
    imageTone: "from-cream-200 via-cream-100 to-ink-100",
    accent: "text-ink-700",
    glyph: "°",
  },
  {
    slug: "rest-tea-blend",
    name: "이브닝 레스트 티 블렌드",
    nameEn: "Evening Rest Tea",
    brand: "NUIT APOTHÉCAIRE",
    category: "sleep",
    categoryName: "수면 · 스트레스",
    badge: "EDITOR",
    price: 32000,
    capacity: "20티백",
    intake: "취침 1시간 전",
    rating: 4.7,
    reviewCount: 268,
    hero: "잠들기 전 한 잔, 마음의 속도를 늦추는.",
    description:
      "독일산 카모마일, 프랑스 라벤더, 발레리안 뿌리를 약사가 직접 블렌딩한 무카페인 허브티.",
    ingredients: ["카모마일", "라벤더", "발레리안", "레몬밤", "패션플라워"],
    highlights: [
      { label: "카페인", value: "0mg" },
      { label: "원산지", value: "EU 유기농" },
      { label: "포장",   value: "코튼 티백" },
      { label: "블렌드", value: "약사 처방" },
    ],
    notes: [{ title: "음용법", body: "85°C 물에 4분 우려냅니다. 꿀이나 따뜻한 우유와 잘 어울립니다." }],
    warnings: ["임산부 섭취 시 상담"],
    imageTone: "from-clay-100 via-cream-100 to-clay-200",
    accent: "text-clay-600",
    glyph: "✿",
  },
];

export const reviewsByProduct: Review[] = [
  {
    id: "r1", productSlug: "marine-omega-3", author: "정 * 윤", rating: 5,
    date: "2026.04.18", verified: true, helpful: 142,
    body: "비린내가 거의 없고, 캡슐도 작아서 매일 부담 없이 챙기고 있어요. 6주째 복용 중인데 컨디션 차이를 느낍니다.",
  },
  {
    id: "r2", productSlug: "marine-omega-3", author: "K. Lee", rating: 5,
    date: "2026.04.05", verified: true, helpful: 88,
    body: "다른 브랜드 오메가3에서 트림이 올라왔는데 이건 깔끔합니다. 패키징도 너무 예뻐서 선물로도 자주 보내요.",
  },
  {
    id: "r3", productSlug: "deep-sleep-magnesium", author: "최 * 영", rating: 5,
    date: "2026.04.20", verified: true, helpful: 201,
    body: "복용 5일째부터 깊게 자는 게 느껴져요. 아침에 무거운 느낌도 없고, 위에 부담도 없습니다.",
  },
  {
    id: "r4", productSlug: "deep-sleep-magnesium", author: "박 * 호", rating: 4,
    date: "2026.04.11", verified: true, helpful: 64,
    body: "잠드는 속도가 확실히 빨라졌습니다. 향이 은은해서 취침 의식처럼 챙기게 되네요.",
  },
];

export const journal: JournalEntry[] = [
  {
    slug: "winter-immunity-ritual",
    category: "JOURNAL · 01",
    title: "환절기, 면역의 균형을 잡는 다섯 가지 의식",
    excerpt:
      "약사가 직접 정리한, 매일의 작은 루틴이 어떻게 면역의 회복력을 만드는가에 관한 노트.",
    readTime: "6분 읽기",
    imageTone: "from-sage-100 via-sage-50 to-cream-100",
  },
  {
    slug: "magnesium-101",
    category: "INGREDIENT · 02",
    title: "마그네슘, 형태에 따라 달라지는 흡수의 과학",
    excerpt:
      "산화·구연산·글리시네이트. 같은 마그네슘이지만 몸 안에서의 여정은 전혀 다릅니다.",
    readTime: "4분 읽기",
    imageTone: "from-clay-100 via-cream-100 to-clay-200",
  },
  {
    slug: "sleep-architecture",
    category: "RITUAL · 03",
    title: "잠들기 전 90분, 회복을 설계하는 시간",
    excerpt:
      "조명, 온도, 호흡, 그리고 한 잔의 차. 깊은 잠을 만드는 밤의 건축술.",
    readTime: "5분 읽기",
    imageTone: "from-sage-50 via-cream-100 to-sage-100",
  },
];

export const collections = {
  pharmacistsPick: ["marine-omega-3", "deep-sleep-magnesium", "iron-bisglycinate", "probiotic-19-strain"],
  newArrivals:    ["probiotic-19-strain", "kids-d3-drops", "joint-collagen-uc2"],
  bestseller:     ["vitamin-c-1000-buffered", "deep-sleep-magnesium", "low-molecular-collagen", "iron-bisglycinate"],
  editorsChoice:  ["marine-omega-3", "rest-tea-blend", "joint-collagen-uc2"],
};

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsBySlugs(slugs: string[]): Product[] {
  return slugs.map((s) => products.find((p) => p.slug === s)).filter(Boolean) as Product[];
}

export function getProductsByCategory(slug: string): Product[] {
  return products.filter((p) => p.category === slug);
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
