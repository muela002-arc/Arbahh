"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export default function Analytics() {
  const [enabled, setEnabled] = useState(false);

  // GDPR: analytics only loads after explicit consent
  useEffect(() => {
    try {
      setEnabled(Boolean(gaId) && window.localStorage.getItem("arbah_cookie_consent") === "accepted");
    } catch {
      setEnabled(false);
    }
  }, []);

  if (!enabled || !gaId) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
