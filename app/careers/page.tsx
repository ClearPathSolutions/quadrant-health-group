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
        subtitle="Our teams span thirteen treatment centers, the corporate office and the wider network. Choose a location to see its current openings and apply."
      />

      <section className="section">
        <div className="container">
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
                  /* No property photography exists for the corporate office,
                     the billing company or the sober-living brand. A brand mark
                     on navy is honest; borrowing a treatment centre's building
                     would show a candidate somewhere they would not work. */
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
                  {/* Nine location photos are face-cards with the name already
                      set into the artwork, so those show only the city. */}
                  {!t.hasCard && <span className={s.name}>{t.name}</span>}
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
              <a href={site.phoneHref} className="btn btn-lg">
                <Icon name="phone" size={18} />
                Call {site.phone}
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
