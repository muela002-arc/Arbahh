import type { Metadata } from "next";
import { Cairo, Inter } from "next/font/google";
import Analytics from "@/components/Analytics";
import CookieConsent from "@/components/CookieConsent";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageContext";
import Navbar from "@/components/Navbar";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap"
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://arbahh.com"),
  title: {
    default: "أرباح يوتيوب | حاسبة أرباح يوتيوب عربية",
    template: "%s | أرباح يوتيوب"
  },
  description:
    "حاسبة أرباح يوتيوب عربية لمعرفة الدخل التقريبي حسب المشاهدات، المجال، الدولة، ومعدل RPM يوتيوب عربي.",
  openGraph: {
    title: "أرباح يوتيوب - حاسبة أرباح يوتيوب",
    description: "احسب الأرباح التقديرية لأي قناة يوتيوب مع أداة عربية مجانية لصناع المحتوى.",
    images: ["/og.webp"],
    locale: "ar_AR",
    siteName: "أرباح يوتيوب",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "أرباح يوتيوب",
    description: "حاسبة أرباح يوتيوب عربية مجانية."
  },
  alternates: {
    canonical: "/",
    languages: {
      ar: "/",
      en: "/en"
    }
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${inter.variable}`}>
      <body>
        <LanguageProvider>
          <Navbar />
          {children}
          <Footer />
          <CookieConsent />
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  );
}
