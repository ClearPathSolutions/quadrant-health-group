import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import FaqList from "@/components/FaqList";
import Reviews from "@/components/Reviews";
import Prose from "@/components/Prose";
import {
  getTreatment,
  treatments,
  treatmentsByCategory,
  categoryLabel,
} from "@/lib/content";
import { site, seo } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { treatmentSchema, faqSchema, breadcrumbSchema } from "@/lib/schema";
import d from "./detail.module.css";

export function generateStaticParams() {
  return treatments.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const t = getTreatment(params.slug);
  if (!t) return {};
  const description = t.metaDescription || t.intro.slice(0, 160);
  return {
    // F-07 — `absolute` suppresses the layout's "%s | Quadrant Health Group"
    // template. These metaTitles are already self-contained SEO titles and two
    // of them carry the brand themselves, which rendered it twice. Dropping the
    // 23-character suffix also pulls every treatment title back under the
    // length where search results truncate.
    title: { absolute: t.metaTitle || t.title },
    description,
    ...seo({
      path: `/treatment/${t.slug}`,
      title: t.title,
      description,
      images: t.image ? [t.image] : undefined,
    }),
  };
}

export default function TreatmentDetail({ params }: { params: { slug: string } }) {
  const t = getTreatment(params.slug);
  if (!t) notFound();

  // Drop a redundant leading hero section if it just repeats the title/intro.
  const sections = t.sections.filter(
    (s) => s.body && !/\(hero\)/i.test(s.heading)
  );
  const siblings = treatmentsByCategory(t.category).filter((x) => x.slug !== t.slug);

  return (
    <>
      {/* F-06 — FAQPage only where the data actually carries pairs; 10 of the
          21 pages have none, and an empty mainEntity is invalid. */}
      <JsonLd
        data={[
          treatmentSchema(t),
          breadcrumbSchema([
            { name: "Treatment", path: "/treatment" },
            { name: t.title, path: `/treatment/${t.slug}` },
          ]),
          ...(t.faqs.length ? [faqSchema(t.faqs, `/treatment/${t.slug}`)] : []),
        ]}
      />
      {/* Hero */}
      <section className={d.hero}>
        <div className={d.blob} />
        <div className={`container ${d.heroInner}`}>
          <div className={d.heroCopy}>
            <nav className={d.crumbs} aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <Icon name="chevron-down" size={14} className={d.sep} />
              <Link href="/treatment">Treatment</Link>
            </nav>
            <span className="eyebrow">{categoryLabel[t.category]}</span>
            <h1 className={d.title}>{t.title}</h1>
            {t.intro && <p className={d.intro}>{t.intro}</p>}
            <div className="btn-group" style={{ marginTop: "1.75rem" }}>
              <a href={site.phoneHref} className="btn btn-lg btn-white">
                <Icon name="phone" size={18} />
                Call {site.phone}
              </a>
              <Link href="/admissions/insurance-verification" className="btn btn-lg btn-outline-white">
                Verify Insurance
              </Link>
            </div>
          </div>
          {t.image && (
            <div className={d.heroMedia}>
              <Image src={t.image} alt={t.title} width={800} height={600} priority className={d.heroImg} sizes="(max-width: 900px) 90vw, 42vw" />
            </div>
          )}
        </div>
      </section>

      {/* Body */}
      <section className="section">
        <div className={`container ${d.layout}`}>
          <div className={d.content}>
            {sections.map((s, i) => (
              <div key={i} className={d.block}>
                {/* T5.1 — sections render at h2 unless the workbook asked for a
                    deeper level for this one. */}
                {s.heading &&
                  (s.level === 4 ? (
                    <h4>{s.heading}</h4>
                  ) : s.level === 3 ? (
                    <h3>{s.heading}</h3>
                  ) : (
                    <h2>{s.heading}</h2>
                  ))}
                <Prose body={s.body} promote={s.promote} />
              </div>
            ))}

            {/* T5.5 — 17 workbook rows ask for a Google reviews slide on the
                treatment pages. Same Trustindex widget as /about/our-story;
                hides itself if the domain is not licensed yet. */}
            {t.faqs.length > 0 && (
              <div className={d.faqs}>
                <h2>Frequently asked questions</h2>
                <FaqList items={t.faqs} />
              </div>
            )}
            <Reviews heading="What our patients say" />
          </div>

          {/* Sidebar */}
          <aside className={d.sidebar}>
            <div className={d.sideCard}>
              <h3>Speak with our team</h3>
              <p>Free, confidential, and available 24/7.</p>
              <a href={site.phoneHref} className="btn btn-block mt-2">
                <Icon name="phone" size={18} />
                {site.phone}
              </a>
              <Link href="/admissions/insurance-verification" className="btn btn-ghost btn-block mt-2">
                Verify Insurance
              </Link>
            </div>
            {siblings.length > 0 && (
              <div className={d.sideCard}>
                <h3>{categoryLabel[t.category]}</h3>
                <ul className={d.sideList}>
                  {siblings.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/treatment/${s.slug}`}>
                        <Icon name="arrow-right" size={16} />
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}
