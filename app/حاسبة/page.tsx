import type { Metadata } from "next";
import CalculatorPageContent from "@/components/CalculatorPageContent";

export const metadata: Metadata = {
  title: "حاسبة أرباح يوتيوب الكاملة",
  description:
    "حاسبة أرباح يوتيوب الكاملة مع المشاهدات اليومية، RPM يوتيوب عربي، العملات، نصائح زيادة الأرباح، ورابط نتيجة قابل للمشاركة.",
  alternates: { canonical: "/حاسبة", languages: { ar: "/حاسبة", en: "/en" } },
  openGraph: {
    title: "حاسبة أرباح يوتيوب الكاملة",
    description: "احسب ربح يوتيوب اليومي والشهري والسنوي حسب المجال والدولة.",
    images: ["/og.webp"]
  }
};

export default function CalculatorPage() {
  return (
    <main className="section">
      <CalculatorPageContent />
    </main>
  );
}
