"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Adds a graceful fade/slide-in to any element with the `.reveal` class
 * as it enters the viewport. No-op if reduced motion is preferred.
 */
export default function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (!els.length) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }

    // Fail-safe: if anything is still hidden after 3s (e.g. observer missed a
    // fast programmatic scroll), reveal it so content is never stuck invisible.
    const safety = window.setTimeout(() => {
      els.forEach((el) => el.classList.add("in"));
    }, 3000);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    els.forEach((el) => io.observe(el));
    return () => {
      window.clearTimeout(safety);
      io.disconnect();
    };
  }, [pathname]);

  return null;
}
