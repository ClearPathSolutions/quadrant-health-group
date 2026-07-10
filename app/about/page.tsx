import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Icon from "@/components/Icon";
import Faq from "@/components/Faq";
import { site, stats, whyPoints } from "@/lib/site";
import c from "../content.module.css";
import s from "../home.module.css";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Quadrant Health Group blends clinical excellence with compassionate support across a nationwide network of luxury, accredited addiction and mental health treatment centers.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumb="About"
        eyebrow="About Quadrant Health"
        title="Compassionate care, backed by clinical excellence"
        subtitle="We exist to give people struggling with addiction and mental health the tools, environment, and guidance to reclaim their lives — with dignity, and on their own terms."
      />

      {/* Our story */}
      <section className="section" id="story">
        <div className={`container ${c.split} ${c.splitWide}`}>
          <div className={`${c.mediaCard} reveal`}>
            <Image
              src="/images/photos/facility-interior.jpg"
              alt="Inside a Quadrant Health treatment center"
              width={900}
              height={675}
              sizes="(max-width: 900px) 90vw, 46vw"
            />
          </div>
          <div className="reveal">
            <span className="eyebrow">Our story</span>
            <h2>A network built around the people we serve</h2>
            <p className="lead mt-2">
              At Quadrant Health Group, your recovery comes first.
            </p>
            <p className="mt-2">
              We provide access to a nationwide network of luxury addiction
              treatment centers delivering personalized, evidence-based care. Our
              accredited facilities specialize in substance abuse and mental
              health recovery, offering proven therapies, expert clinical teams,
              and fully equipped environments that help you reclaim your life.
            </p>
            <p className="mt-2">
              Whether you need detox, residential treatment, or long-term
              support, our centers are here to give you the tools and guidance
              you need to achieve lasting sobriety — all close to home.
            </p>
            <Link href="/locations" className="btn mt-4">
              Explore our locations
              <Icon name="arrow-right" size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="section-tight bg-soft">
        <div className="container">
          <div className="grid grid-3">
            {stats.map((st) => (
              <div key={st.label} className={`${s.statCard} reveal`} style={{ boxShadow: "var(--sh-md)" }}>
                <span className={s.statValue}>{st.value}</span>
                <span className={s.statLabel}>{st.label}</span>
                <p className={s.statText}>{st.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="section" id="approach">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">Our approach</span>
            <h2>What makes Quadrant different</h2>
            <p>
              We blend clinical excellence with compassionate support to guide
              you through every step of the treatment journey.
            </p>
          </div>
          <div className="grid grid-4 mt-4">
            {whyPoints.map((w) => (
              <div key={w.title} className={`card card-hover ${c.feature} reveal`}>
                <div className={c.featureIcon}>
                  <Icon name={w.icon as any} size={26} />
                </div>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link href="/about/meet-the-team" className="btn">
              Meet our team
              <Icon name="arrow-right" size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Alumni */}
      <section className="section bg-navy" id="alumni">
        <div className={`container ${c.split} ${c.splitWide}`}>
          <div className="reveal">
            <span className="eyebrow">Alumni</span>
            <h2>Recovery is a journey — and a community</h2>
            <p className="mt-2" style={{ color: "rgba(255,255,255,0.82)", fontSize: "1.08rem" }}>
              Treatment is the beginning, not the end. Our alumni community keeps
              you connected long after you leave — with ongoing support, events,
              and people who understand exactly what you&apos;ve been through.
            </p>
            <ul className={s.trust} style={{ borderTop: "1px solid rgba(255,255,255,0.14)" }}>
              <li><Icon name="users" size={18} /> Lifelong peer support</li>
              <li><Icon name="heart" size={18} /> Aftercare &amp; check-ins</li>
              <li><Icon name="calendar" size={18} /> Alumni events</li>
            </ul>
            <a href={site.phoneHref} className="btn btn-white mt-4">
              <Icon name="phone" size={18} />
              Connect with us
            </a>
          </div>
          <div className={`${c.mediaCard} reveal`}>
            <Image
              src="/images/photos/support.jpg"
              alt="Quadrant Health alumni community support"
              width={900}
              height={675}
              sizes="(max-width: 900px) 90vw, 46vw"
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">FAQ</span>
            <h2>Frequently asked questions</h2>
            <p>
              Answers to the questions we hear most. Don&apos;t see yours?
              Call us any time at {site.phone}.
            </p>
          </div>
          <div className="mt-4" style={{ maxWidth: "820px", marginInline: "auto" }}>
            <Faq />
          </div>
        </div>
      </section>
    </>
  );
}
