"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function NavigationLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [visible, setVisible] = useState(false);
  const active = useRef(false);
  const startedAt = useRef(0);
  const fallback = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const finish = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const stop = () => {
    if (!active.current) return;
    if (fallback.current) clearTimeout(fallback.current);
    const remaining = Math.max(0, 380 - (Date.now() - startedAt.current));
    finish.current = setTimeout(() => {
      active.current = false;
      setVisible(false);
    }, remaining);
  };

  const start = () => {
    if (active.current) return;
    active.current = true;
    startedAt.current = Date.now();
    setVisible(true);
    fallback.current = setTimeout(stop, 8000);
  };

  useEffect(() => {
    stop();
  }, [pathname, searchParams]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target as Element | null;
      const anchor = target?.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.target || anchor.hasAttribute("download")) return;
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || /^(mailto:|tel:|javascript:)/i.test(href)) return;
      const destination = new URL(anchor.href, window.location.href);
      if (destination.origin !== window.location.origin) return;
      if (`${destination.pathname}${destination.search}` === `${window.location.pathname}${window.location.search}`) return;
      start();
    };
    const onSubmit = () => start();
    const onStart = () => start();
    const onComplete = () => stop();
    document.addEventListener("click", onClick, true);
    document.addEventListener("submit", onSubmit, true);
    window.addEventListener("zikhra:page-loading", onStart);
    window.addEventListener("zikhra:page-loaded", onComplete);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("submit", onSubmit, true);
      window.removeEventListener("zikhra:page-loading", onStart);
      window.removeEventListener("zikhra:page-loaded", onComplete);
      stop();
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="navigation-loader" role="status" aria-live="polite" aria-label="Opening your next page">
      <div className="navigation-loader__content">
        <span className="navigation-loader__spinner" aria-hidden="true" />
        <span>Loading</span>
      </div>
    </div>
  );
}
