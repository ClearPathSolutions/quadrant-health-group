import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { site, seo } from "@/lib/site";
import c from "../content.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Quadrant Health Group collects, uses, and protects your personal information.",
  ...seo({
    path: "/privacy-policy",
    title: "Privacy Policy",
    description:
      "How Quadrant Health Group collects, uses, and protects your personal information.",
  }),
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        crumb="Privacy Policy"
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="Your privacy matters to us. This policy explains how we handle the information you share with Quadrant Health Group."
      />
      <section className="section">
        <div className="container">
          <div className={c.prose}>
            <p>
              <em>Last updated: January 2026.</em>
            </p>

            <h2>Information we collect</h2>
            <p>
              When you contact us or submit a form, we may collect your name,
              phone number, email address, insurance details, and any information
              you choose to share about your situation. We also collect standard
              analytics data such as pages visited and general device
              information.
            </p>

            <h2>How we use your information</h2>
            <ul>
              <li>To respond to your inquiries and provide admissions support.</li>
              <li>To verify insurance benefits at your request.</li>
              <li>To coordinate care across our network of treatment centers.</li>
              <li>To improve our website and services.</li>
            </ul>

            <h2>How we protect it</h2>
            <p>
              We treat all health-related information as strictly confidential and
              apply administrative, technical, and physical safeguards designed to
              protect it. We never sell your personal information.
            </p>

            <h2>Protected health information</h2>
            <p>
              Health information we receive or create while coordinating your admission
              or verifying your benefits is protected health information under the Health
              Insurance Portability and Accountability Act (HIPAA) and, for substance use
              disorder treatment records, 42 C.F.R. Part 2. How we may use and disclose
              that information, and your rights to access, amend, and restrict your
              records, are described in our{" "}
              <Link href="/notice-of-privacy-practices">Notice of Privacy Practices</Link>.
            </p>

            <h2>Your choices</h2>
            <p>
              You may request access to, correction of, or deletion of your
              personal information at any time by contacting us at{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a> or{" "}
              <a href={site.phoneHref} suppressHydrationWarning>{site.phone}</a>.
            </p>

            <h2>Contact</h2>
            <p suppressHydrationWarning>
              Quadrant Health Group
              <br />
              {site.address.line1}, {site.address.line2}
              <br />
              {site.phone} · {site.email}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
