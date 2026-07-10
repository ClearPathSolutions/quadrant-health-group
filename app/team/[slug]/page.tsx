import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import { getTeamMember, team } from "@/lib/content";
import { site } from "@/lib/site";
import b from "./bio.module.css";

export function generateStaticParams() {
  return team.map((m) => ({ slug: m.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const m = getTeamMember(params.slug);
  if (!m) return {};
  return {
    title: `${m.name}${m.role ? ` — ${m.role}` : ""}`,
    description: m.bio.slice(0, 160),
  };
}

export default function BioPage({ params }: { params: { slug: string } }) {
  const m = getTeamMember(params.slug);
  if (!m) notFound();

  return (
    <section className="section">
      <div className="container">
        <nav className={b.crumbs} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <Icon name="chevron-down" size={14} className={b.sep} />
          <Link href="/about/meet-the-team">Team</Link>
        </nav>

        <div className={b.layout}>
          <aside className={b.side}>
            <div className={b.photo}>
              {m.image ? (
                <Image src={m.image} alt={m.name} width={500} height={500} priority sizes="(max-width: 800px) 90vw, 340px" />
              ) : (
                <span className={b.initials}>
                  {m.name.split(/\s+/).slice(0, 2).map((w) => w[0]).join("")}
                </span>
              )}
            </div>
            <a href={site.phoneHref} className="btn btn-block mt-3">
              <Icon name="phone" size={18} />
              {site.phone}
            </a>
            <Link href="/about/meet-the-team" className="link-arrow" style={{ marginTop: "1rem", justifyContent: "center" }}>
              <Icon name="arrow-right" size={16} style={{ transform: "rotate(180deg)" }} />
              Back to team
            </Link>
          </aside>

          <div className={b.main}>
            <span className="eyebrow">Our team</span>
            <h1 className={b.name}>{m.name}</h1>
            {m.role && <p className={b.role}>{m.role}{m.credentials ? `, ${m.credentials}` : ""}</p>}
            <div className={b.bio}>
              {m.bio.split("\n").filter(Boolean).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
