import Link from "next/link";
import Icon from "./Icon";
import Prose from "./Prose";
import FaqList from "./FaqList";
import LeadForm from "./LeadForm";
import Reviews from "./Reviews";
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
/**
 * CR-16 — `page.bullets` is deliberately NOT rendered. The porting pass swept
 * every list item on the source page into that array *and* left them inside the
 * section bodies, so rendering it duplicated the lists: 27 items on
 * /admissions/help-for-loved-one, 6 on /admissions/admissions-process, 5 on
 * /about/alumni. All seven ported pages were checked; every bullet is a verbatim
 * duplicate of section copy, so nothing unique is lost. The field stays on the
 * type so re-running the porting script cannot regress this.
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
                {s.body && <Prose body={s.body} />}

                {/* CR-15 — structure the porting pass flattened. `items` was
                    prose paragraphs; on the source these were numbered steps or
                    feature tiles. */}
                {s.items?.length ? (
                  s.layout === "steps" ? (
                    <div className={`${c.steps} mt-4`}>
                      {s.items.map((it, n) => (
                        <div key={it.label} className={c.step}>
                          <span className={c.stepNum}>{n + 1}</span>
                          <h3>{it.label}</h3>
                          <p>{it.text}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-2 mt-4">
                      {s.items.map((it) => (
                        <div key={it.label} className={`card ${c.feature}`}>
                          <div className={c.featureIcon}>
                            <Icon name="check" size={24} />
                          </div>
                          <h3>{it.label}</h3>
                          <p>{it.text}</p>
                        </div>
                      ))}
                    </div>
                  )
                ) : null}

                {/* CR-15 — these were live links and buttons on the source. Four
                    rendered as dead text, two of them phone numbers on the
                    primary enquiry path, so untappable on mobile. */}
                {s.cta &&
                  (s.cta.href.startsWith("tel:") ? (
                    <a href={s.cta.href} className="btn btn-lg mt-4">
                      <Icon name="phone" size={18} />
                      {s.cta.label}
                    </a>
                  ) : (
                    <Link href={s.cta.href} className="btn mt-4">
                      {s.cta.label}
                      <Icon name="arrow-right" size={18} />
                    </Link>
                  ))}
              </div>
            ))}

          </div>

          {/* CR-14 — the section this replaces had scraper commentary as its
              body. Renders only on the page the client flagged; hides itself if
              Trustindex is not licensed for the domain yet. */}
          {page.slug === "about/our-story" && <Reviews />}

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
