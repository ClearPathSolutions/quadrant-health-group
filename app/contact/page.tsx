import type { Metadata } from "next";
import Icon from "@/components/Icon";
import PageHero from "@/components/PageHero";
import LeadForm from "@/components/LeadForm";
import { site } from "@/lib/site";
import c from "../content.module.css";
import s from "../home.module.css";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Quadrant Health Group. Our admissions team is available 24/7 — call, email, or send us a message and we'll respond promptly and confidentially.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumb="Contact"
        eyebrow="Contact us"
        title="We're here whenever you're ready"
        subtitle="Have a question or ready to begin? Reach out any time — our compassionate admissions team is available around the clock to help you take the next step."
      />

      <section className="section">
        <div className={`container ${s.formGrid}`} style={{ alignItems: "start" }}>
          <div className={s.formCopy}>
            <span className="eyebrow">Get in touch</span>
            <h2>Talk to a specialist today</h2>
            <p className="lead mt-2">
              Every conversation is 100% confidential. Whether you&apos;re
              seeking help for yourself or someone you love, we&apos;ll guide you
              with care and clarity.
            </p>

            <div className={`${c.infoList} mt-4`}>
              <div className={c.infoItem}>
                <div className={c.infoIcon}>
                  <Icon name="phone" size={22} />
                </div>
                <div>
                  <h3>Call us — 24/7</h3>
                  <a href={site.phoneHref} style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--navy)" }}>
                    {site.phone}
                  </a>
                </div>
              </div>
              <div className={c.infoItem}>
                <div className={c.infoIcon}>
                  <Icon name="mail" size={22} />
                </div>
                <div>
                  <h3>Email</h3>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </div>
              </div>
              <div className={c.infoItem}>
                <div className={c.infoIcon}>
                  <Icon name="pin" size={22} />
                </div>
                <div>
                  <h3>Corporate office</h3>
                  <p>
                    {site.address.line1}
                    <br />
                    {site.address.line2}
                  </p>
                </div>
              </div>
              <div className={c.infoItem}>
                <div className={c.infoIcon}>
                  <Icon name="clock" size={22} />
                </div>
                <div>
                  <h3>Hours</h3>
                  <p>Admissions line open 24 hours a day, 7 days a week.</p>
                </div>
              </div>
            </div>
          </div>

          <div className={s.formSide}>
            <div style={{ marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1.35rem" }}>Send us a message</h3>
              <p className="mt-1">We&apos;ll get back to you promptly and confidentially.</p>
            </div>
            <LeadForm />
          </div>
        </div>
      </section>
    </>
  );
}
