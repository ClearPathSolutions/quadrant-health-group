"use client";

import { useEffect, useRef, useState } from "react";

/**
 * CR-14 — mirrors the Google reviews the client already publishes.
 *
 * Production runs Trustindex, a licensed Google-reviews aggregator, and the
 * reviews are fetched by its script at runtime — which is exactly why the
 * porting pass could not read them and wrote "no individual testimonial text
 * displayed in source" into the page instead.
 *
 * Embedding the same widget rather than copying review text is deliberate: it
 * stays in sync as new reviews arrive, keeps Google's attribution intact, and
 * avoids republishing patient-adjacent quotes by hand on a YMYL site.
 *
 * Two widgets exist on production — the homepage layout and a second one used on
 * /about. Default is the homepage layout, which is also what /about/our-story
 * used.
 *
 * IMPORTANT: Trustindex licences are domain-locked. Until the new domain is
 * added in the client's Trustindex account the script resolves to
 * "widget-not-found" and injects nothing, so this component removes itself
 * rather than leaving a heading over blank space — the CR-08b defect.
 */
const WIDGETS = {
  homepage: "5efa4e37283a5071b9760677100",
  about: "0c015e55441c798646967f68114",
} as const;

export default function Reviews({
  widget = "homepage",
  heading = "What our patients say about us",
}: {
  widget?: keyof typeof WIDGETS;
  heading?: string;
}) {
  const host = useRef<HTMLDivElement>(null);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!el) return;

    const s = document.createElement("script");
    s.src = `https://cdn.trustindex.io/loader.js?${WIDGETS[widget]}`;
    s.async = true;
    s.defer = true;
    el.appendChild(s);

    // Trustindex injects into the DOM when it resolves. Poll briefly, then give
    // up: an unlicensed domain returns nothing at all rather than an error we
    // can catch.
    const started = Date.now();
    const timer = window.setInterval(() => {
      if (el.querySelector("[class*='ti-']")) {
        setRendered(true);
        window.clearInterval(timer);
      } else if (Date.now() - started > 6000) {
        window.clearInterval(timer);
      }
    }, 300);

    return () => window.clearInterval(timer);
  }, [widget]);

  return (
    <section
      className="section"
      style={{ display: rendered ? undefined : "none" }}
      aria-hidden={!rendered}
    >
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">Reviews</span>
          <h2>{heading}</h2>
        </div>
        <div ref={host} className="mt-4" />
      </div>
    </section>
  );
}
