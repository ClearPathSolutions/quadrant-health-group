import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { site, seo } from "@/lib/site";
import c from "../content.module.css";

const TITLE = "Editorial Policy";
const DESCRIPTION =
  "How Quadrant Health Group researches, writes, reviews, and updates the clinical information published on this site.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  ...seo({ path: "/editorial-policy", title: TITLE, description: DESCRIPTION }),
};

export default function EditorialPolicyPage() {
  return (
    <>
      <PageHero
        crumb="Editorial Policy"
        eyebrow="Legal"
        title="Editorial Policy"
        subtitle="How we research, write, review, and maintain the information published on this site."
      />

      <section className="section">
        <div className="container">
          <div className={c.prose}>
            <p>
              <em>Last reviewed: {new Date().getFullYear()}.</em> This policy
              describes our editorial process. It is not medical advice, and it
              does not replace a conversation with a qualified clinician.
            </p>

            <h2>Why we publish</h2>
            <p>
              People researching addiction and mental health treatment are often
              making an urgent decision for themselves or someone they love. Our
              goal is to make that decision easier to understand — what each
              level of care involves, what treatment actually looks like, and
              what to expect from the admissions process.
            </p>

            <h2>How our content is created</h2>
            <ul>
              <li>
                Articles and treatment pages are drafted by writers experienced
                in behavioral health, working from established clinical sources.
              </li>
              <li>
                Clinical claims — symptoms, withdrawal timelines, levels of care,
                risks — are checked against recognised authorities such as
                SAMHSA, the National Institute on Drug Abuse, and current
                clinical practice guidance.
              </li>
              <li>
                Content describing our own programs is reviewed by the clinical
                and operational staff responsible for delivering them.
              </li>
              <li>
                Staff biographies are published from information supplied by the
                individual or by Quadrant Health Group directly.
              </li>
            </ul>

            <h2>Review and accuracy</h2>
            <p>
              Clinical content is reviewed periodically and updated when
              guidance, programs, or facilities change. Where a page describes a
              specific service, we aim to keep it consistent with what the
              relevant facility actually offers at the time of publication.
            </p>
            <p>
              We do not publish content that guarantees a treatment outcome.
              Recovery varies from person to person, and no program can promise
              a specific result.
            </p>

            <h2>Corrections</h2>
            <p>
              If you find something on this site that is inaccurate, out of date,
              or unclear — including anything published about a named member of
              our staff — tell us and we will review it. Write to{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a> or call{" "}
              <a href={site.phoneHref}>{site.phone}</a>. Substantive corrections
              are made to the page itself rather than noted elsewhere.
            </p>

            <h2>Advertising and independence</h2>
            <p>
              This site is published by Quadrant Health Group and describes our
              own network of treatment centers. We do not sell advertising space,
              and we do not accept payment from third parties in exchange for
              coverage or placement in our content.
            </p>

            <h2>Medical disclaimer</h2>
            <p>
              The information on this site is for general educational purposes.
              It is not a substitute for diagnosis or treatment by a licensed
              professional. If you or someone you know is experiencing a medical
              emergency, call 911. For free, confidential support 24/7, contact
              the SAMHSA National Helpline at 1-800-662-4357.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
