import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { site, seo } from "@/lib/site";
import c from "../content.module.css";

/**
 * HIPAA Notice of Privacy Practices (NPP).
 *
 * Added 2026-10-27 after LegitScript asked for a policy covering protected
 * health information, medical records and patient rights (Terms §V(e),
 * Certification Standard 10). /privacy-policy covers website data; this page
 * covers PHI. Structure follows the HHS model notice:
 * https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/model-notices-privacy-practices/index.html
 *
 * Counsel should confirm: Privacy Officer designation, and the relationship
 * between this network-level notice and each facility's own notice (the
 * "Our network" section below states that each facility provides its own).
 */

const EFFECTIVE_DATE = "October 27, 2026";
const DESCRIPTION =
  "How Quadrant Health Group may use and disclose your protected health information, and your rights regarding your medical records under HIPAA.";

export const metadata: Metadata = {
  title: "Notice of Privacy Practices",
  description: DESCRIPTION,
  ...seo({
    path: "/notice-of-privacy-practices",
    title: "Notice of Privacy Practices",
    description: DESCRIPTION,
  }),
};

export default function NoticeOfPrivacyPracticesPage() {
  return (
    <>
      <PageHero
        crumb="Notice of Privacy Practices"
        eyebrow="Legal"
        title="Notice of Privacy Practices"
        subtitle="This notice describes how medical information about you may be used and disclosed and how you can get access to this information. Please review it carefully."
      />
      <section className="section">
        <div className="container">
          <div className={c.prose}>
            <p>
              <em>Effective date: {EFFECTIVE_DATE}.</em>
            </p>
            <p>
              {site.name} (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is
              required by law to maintain the privacy and security of your protected
              health information (&ldquo;PHI&rdquo;), to give you this notice of our legal
              duties and privacy practices, and to follow the terms of the notice currently
              in effect. For how we handle information collected through this website, see
              our <Link href="/privacy-policy">Privacy Policy</Link>.
            </p>

            <h2>Our network</h2>
            <p>
              Quadrant Health Group coordinates admissions, insurance verification, and
              care across a network of licensed treatment centers. This notice applies to
              the health information we receive or create while handling your inquiry,
              verifying your benefits, or coordinating your placement. Each treatment
              center in our network is a separate licensed provider and will give you its
              own Notice of Privacy Practices at admission, which governs the records of
              your care at that facility.
            </p>

            <h2>Your rights</h2>
            <p>When it comes to your health information, you have certain rights.</p>
            <ul>
              <li>
                <strong>Get a copy of your medical record.</strong> You can ask to see or
                get an electronic or paper copy of your medical record and other health
                information we have about you. We will provide a copy or a summary, usually
                within 30 days of your request. We may charge a reasonable, cost-based fee.
              </li>
              <li>
                <strong>Ask us to correct your medical record.</strong> You can ask us to
                correct health information about you that you think is incorrect or
                incomplete. We may say &ldquo;no&rdquo; to your request, but we will tell
                you why in writing within 60 days.
              </li>
              <li>
                <strong>Request confidential communications.</strong> You can ask us to
                contact you in a specific way (for example, home or office phone) or to
                send mail to a different address. We will say &ldquo;yes&rdquo; to all
                reasonable requests.
              </li>
              <li>
                <strong>Ask us to limit what we use or share.</strong> You can ask us not
                to use or share certain health information for treatment, payment, or our
                operations. We are not required to agree, and we may say &ldquo;no&rdquo;
                if it would affect your care. If you pay for a service or item out of
                pocket in full, you can ask us not to share that information for the
                purpose of payment or our operations with your health insurer. We will say
                &ldquo;yes&rdquo; unless a law requires us to share it.
              </li>
              <li>
                <strong>Get a list of those with whom we have shared information.</strong>{" "}
                You can ask for an accounting of the times we have shared your health
                information for six years prior to the date you ask, who we shared it
                with, and why. We will include all disclosures except those about
                treatment, payment, and health care operations, and certain other
                disclosures (such as any you asked us to make). We will provide one
                accounting a year for free but will charge a reasonable, cost-based fee if
                you ask for another within 12 months.
              </li>
              <li>
                <strong>Get a copy of this privacy notice.</strong> You can ask for a paper
                copy of this notice at any time, even if you have agreed to receive it
                electronically.
              </li>
              <li>
                <strong>Choose someone to act for you.</strong> If you have given someone
                medical power of attorney or if someone is your legal guardian, that person
                can exercise your rights and make choices about your health information. We
                will confirm the person has this authority before we take any action.
              </li>
              <li>
                <strong>File a complaint if you feel your rights are violated.</strong> You
                can complain to us using the contact information at the bottom of this
                page. You can also file a complaint with the U.S. Department of Health and
                Human Services Office for Civil Rights by sending a letter to 200
                Independence Avenue, S.W., Washington, D.C. 20201, calling 1-800-368-1019,
                or visiting{" "}
                <a
                  href="https://www.hhs.gov/ocr/privacy/hipaa/complaints/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.hhs.gov/ocr/privacy/hipaa/complaints/
                </a>
                . <strong>We will not retaliate against you for filing a complaint.</strong>
              </li>
            </ul>

            <h2>Your choices</h2>
            <p>
              For certain health information, you can tell us your choices about what we
              share. If you have a clear preference for how we share your information in
              the situations described below, talk to us. Tell us what you want us to do,
              and we will follow your instructions.
            </p>
            <p>In these cases, you have both the right and choice to tell us to:</p>
            <ul>
              <li>
                Share information with your family, close friends, or others involved in
                your care.
              </li>
              <li>Share information in a disaster relief situation.</li>
            </ul>
            <p>
              If you are not able to tell us your preference, for example if you are
              unconscious, we may go ahead and share your information if we believe it is
              in your best interest. We may also share your information when needed to
              lessen a serious and imminent threat to health or safety.
            </p>
            <p>
              In these cases, we never share your information unless you give us written
              permission:
            </p>
            <ul>
              <li>Marketing purposes.</li>
              <li>Sale of your information.</li>
              <li>Most sharing of psychotherapy notes.</li>
            </ul>
            <p>
              We do not use your health information for fundraising. If that ever changes,
              we will tell you and you will be able to opt out.
            </p>

            <h2>Substance use disorder treatment records</h2>
            <p>
              Records that identify you as seeking or receiving substance use disorder
              treatment from a program in our network are also protected by the federal
              confidentiality regulations at 42 C.F.R. Part 2. In general, such
              information may not be disclosed to anyone outside the program unless you
              consent in writing, the disclosure is allowed by a court order, or the
              disclosure is made to medical personnel in a medical emergency, to qualified
              personnel for research, audit, or program evaluation, or as otherwise
              permitted by Part 2. Violation of these federal regulations is a crime, and
              suspected violations may be reported to the appropriate authorities. Federal
              law and regulations do not protect any information about a crime committed
              by a patient at the program or against any person who works for the program,
              or about any threat to commit such a crime, and do not protect information
              about suspected child abuse or neglect from being reported under state law.
            </p>

            <h2>Our uses and disclosures</h2>
            <p>We typically use or share your health information in the following ways.</p>
            <ul>
              <li>
                <strong>Treat you.</strong> We can use your health information and share
                it with other professionals who are treating you. <em>Example:</em> we
                share your intake information with the treatment center you are admitted
                to so its clinical team can plan your care.
              </li>
              <li>
                <strong>Run our organization.</strong> We can use and share your health
                information to run our organization, improve your care, and contact you
                when necessary. <em>Example:</em> we use health information about you to
                coordinate your admission and services.
              </li>
              <li>
                <strong>Bill for your services.</strong> We can use and share your health
                information to bill and get payment from health plans or other entities.{" "}
                <em>Example:</em> we give information about you to your health insurance
                plan so it will pay for your services.
              </li>
            </ul>
            <p>
              We are also allowed or required to share your information in other ways,
              usually in ways that contribute to the public good, such as public health and
              research. We have to meet many conditions in the law before we can share your
              information for these purposes. Where 42 C.F.R. Part 2 applies, we will only
              make these disclosures as that regulation permits.
            </p>
            <ul>
              <li>
                <strong>Help with public health and safety issues.</strong> Preventing
                disease, helping with product recalls, reporting adverse reactions to
                medications, reporting suspected abuse, neglect, or domestic violence, and
                preventing or reducing a serious threat to anyone&rsquo;s health or safety.
              </li>
              <li>
                <strong>Do research.</strong> We can use or share your information for
                health research, subject to the conditions required by law.
              </li>
              <li>
                <strong>Comply with the law.</strong> We will share information about you
                if state or federal laws require it, including with the Department of
                Health and Human Services if it wants to see that we are complying with
                federal privacy law.
              </li>
              <li>
                <strong>Respond to organ and tissue donation requests</strong> and{" "}
                <strong>work with a medical examiner or funeral director</strong> when
                required.
              </li>
              <li>
                <strong>
                  Address workers&rsquo; compensation, law enforcement, and other
                  government requests.
                </strong>{" "}
                For workers&rsquo; compensation claims, for law enforcement purposes or
                with a law enforcement official, with health oversight agencies for
                activities authorized by law, and for special government functions such as
                military, national security, and presidential protective services.
              </li>
              <li>
                <strong>Respond to lawsuits and legal actions.</strong> In response to a
                court or administrative order, or in response to a subpoena, as permitted
                by law.
              </li>
            </ul>

            <h2>Our responsibilities</h2>
            <ul>
              <li>
                We are required by law to maintain the privacy and security of your
                protected health information.
              </li>
              <li>
                We will let you know promptly if a breach occurs that may have compromised
                the privacy or security of your information.
              </li>
              <li>
                We must follow the duties and privacy practices described in this notice
                and give you a copy of it.
              </li>
              <li>
                We will not use or share your information other than as described here
                unless you tell us we can in writing. If you tell us we can, you may change
                your mind at any time. Let us know in writing if you change your mind.
              </li>
            </ul>
            <p>
              For more information, see{" "}
              <a
                href="https://www.hhs.gov/hipaa/for-individuals/notice-privacy-practices/index.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.hhs.gov/hipaa/for-individuals/notice-privacy-practices
              </a>
              .
            </p>

            <h2>State law</h2>
            <p>
              The laws of the state in which you receive care may give you additional
              protections for your medical information and may further restrict how
              information about mental health and substance use disorder treatment is used
              or disclosed. Where state law is stricter than federal law, we follow the
              stricter requirement.
            </p>

            <h2>Changes to the terms of this notice</h2>
            <p>
              We can change the terms of this notice, and the changes will apply to all
              information we have about you. The new notice will be available upon request
              and on our website.
            </p>

            <h2>Contact our Privacy Officer</h2>
            <p>
              To exercise any of the rights above, to ask questions about this notice, or
              to file a complaint, contact our Privacy Officer:
            </p>
            <p suppressHydrationWarning>
              {site.name}
              <br />
              Attn: Privacy Officer
              <br />
              {site.address.line1}, {site.address.line2}
              <br />
              <a href={site.phoneHref}>{site.phone}</a> ·{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
