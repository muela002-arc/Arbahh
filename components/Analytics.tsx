"use client";

import Script from "next/script";
import { useEffect } from "react";

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export default function Analytics() {
  useEffect(() => {
    if (!gaId || typeof window === "undefined") return;
    const consent = window.localStorage.getItem("arbah_cookie_consent") === "accepted";
    // Update consent after the script has initialised
    window.gtag?.("consent", "update", {
      analytics_storage: consent ? "granted" : "denied"
    });
  }, []);

  if (!gaId) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('consent', 'default', { analytics_storage: 'denied' });
          gtag('config', '${gaId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
