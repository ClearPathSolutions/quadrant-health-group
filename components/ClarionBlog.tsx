"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

const CLARION_SITE_KEY =
  process.env.NEXT_PUBLIC_CLARION_SITE_KEY ||
  "cpx_-vOkPf-M2Zq1tmLgDgXOFblwF1FOh4sC";

/**
 * Renders posts managed inside Clarion via their blog-embed script.
 * Sits alongside the native blog — the surrounding section only shows
 * once Clarion has actually rendered content, so it stays invisible
 * (no empty heading) until there are Clarion-managed posts to show.
 */
export default function ClarionBlog({ heading }: { heading: string }) {
  const mount = useRef<HTMLDivElement>(null);
  const [hasContent, setHasContent] = useState(false);

  useEffect(() => {
    const el = mount.current;
    if (!el) return;
    const check = () => setHasContent(el.childElementCount > 0);
    check();
    const obs = new MutationObserver(check);
    obs.observe(el, { childList: true, subtree: true });
    return () => obs.disconnect();
  }, []);

  return (
    <section className="section bg-soft" style={{ display: hasContent ? undefined : "none" }}>
      <div className="container">
        <div className="section-head center" style={{ marginBottom: "2.5rem" }}>
          <span className="eyebrow">More resources</span>
          <h2>{heading}</h2>
        </div>
        <div ref={mount} data-clarion-blog />
      </div>
      <Script
        src="https://www.clarionlabs.ai/blog-embed.v1.js"
        strategy="afterInteractive"
        data-site-key={CLARION_SITE_KEY}
        data-api="https://api.clarionlabs.ai"
      />
    </section>
  );
}
