import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
      <span className="eyebrow">404</span>
      <h1 className="font-serif text-display-lg text-ink-900 mt-3">
        이 페이지는 존재하지 않습니다
      </h1>
      <p className="mt-3 text-body text-ink-500 max-w-xs">
        주소가 정확한지 다시 한번 확인해 주세요. 처음 화면으로 안내해 드립니다.
      </p>
      <Link
        href="/"
        className="tap mt-8 inline-flex h-12 px-6 items-center rounded-md bg-ink-900 text-cream-50 text-body font-medium"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
