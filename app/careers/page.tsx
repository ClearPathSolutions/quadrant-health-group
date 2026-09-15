import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { locations, site, seo } from "@/lib/site";
import { careerLinks, CAREERS_FALLBACK } from "@/lib/careers";
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

/** Every location that has somewhere for an applicant to land. */
const tiles = locations.filter((l) => !l.comingSoon);

export default function CareersPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Careers", path: "/careers" }])} />
      <PageHero
        crumb="Careers"
        eyebrow="Work with us"
        title="Build your career where recovery happens"
        subtitle="Our teams span thirteen treatment centers nationwide. Choose a location to see its current openings and apply."
      />

      <section className="section">
        <div className="container">
          <div className={s.grid}>
            {tiles.map((loc) => {
              const href = careerLinks[loc.slug] ?? CAREERS_FALLBACK;
              return (
                <a
                  key={loc.slug}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={s.tile}
                  aria-label={`See openings at ${loc.name} in ${loc.city}, ${loc.state} — opens the ADP Career Center in a new tab`}
                >
                  <Image
                    src={loc.image}
                    alt=""
                    width={400}
                    height={500}
                    className={s.img}
                    sizes="(max-width: 420px) 50vw, (max-width: 900px) 33vw, 20vw"
                  />
                  <span className={s.scrim} />
                  <span className={s.body}>
                    {/* Nine of the location photos are face-cards with the name
                        already set into the artwork. Repeating it in markup would
                        print it twice, so those tiles show only the city. */}
                    {!loc.hasCard && <span className={s.name}>{loc.name}</span>}
                    <span className={s.place}>
                      {loc.city}, {loc.state}
                    </span>
                    <span className={s.cue}>
                      See openings
                      <Icon name="arrow-right" size={14} />
                    </span>
                  </span>
                </a>
              );
            })}
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
                href={CAREERS_FALLBACK}
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
