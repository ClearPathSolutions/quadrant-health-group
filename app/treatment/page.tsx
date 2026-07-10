import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Icon, { type IconName } from "@/components/Icon";
import { treatmentsByCategory } from "@/lib/content";
import { site } from "@/lib/site";
import c from "../content.module.css";
import s from "../home.module.css";

export const metadata: Metadata = {
  title: "Treatment Programs",
  description:
    "A full continuum of addiction and mental health treatment — medical detox, residential inpatient, PHP, IOP, virtual IOP and dual diagnosis — plus evidence-based and holistic therapy modalities.",
};

const iconFor: Record<string, IconName> = {
  detox: "shield",
  "residential-inpatient": "home",
  "partial-hospitalization": "sun",
  "intensive-outpatient": "calendar",
  "virtual-intensive-outpatient": "monitor",
  "dual-diagnosis": "heart",
  "individual-therapy": "user",
  "group-therapy": "users",
  "family-therapy": "heart",
  "equine-therapy": "leaf",
};

function excerpt(intro: string, n = 155) {
  const clean = intro.replace(/\n+/g, " ").trim();
  return clean.length > n ? clean.slice(0, n).replace(/\s+\S*$/, "") + "…" : clean;
}

export default function TreatmentPage() {
  const levels = treatmentsByCategory("level");
  const addictions = treatmentsByCategory("addiction");
  const modalities = treatmentsByCategory("modality");

  return (
    <>
      <PageHero
        crumb="Treatment"
        eyebrow="Comprehensive care"
        title="Evidence-based treatment for lasting recovery"
        subtitle="From medical detox to outpatient support, Quadrant Health delivers a full continuum of care with personalized plans and seamless transitions between every level — so you get the right support at the right time."
      />

      {/* Levels of care */}
      <section className="section" id="levels">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">Levels of care</span>
            <h2>We offer all levels of care</h2>
            <p>Our integrated approach ensures you receive the right level of support at every stage of recovery.</p>
          </div>
          <div className="grid grid-3 mt-4">
            {levels.map((lv) => (
              <Link key={lv.slug} href={`/treatment/${lv.slug}`} className={`card card-hover ${s.levelCard} reveal`}>
                <div className={s.levelIcon}>
                  <Icon name={iconFor[lv.slug] || "shield"} size={26} />
                </div>
                <h3 className={s.levelTitle}>{lv.title}</h3>
                <p>{excerpt(lv.intro)}</p>
                <span className="link-arrow mt-2">Learn more <Icon name="arrow-right" size={16} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* What we treat */}
      <section className="section bg-soft" id="treat">
        <div className={`container ${c.split} ${c.splitWide}`}>
          <div className="reveal">
            <span className="eyebrow">What we treat</span>
            <h2>Care for a wide range of substances &amp; conditions</h2>
            <p className="lead mt-2">
              Our clinical teams specialize in treating substance dependencies alongside co-occurring mental health conditions through proven, individualized care. Explore any of the programs below.
            </p>
            <div className={`${s.chips} mt-3`}>
              {addictions.map((a) => (
                <Link key={a.slug} href={`/treatment/${a.slug}`} className={s.treatChip}>
                  <Icon name="check" size={16} />
                  {a.title.replace(/ (Addiction )?Treatment.*$/i, "").replace(/ Addiction$/i, "")}
                </Link>
              ))}
            </div>
          </div>
          <div className={`${c.mediaCard} reveal`}>
            <Image src="/images/photos/therapy.jpg" alt="A supportive therapy session" width={900} height={675} sizes="(max-width: 900px) 90vw, 44vw" />
          </div>
        </div>
      </section>

      {/* Modalities */}
      <section className="section" id="modalities">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">Therapy modalities</span>
            <h2>Evidence-based &amp; holistic therapies</h2>
            <p>We combine proven clinical approaches with holistic, experiential care to treat the whole person.</p>
          </div>
          <div className="grid grid-4 mt-4">
            {modalities.map((m) => (
              <Link key={m.slug} href={`/treatment/${m.slug}`} className={`card card-hover ${c.feature} reveal`}>
                <div className={c.featureIcon}>
                  <Icon name={iconFor[m.slug] || "heart"} size={26} />
                </div>
                <h3>{m.title.replace(/ (for Addiction Recovery| for .*)$/i, "")}</h3>
                <p>{excerpt(m.intro, 110)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-tight">
        <div className="container">
          <div className={c.ctaMini}>
            <div>
              <h3>Ready to find the right program?</h3>
              <p>Speak with our admissions team to build a personalized treatment plan — free, confidential, and no obligation.</p>
            </div>
            <div className="btn-group">
              <a href={site.phoneHref} className="btn btn-lg"><Icon name="phone" size={18} />Call {site.phone}</a>
              <Link href="/admissions#insurance" className="btn btn-ghost btn-lg">Verify Insurance</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
