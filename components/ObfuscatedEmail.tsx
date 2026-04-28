"use client";

import { useEffect, useRef } from "react";

export default function ObfuscatedEmail({ user, domain, className }: { user: string; domain: string; className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.href = `mailto:${user}@${domain}`;
      ref.current.textContent = `${user}@${domain}`;
    }
  }, [user, domain]);

  return <a ref={ref} className={className} />;
}
