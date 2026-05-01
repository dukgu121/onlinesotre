import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/shell/AppShell";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Atelier Pharmacy — 매일을 정성껏 처방하다",
    template: "%s · Atelier Pharmacy",
  },
  description:
    "약사가 직접 큐레이션한 프리미엄 헬스케어. 더 신중하게, 더 부드럽게. 매일의 컨디션을 처방합니다.",
  applicationName: "Atelier Pharmacy",
  themeColor: "#F7F4EE",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  maximumScale: 1,
  themeColor: "#F7F4EE",
};

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${display.variable} ${inter.variable}`}>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
