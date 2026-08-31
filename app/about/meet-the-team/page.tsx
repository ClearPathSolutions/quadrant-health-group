import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import AvatarPlaceholder from "@/components/AvatarPlaceholder";
import PageHero from "@/components/PageHero";
import { teamByGroup } from "@/lib/content";
import t from "./team.module.css";
import { seo } from "@/lib/site";

export const metadata: Metadata = {
  title: "Meet the Team",
  description:
    "Meet the licensed clinicians, medical professionals, and care coordinators behind Quadrant Health Group — the compassionate experts guiding your recovery.",
  ...seo({
    path: "/about/meet-the-team",
    title: "Meet the Team",
    description:
      "Meet the licensed clinicians, medical professionals, and care coordinators behind Quadrant Health Group — the compassionate experts guiding your recovery.",
  }),
};

export default function TeamPage() {
  return (
    <>
      <PageHero
        crumb="Meet the Team"
        eyebrow="Our people"
        title="Meet the team behind your recovery"
        subtitle="Our licensed clinicians, medical professionals, and care coordinators bring deep expertise and genuine compassion to every stage of treatment."
      />

      <section className="section">
        <div className="container">
          {/* T6.1 (visual row 856) — grouped by department and facility rather
              than one flat grid. Empty groups are omitted, so the corporate
              sections appear automatically once T3.2 publishes those bios. */}
          {teamByGroup().map(({ group, members }) => (
            <div key={group} className={t.groupBlock}>
              <h2 className={t.groupTitle}>{group}</h2>
              <div className={t.grid}>
                {/* Only people with a biography get a clickable card. The rest
                    appear in the grid with their photo and title, but linking
                    them would open an empty page. Card and link markup are
                    otherwise identical, so the grid looks uniform either way. */}
                {members.map((m) => {
                  const inner = (
                    <>
                    <div className={t.photo}>
                      {m.image ? (
                        <Image
                          src={m.image}
                          alt={m.name}
                          width={400}
                          height={400}
                          className={t.img}
                          sizes="(max-width: 620px) 50vw, (max-width: 960px) 33vw, 25vw"
                        />
                      ) : (
                        <AvatarPlaceholder label={m.name} />
                      )}
                    </div>
                    <div className={t.info}>
                      <h3 className={t.name}>{m.name}</h3>
                      {m.role && <p className={t.role}>{m.role}</p>}
                    </div>
                    </>
                  );
                  return m.bio ? (
                    <Link key={m.slug} href={`/team/${m.slug}`} className={`${t.card} reveal`}>
                      {inner}
                    </Link>
                  ) : (
                    <div key={m.slug} className={`${t.card} reveal`}>{inner}</div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
