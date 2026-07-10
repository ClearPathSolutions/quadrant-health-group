import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { team } from "@/lib/content";
import t from "./team.module.css";

export const metadata: Metadata = {
  title: "Meet the Team",
  description:
    "Meet the licensed clinicians, medical professionals, and care coordinators behind Quadrant Health Group — the compassionate experts guiding your recovery.",
};

function initials(name: string) {
  return name.split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

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
          <div className={t.grid}>
            {team.map((m) => (
              <Link key={m.slug} href={`/team/${m.slug}`} className={`${t.card} reveal`}>
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
                    <span className={t.initials}>{initials(m.name)}</span>
                  )}
                </div>
                <div className={t.info}>
                  <h3 className={t.name}>{m.name}</h3>
                  {m.role && <p className={t.role}>{m.role}</p>}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
