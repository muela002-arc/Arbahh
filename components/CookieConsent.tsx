"use client";

import { useEffect, useState } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      setVisible(window.localStorage.getItem("arbah_cookie_consent") !== "accepted");
    } catch {
      setVisible(false);
    }
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-3xl rounded-2xl border border-slate-700 bg-slate-950 p-4 shadow-2xl" dir="rtl">
      <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
        <p className="text-sm leading-7 text-slate-300">
          نستخدم ملفات ارتباط أساسية، وقد نستخدم Google Analytics و Google AdSense بعد الموافقة لقياس الأداء وعرض إعلانات مخصصة أو غير مخصصة. يمكنك متابعة استخدام الموقع بدون تسجيل دخول.
        </p>
        <button
          className="rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700"
          onClick={() => {
            try {
              window.localStorage.setItem("arbah_cookie_consent", "accepted");
              window.location.reload();
            } catch {
              setVisible(false);
            }
          }}
          type="button"
        >
          موافق
        </button>
      </div>
    </div>
  );
}
