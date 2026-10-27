import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { seo } from "@/lib/site";
import c from "../content.module.css";

export const metadata: Metadata = {
  title: "SMS Terms & Conditions",
  description:
    "Terms and conditions for SMS/text-message communications with Quadrant Health Group.",
  ...seo({
    path: "/sms-terms",
    title: "SMS Terms & Conditions",
    description:
      "Terms and conditions for SMS/text-message communications with Quadrant Health Group.",
  }),
};

export default function SmsTermsPage() {
  return (
    <>
      <PageHero
        crumb="SMS Terms & Conditions"
        eyebrow="Legal"
        title="SMS Terms & Conditions"
      />
      <section className="section">
        <div className="container">
          <div className={c.prose}>
            <p>These terms describe how text-message communications work when you opt in to messages from Quadrant Health Group.</p>
            <p><em>Last updated: October 27, 2026.</em></p>

            <h2>Program description</h2>
            <p>By providing your mobile number and opting in, you agree to receive recurring informational and admissions-related text messages from Quadrant Health Group. Message frequency varies.</p>
            <h2>Consent is not a condition of treatment</h2>
            <p>Consent to receive SMS communications is not a condition of purchasing or receiving treatment or services.</p>

            <h2>Cost</h2>
            <p>Message and data rates may apply, depending on your carrier plan.</p>

            <h2>Opt-out</h2>
            <p>You can cancel at any time by replying STOP to any message. For help, reply HELP or contact us at <a href="tel:+18889706234" suppressHydrationWarning>(888) 970-6234</a>.</p>
            <h2>Carriers</h2>
            <p>Carriers are not liable for delayed or undelivered messages.</p>

            <h2>Privacy</h2>
            <p>Mobile information is never shared or sold to third parties for marketing purposes. See our <a href="/privacy-policy/">Privacy Policy</a> for details.</p>
            <h2>If this is an emergency</h2>
            <p>Text messages are not monitored around the clock and are not for emergencies. If you are in crisis, call or text 988. In a medical emergency, call 911.</p>
          </div>
        </div>
      </section>
    </>
  );
}
