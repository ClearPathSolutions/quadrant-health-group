import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Icon from "@/components/Icon";
import { posts, formatDate, readingTime } from "@/lib/content";
import s from "./blog.module.css";

export const metadata: Metadata = {
  title: "Blog & Resources",
  description:
    "Insights and guidance on addiction, mental health, treatment options, and recovery from the clinical team at Quadrant Health Group.",
};

export default function BlogPage() {
  const [feature, ...rest] = posts;
  return (
    <>
      <PageHero
        crumb="Blog"
        eyebrow="Blog & resources"
        title="Insights on recovery, treatment & mental health"
        subtitle="Guidance from our clinical team to help you understand addiction, navigate treatment, and support lasting recovery — for yourself or someone you love."
      />

      <section className="section">
        <div className="container">
          {feature && (
            <Link href={`/blog/${feature.slug}`} className={`${s.feature} reveal`}>
              <div className={s.featureMedia}>
                {feature.image && (
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={1200}
                    height={800}
                    className={s.img}
                    sizes="(max-width: 900px) 100vw, 55vw"
                    priority
                  />
                )}
              </div>
              <div className={s.featureBody}>
                <span className="tag">Latest</span>
                <h2 className={s.featureTitle}>{feature.title}</h2>
                <p className={s.excerpt}>{feature.excerpt}</p>
                <div className={s.meta}>
                  <span>{formatDate(feature.date)}</span>
                  <span>·</span>
                  <span>{readingTime(feature.sections)} min read</span>
                </div>
                <span className="link-arrow">
                  Read article <Icon name="arrow-right" size={18} />
                </span>
              </div>
            </Link>
          )}

          <div className={`grid grid-3 ${s.grid}`}>
            {rest.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className={`card card-hover ${s.card} reveal`}>
                <div className={s.cardMedia}>
                  {p.image && (
                    <Image
                      src={p.image}
                      alt={p.title}
                      width={600}
                      height={400}
                      className={s.img}
                      sizes="(max-width: 620px) 100vw, (max-width: 960px) 50vw, 33vw"
                    />
                  )}
                </div>
                <div className={s.cardBody}>
                  <div className={s.meta}>
                    <span>{formatDate(p.date)}</span>
                    <span>·</span>
                    <span>{readingTime(p.sections)} min</span>
                  </div>
                  <h3 className={s.cardTitle}>{p.title}</h3>
                  <p className={s.excerpt}>{p.excerpt}</p>
                  <span className="link-arrow">
                    Read more <Icon name="arrow-right" size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
