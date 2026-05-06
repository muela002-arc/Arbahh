import type { Metadata } from "next";
import CalculatorPageContent from "@/components/CalculatorPageContent";

export const metadata: Metadata = {
  title: "حاسبة أرباح يوتيوب 2026 — RPM عربي حسب الدولة والمجال",
  description:
    "حاسبة أرباح يوتيوب الكاملة مع المشاهدات اليومية، RPM يوتيوب عربي، اختيار المجال والدولة، ونصائح زيادة الأرباح.",
  alternates: { canonical: "/youtube", languages: { ar: "/youtube", en: "/en/youtube-income-calculator" } },
  openGraph: {
    title: "حاسبة أرباح يوتيوب | arbahh.com",
    description: "احسب ربح يوتيوب اليومي والشهري والسنوي حسب المجال والدولة.",
    images: ["/og.webp"]
  }
};

export default function YouTubePage() {
  return (
    <main className="section">
      <CalculatorPageContent />
    </main>
  );
}
