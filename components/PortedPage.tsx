import Link from "next/link";
import Icon from "./Icon";
import Prose from "./Prose";
import FaqList from "./FaqList";
import LeadForm from "./LeadForm";
import PageHero from "./PageHero";
import { site } from "@/lib/site";
import JsonLd from "./JsonLd";
import { faqSchema, breadcrumbSchema } from "@/lib/schema";
import type { ContentPage } from "@/lib/content";
import c from "@/app/content.module.css";

/**
 * Shared template for the seven pages ported back from production (T1.2 /
 * V0127). They are ordinary content pages — hero, prose sections, an optional
 * bullet list and FAQ set, then the enquiry path. Four of the seven are the
 * primary conversion route, so every one ends with the form and the 24/7 line.
 */
export default function PortedPage({ page }: { page: ContentPage }) {
  return (
    <>
      {/* F-06 — /about/faq alone carries 46 pairs. Emitted here so every ported
          page that has FAQ data gets the markup without repeating it per route. */}
      <JsonLd
        data={[
          breadcrumbSchema([{ name: page.crumb, path: `/${page.slug}` }]),
          ...(page.faqs.length ? [faqSchema(page.faqs, `/${page.slug}`)] : []),
        ]}
      />
      <PageHero crumb={page.crumb} eyebrow={page.eyebrow} title={page.h1} />

      <section className="section">
        <div className="container" style={{ maxWidth: "820px" }}>
          <div className={c.prose}>
            {page.sections.map((s, i) => (
              <div key={i}>
                {s.heading && <h2>{s.heading}</h2>}
                <Prose body={s.body} />
              </div>
            ))}

            {page.bullets.length > 0 && (
              <ul>
                {page.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            )}
          </div>

          {page.faqs.length > 0 && (
            <div style={{ marginTop: "3rem" }}>
              <h2 style={{ marginBottom: "1.5rem" }}>
                Frequently asked questions
              </h2>
              <FaqList items={page.faqs} />
            </div>
          )}
        </div>
      </section>

      <section className="section bg-soft">
        <div className="container" style={{ maxWidth: "760px" }}>
          <div className="section-head center">
            <span className="eyebrow">Get started</span>
            <h2>Talk to our admissions team</h2>
            <p>
              Free, confidential, and available 24 hours a day. Reach us any time
              at <a href={site.phoneHref}>{site.phone}</a>.
            </p>
          </div>
          <div className="mt-4">
            <LeadForm formName={`ported_${page.slug.replace(/\//g, "_")}`} />
          </div>
          <div className="text-center mt-4">
            <Link href="/admissions" className="link-arrow">
              Back to Admissions
              <Icon name="arrow-right" size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
