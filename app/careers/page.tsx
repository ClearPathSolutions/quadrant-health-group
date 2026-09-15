import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { site, seo } from "@/lib/site";
import { careerTiles, CAREERS_ALL } from "@/lib/careers";
import c from "../content.module.css";
import s from "./careers.module.css";

const HR_PHONE = "(855) 511-5627";

const TITLE = "Careers";
const DESCRIPTION =
  "Join the Quadrant Health Group network. Browse open roles at our treatment centers across California, Texas, Florida, New Jersey, Iowa, Ohio and Kentucky.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  ...seo({ path: "/careers", title: TITLE, description: DESCRIPTION }),
};

export default function CareersPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Careers", path: "/careers" }])} />
      <PageHero
        crumb="Careers"
        eyebrow="Work with us"
        title="Build your career where recovery happens"
        subtitle="Join a team committed to making a meaningful difference in behavioral healthcare. Across our growing network of treatment centers and corporate operations, we're looking for compassionate, driven professionals ready to help individuals and families move toward lasting recovery and wellness."
      />

      <section className="section">
        <div className="container">
          <p className={s.lede}>
            Explore our locations below to view current opportunities and find
            where you fit within Quadrant Health Group.
          </p>
          <div className={s.grid}>
            {careerTiles.map((t) => (
              <a
                key={t.key}
                href={t.href}
                target="_blank"
                rel="noopener noreferrer"
                className={s.tile}
                aria-label={`See openings at ${t.name} in ${t.city}, ${t.state} — opens the ADP Career Center in a new tab`}
              >
                {t.image ? (
                  <Image
                    src={t.image}
                    alt=""
                    width={400}
                    height={500}
                    className={s.img}
                    sizes="(max-width: 420px) 50vw, (max-width: 900px) 33vw, 20vw"
                  />
                ) : (
                  /* Every tile has an image today. This stays as the fallback
                     for any entity added later without one — a brand mark on
                     navy rather than a broken or borrowed photo. */
                  <span className={s.markWrap}>
                    <Image
                      src="/images/logo-mark.png"
                      alt=""
                      width={96}
                      height={96}
                      className={s.mark}
                    />
                  </span>
                )}
                <span className={s.scrim} />
                <span className={s.body}>
                  {/* Client asked for the name on every tile. Nine of the
                      location photos are face-cards with the name already set
                      into the artwork, so on those it now reads twice — once in
                      the image, once here. Plain photos for those nine would be
                      the real fix. */}
                  <span className={s.name}>{t.name}</span>
                  <span className={s.place}>
                    {t.city}, {t.state}
                  </span>
                  <span className={s.cue}>
                    See openings
                    <Icon name="arrow-right" size={14} />
                  </span>
                </span>
              </a>
            ))}
          </div>

          <div className={`${c.ctaMini} mt-4`} style={{ marginTop: "3.5rem" }}>
            <div>
              <h3>Don&apos;t see the right role?</h3>
              <p>
                New positions open across the network regularly. Reach out and
                we&apos;ll point you to the right team.
              </p>
            </div>
            <div className="btn-group">
              {/* HR direct, not the admissions line. Careers page only — the
                  site-wide number stays {site.phone}. */}
              <a href={`tel:+1${HR_PHONE.replace(/\D/g, "")}`} className="btn btn-lg">
                <Icon name="phone" size={18} />
                Call {HR_PHONE}
              </a>
              <a
                href={CAREERS_ALL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-lg"
              >
                All open roles
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
