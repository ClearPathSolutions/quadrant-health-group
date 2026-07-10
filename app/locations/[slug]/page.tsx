import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import LeadForm from "@/components/LeadForm";
import { locations, site } from "@/lib/site";
import { getLocationDetail } from "@/lib/content";
import d from "./location.module.css";

const detailable = locations.filter((l) => !l.comingSoon);

export function generateStaticParams() {
  return detailable.map((l) => ({ slug: l.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const loc = locations.find((l) => l.slug === params.slug);
  const detail = getLocationDetail(params.slug);
  if (!loc) return {};
  return {
    title: `${loc.name} — ${loc.city}, ${loc.state}`,
    description: detail?.metaDescription || loc.blurb,
    openGraph: { title: loc.name, description: detail?.metaDescription || loc.blurb, images: [loc.image] },
  };
}

// Map a care label to its treatment detail page slug (if one exists).
const careToSlug: Record<string, string> = {
  Detox: "detox",
  Residential: "residential-inpatient",
  PHP: "partial-hospitalization",
  IOP: "intensive-outpatient",
  "Virtual IOP": "virtual-intensive-outpatient",
  "Dual Diagnosis": "dual-diagnosis",
};

export default function LocationDetail({ params }: { params: { slug: string } }) {
  const loc = locations.find((l) => l.slug === params.slug);
  if (!loc || loc.comingSoon) notFound();
  const detail = getLocationDetail(params.slug);

  const care = detail?.care?.length ? detail.care : loc.care;
  const city = detail?.city || loc.city;
  const state = detail?.state || loc.state;
  const intro = detail?.intro || loc.blurb;

  return (
    <>
      {/* Hero */}
      <section className={d.hero}>
        <div className={`container ${d.heroInner}`}>
          <div className={d.heroCopy}>
            <nav className={d.crumbs} aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <Icon name="chevron-down" size={14} className={d.sep} />
              <Link href="/locations">Locations</Link>
            </nav>
            <p className={d.place}>
              <Icon name="pin" size={18} />
              {city}, {state}
            </p>
            <h1 className={d.title}>{loc.name}</h1>
            <p className={d.intro}>{intro}</p>
            <div className="btn-group" style={{ marginTop: "1.75rem" }}>
              <a href={site.phoneHref} className="btn btn-lg btn-white">
                <Icon name="phone" size={18} />
                Call {site.phone}
              </a>
              <Link href="/admissions#insurance" className="btn btn-lg btn-outline-white">
                Verify Insurance
              </Link>
            </div>
          </div>
          <div className={d.heroMedia}>
            <Image src={loc.image} alt={loc.name} width={800} height={560} priority className={d.heroImg} sizes="(max-width: 900px) 90vw, 44vw" />
          </div>
        </div>
      </section>

      {/* Care levels */}
      <section className="section-tight">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">Programs offered</span>
            <h2>Levels of care at {loc.name}</h2>
          </div>
          <div className={d.careRow}>
            {care.map((c) =>
              careToSlug[c] ? (
                <Link key={c} href={`/treatment/${careToSlug[c]}`} className={d.careChip}>
                  <Icon name="check" size={16} />
                  {c}
                </Link>
              ) : (
                <span key={c} className={`${d.careChip} ${d.careStatic}`}>
                  <Icon name="check" size={16} />
                  {c}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* Amenities */}
      {detail?.amenities?.length ? (
        <section className="section-tight bg-soft">
          <div className="container">
            <div className="section-head center">
              <span className="eyebrow">Amenities</span>
              <h2>Comfort designed for recovery</h2>
            </div>
            <div className={d.amenities}>
              {detail.amenities.map((a) => (
                <div key={a} className={d.amenity}>
                  <Icon name="check" size={18} />
                  <span>{a}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Team */}
      {detail?.team?.length ? (
        <section className="section-tight">
          <div className="container">
            <div className="section-head center">
              <span className="eyebrow">On-site team</span>
              <h2>The people caring for you here</h2>
            </div>
            <div className={d.team}>
              {detail.team.map((t) => {
                const [name, role] = t.split("—").map((x) => x.trim());
                return (
                  <div key={t} className={d.teamCard}>
                    <div className={d.teamIcon}><Icon name="user" size={20} /></div>
                    <div>
                      <strong>{name}</strong>
                      {role && <span>{role}</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      {/* Contact form */}
      <section className="section bg-soft">
        <div className="container" style={{ maxWidth: "760px" }}>
          <div className="section-head center">
            <span className="eyebrow">Get started</span>
            <h2>Reach {loc.name}</h2>
            <p>Fill out the form and our admissions team will reach out — confidentially, with no obligation.</p>
          </div>
          <div className="mt-4">
            <LeadForm />
          </div>
        </div>
      </section>
    </>
  );
}
