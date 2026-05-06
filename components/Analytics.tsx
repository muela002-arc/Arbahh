"use client";

import Script from "next/script";

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export default function Analytics() {
  if (!gaId) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="lazyOnload" />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          var consent = 'denied';
          try { consent = localStorage.getItem('arbah_cookie_consent') === 'accepted' ? 'granted' : 'denied'; } catch(e) {}
          gtag('consent', 'default', { analytics_storage: consent });
          gtag('config', '${gaId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
