"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Language = "ar" | "en";

type LanguageContextValue = {
  language: Language;
  lang: Language;
  setLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("ar");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("arbah_lang");
      if (stored === "ar" || stored === "en") {
        setLanguageState(stored);
      }
    } catch {
      setLanguageState("ar");
    }
  }, []);

  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  function setLanguage(nextLanguage: Language) {
    setLanguageState(nextLanguage);
    try {
      window.localStorage.setItem("arbah_lang", nextLanguage);
    } catch {
      // Keep the in-memory language switch working when storage is unavailable.
    }
  }

  const value = useMemo(() => ({ language, lang: language, setLanguage }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
}
