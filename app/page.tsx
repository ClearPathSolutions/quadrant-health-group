import Link from "next/link";
import Image from "next/image";
import Icon from "@/components/Icon";
import LocationCard from "@/components/LocationCard";
import LeadForm from "@/components/LeadForm";
import { site, stats, levels, locations, addictions, whyPoints } from "@/lib/site";
import s from "./home.module.css";

const featuredLocations = locations.filter((l) => !l.comingSoon).slice(0, 6);

export default function HomePage() {
  return (
    <>
      {/* ================= HERO ================= */}
      <section className={s.hero}>
        <div className={s.heroBlob1} />
        <div className={s.heroBlob2} />
        <div className={`container ${s.heroInner}`}>
          <div className={s.heroCopy}>
            <span className="eyebrow">Trusted nationwide recovery network</span>
            <h1 className={s.heroTitle}>
              We are <span className={s.grad}>Quadrant Health</span>
            </h1>
            <p className={s.heroSub}>{site.tagline}</p>
            <p className={s.heroLead}>
              Our substance abuse and mental health programs give you the tools
              and guidance to achieve lasting, meaningful recovery — in luxury,
              accredited facilities close to home.
            </p>
            <div className="btn-group">
              <a href={site.phoneHref} className="btn btn-lg btn-white">
                <Icon name="phone" size={19} />
                Call {site.phone}
              </a>
              <Link href="/admissions#insurance" className="btn btn-lg btn-outline-white">
                Verify Your Insurance
              </Link>
            </div>
            <ul className={s.trust}>
              <li>
                <Icon name="shield-check" size={18} />
                Accredited facilities
              </li>
              <li>
                <Icon name="badge" size={18} />
                In-network with major insurers
              </li>
              <li>
                <Icon name="clock" size={18} />
                24/7 confidential admissions
              </li>
            </ul>
          </div>

          <div className={s.heroMedia}>
            <div className={s.heroImgWrap}>
              <Image
                src="/images/photos/hero-aerial.jpg"
                alt="Aerial view of a Quadrant Health luxury treatment facility"
                width={1024}
                height={576}
                priority
                className={s.heroImg}
                sizes="(max-width: 980px) 90vw, 46vw"
              />
            </div>
            <div className={s.floatCard}>
              <div className={s.floatIcon}>
                <Icon name="heart" size={22} />
              </div>
              <div>
                <strong className={s.floatNum}>10,000+</strong>
                <span className={s.floatLabel}>Lives changed &amp; families reunited</span>
              </div>
            </div>
            <div className={s.floatRating}>
              <div className={s.stars} aria-label="5 out of 5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Icon key={i} name="star" size={16} />
                ))}
              </div>
              <span>Compassionate, life-changing care</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className={s.statsWrap}>
        <div className="container">
          <div className={s.stats}>
            {stats.map((st) => (
              <div key={st.label} className={`${s.statCard} reveal`}>
                <span className={s.statValue}>{st.value}</span>
                <span className={s.statLabel}>{st.label}</span>
                <p className={s.statText}>{st.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHO WE ARE ================= */}
      <section className="section">
        <div className={`container ${s.split}`}>
          <div className={`${s.splitMedia} reveal`}>
            <Image
              src="/images/photos/facility-lounge.jpg"
              alt="Interior of a Quadrant Health treatment center"
              width={900}
              height={640}
              className={s.roundImg}
              sizes="(max-width: 900px) 90vw, 44vw"
            />
            <div className={s.expBadge}>
              <strong>10+</strong>
              <span>Years of<br />experience</span>
            </div>
          </div>
          <div className={`${s.splitCopy} reveal`}>
            <span className="eyebrow">Who we are</span>
            <h2>Luxury addiction treatment centers that put you first</h2>
            <p className="lead mt-2">
              At Quadrant Health Group, we provide access to a nationwide network
              of luxury addiction treatment centers delivering personalized,
              evidence-based care.
            </p>
            <p className="mt-2">
              Our accredited facilities specialize in substance abuse and mental
              health recovery, offering proven therapies, expert clinical teams,
              and fully equipped environments that help you reclaim your life.
              Whether you need detox, residential treatment, or long-term
              support, our centers give you the tools and guidance to achieve
              lasting sobriety — all close to home.
            </p>
            <ul className={s.checks}>
              {[
                "Evidence-based & holistic therapies",
                "Expert, licensed clinical teams",
                "Personalized care plans for every client",
                "Dual diagnosis & mental health support",
              ].map((c) => (
                <li key={c}>
                  <Icon name="check" size={18} />
                  {c}
                </li>
              ))}
            </ul>
            <Link href="/about" className="btn mt-4">
              About Quadrant Health
              <Icon name="arrow-right" size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= LOCATIONS ================= */}
      <section className="section bg-soft">
        <div className="container">
          <div className={s.headRow}>
            <div className="section-head">
              <span className="eyebrow">Our locations</span>
              <h2>Nationwide access to trusted addiction treatment</h2>
              <p>
                Quadrant Health operates a network of accredited treatment
                centers across the United States — each offering high-quality
                care in a safe, supportive environment, wherever you are on your
                recovery journey.
              </p>
            </div>
            <Link href="/locations" className="btn btn-ghost">
              See all locations
              <Icon name="arrow-right" size={18} />
            </Link>
          </div>
          <div className="grid grid-3 mt-4">
            {featuredLocations.map((loc) => (
              <div key={loc.slug} className="reveal">
                <LocationCard loc={loc} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= LEVELS OF CARE ================= */}
      <section className="section" id="levels">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">Comprehensive care</span>
            <h2>We offer all levels of care</h2>
            <p>
              A full continuum of support — from medical detox and inpatient
              rehab to dual diagnosis and outpatient programs — with seamless
              transitions between every stage of your recovery.
            </p>
          </div>
          <div className="grid grid-3 mt-4">
            {levels.map((lv) => (
              <div key={lv.slug} className={`card card-hover ${s.levelCard} reveal`}>
                <div className={s.levelIcon}>
                  <Icon name={lv.icon as any} size={26} />
                </div>
                <h3 className={s.levelTitle}>
                  {lv.title}
                  {lv.abbr && <span className={s.levelAbbr}>{lv.abbr}</span>}
                </h3>
                <p>{lv.text}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link href="/treatment" className="btn">
              Explore our programs
              <Icon name="arrow-right" size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= WHAT WE TREAT ================= */}
      <section className="section bg-soft" id="treat">
        <div className={`container ${s.treatGrid}`}>
          <div className={`${s.treatCopy} reveal`}>
            <span className="eyebrow">What we treat</span>
            <h2>Specialized care for substance use &amp; mental health</h2>
            <p className="lead mt-2">
              Our clinical teams treat a wide range of substance dependencies —
              alongside co-occurring mental health conditions — with proven,
              compassionate, individualized care.
            </p>
            <Link href="/treatment#treat" className="btn mt-4">
              See everything we treat
              <Icon name="arrow-right" size={18} />
            </Link>
          </div>
          <div className={`${s.chips} reveal`}>
            {addictions.map((a) => (
              <span key={a} className={s.treatChip}>
                <Icon name="check" size={16} />
                {a}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ================= INSURANCE BAND ================= */}
      <section className={s.insurance}>
        <div className={s.insBlob} />
        <div className={`container ${s.insInner}`}>
          <div className={s.insCopy}>
            <span className={s.insEyebrow}>We accept most major insurance plans</span>
            <h2 className={s.insTitle}>Verify your insurance in minutes</h2>
            <p className={s.insText}>
              We work with most major insurance providers to make treatment
              affordable and accessible. Verifying your benefits is fast, free,
              and completely confidential — and it won&apos;t affect your
              coverage.
            </p>
            <div className="btn-group mt-3">
              <Link href="/admissions#insurance" className="btn btn-lg btn-white">
                Verify Your Insurance
              </Link>
              <a href={site.phoneHref} className="btn btn-lg btn-outline-white">
                <Icon name="phone" size={18} />
                Call {site.phone}
              </a>
            </div>
          </div>
          <div className={s.insImageWrap}>
            <Image
              src="/images/photos/insurance.png"
              alt="Verify your insurance benefits"
              width={600}
              height={400}
              className={s.insImage}
              sizes="(max-width: 900px) 80vw, 40vw"
            />
          </div>
        </div>
      </section>

      {/* ================= WHY QUADRANT ================= */}
      <section className="section bg-navy">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">Why Quadrant Health</span>
            <h2>Your recovery comes first — always</h2>
            <p style={{ color: "rgba(255,255,255,0.8)" }}>
              We blend clinical excellence with compassionate support to guide
              you through every step. More than detox, you&apos;ll find a path to
              lasting transformation — on your terms.
            </p>
          </div>
          <div className="grid grid-4 mt-4">
            {whyPoints.map((w) => (
              <div key={w.title} className={`${s.whyCard} reveal`}>
                <div className={s.whyIcon}>
                  <Icon name={w.icon as any} size={24} />
                </div>
                <h3 className={s.whyTitle}>{w.title}</h3>
                <p className={s.whyText}>{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= GET STARTED FORM ================= */}
      <section className="section" id="get-started">
        <div className={`container ${s.formGrid}`}>
          <div className={s.formCopy}>
            <span className="eyebrow">Get started</span>
            <h2>Take the first step toward healing</h2>
            <p className="lead mt-2">
              Fill out the form and a team member from our admissions department
              will reach out to you shortly. 100% confidential, no commitment.
            </p>
            <ul className={s.formPoints}>
              <li>
                <Icon name="clock" size={20} />
                <div>
                  <strong>Available 24/7</strong>
                  <span>Speak with a caring specialist any time, day or night.</span>
                </div>
              </li>
              <li>
                <Icon name="shield-check" size={20} />
                <div>
                  <strong>Completely confidential</strong>
                  <span>Your privacy is protected at every step.</span>
                </div>
              </li>
              <li>
                <Icon name="badge" size={20} />
                <div>
                  <strong>Insurance accepted</strong>
                  <span>We&apos;ll verify your benefits for free.</span>
                </div>
              </li>
            </ul>
            <a href={site.phoneHref} className={s.bigPhone}>
              <Icon name="phone" size={22} />
              {site.phone}
            </a>
          </div>
          <div className={s.formSide}>
            <LeadForm formName="homepage_lead" />
          </div>
        </div>
      </section>
    </>
  );
}
