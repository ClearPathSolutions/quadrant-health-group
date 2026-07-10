import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import c from "../content.module.css";

export const metadata: Metadata = {
  title: "SMS Terms & Conditions",
  description:
    "Terms and conditions for SMS/text-message communications with Quadrant Health Group.",
};

export default function SmsTermsPage() {
  return (
    <>
      <PageHero
        crumb="SMS Terms & Conditions"
        eyebrow="Legal"
        title="SMS Terms & Conditions"
        subtitle="These terms describe how text-message communications work when you opt in to messages from Quadrant Health Group."
      />
      <section className="section">
        <div className="container">
          <div className={c.prose}>
            <p>
              <em>Last updated: January 2026.</em> This is a summary for the
              rebuilt site. Replace it with your organization&apos;s full,
              legally reviewed SMS policy before launch.
            </p>

            <h2>Program description</h2>
            <p>
              By providing your mobile number and opting in, you agree to receive
              recurring informational and admissions-related text messages from
              Quadrant Health Group. Message frequency varies.
            </p>

            <h2>Cost</h2>
            <p>Message and data rates may apply, depending on your carrier plan.</p>

            <h2>Opt-out</h2>
            <p>
              You can cancel at any time by replying <strong>STOP</strong> to any
              message. For help, reply <strong>HELP</strong> or contact us at{" "}
              <a href={site.phoneHref}>{site.phone}</a>.
            </p>

            <h2>Privacy</h2>
            <p>
              Mobile information is never shared or sold to third parties for
              marketing purposes. See our{" "}
              <a href="/privacy-policy">Privacy Policy</a> for details.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
