"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage, type Language } from "./LanguageContext";

const links = {
  ar: [
    { href: "/", label: "الرئيسية" },
    { href: "/youtube", label: "يوتيوب" },
    { href: "/tiktok", label: "تيك توك" },
    { href: "/instagram", label: "إنستغرام" },
    { href: "/مجالات", label: "المجالات" },
    { href: "/دليل", label: "الدليل" }
  ],
  en: [
    { href: "/", label: "Home" },
    { href: "/youtube", label: "YouTube" },
    { href: "/tiktok", label: "TikTok" },
    { href: "/instagram", label: "Instagram" },
    { href: "/مجالات", label: "Niches" },
    { href: "/دليل", label: "Guide" }
  ]
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const currentLinks = links[language];

  function LanguageButton({ value }: { value: Language }) {
    const active = language === value;
    return (
      <button
        className={`focus-ring rounded-lg px-3 py-2 text-sm font-semibold transition ${
          active ? "bg-red-600 text-white underline decoration-white underline-offset-4" : "bg-slate-800 text-slate-300"
        }`}
        onClick={() => setLanguage(value)}
        type="button"
      >
        {value.toUpperCase()}
      </button>
    );
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/90 backdrop-blur" dir={language === "ar" ? "rtl" : "ltr"}>
      <nav className="container-page flex min-h-16 items-center justify-between gap-4" aria-label={language === "ar" ? "التنقل الرئيسي" : "Main navigation"}>
        <Link className="flex items-center gap-3 font-semibold text-slate-100" href="/">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-red-600 text-white">ي</span>
          <span>{language === "ar" ? "أرباح يوتيوب" : "Arbahh YouTube"}</span>
        </Link>
        <button
          aria-expanded={open}
          aria-label={language === "ar" ? "فتح القائمة" : "Open menu"}
          className="focus-ring rounded-xl border border-slate-800 px-3 py-2 font-medium text-slate-100 md:hidden"
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          {language === "ar" ? "القائمة" : "Menu"}
        </button>
        <div className="hidden items-center gap-2 md:flex">
          {currentLinks.map((link) => (
            <Link className="focus-ring rounded-xl px-3 py-2 text-sm font-medium text-slate-300 hover:text-red-500" href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-1 rounded-xl border border-slate-800 p-1">
            <LanguageButton value="ar" />
            <LanguageButton value="en" />
          </div>
        </div>
      </nav>
      {open ? (
        <div className="container-page grid gap-2 pb-4 md:hidden">
          {currentLinks.map((link) => (
            <Link className="rounded-xl bg-slate-900 px-4 py-3 font-medium text-slate-100" href={link.href} key={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-2">
            <LanguageButton value="ar" />
            <LanguageButton value="en" />
          </div>
        </div>
      ) : null}
    </header>
  );
}
