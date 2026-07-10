import type { Metadata } from "next";
import Icon from "@/components/Icon";
import PageHero from "@/components/PageHero";
import LeadForm from "@/components/LeadForm";
import { site } from "@/lib/site";
import c from "../content.module.css";
import s from "../home.module.css";

export const metadata: Metadata = {
  title: "Admissions",
  description:
    "Starting treatment at Quadrant Health is simple and confidential. Verify your insurance for free, understand the admissions process, and get help for yourself or a loved one — 24/7.",
};

const steps = [
  {
    n: 1,
    title: "Reach out",
    text: "Call us or complete the form. A caring admissions specialist answers your questions — confidentially, 24/7.",
  },
  {
    n: 2,
    title: "Confidential assessment",
    text: "We complete a brief, private assessment to understand your needs and recommend the right level of care.",
  },
  {
    n: 3,
    title: "Verify benefits",
    text: "We verify your insurance for free and walk you through exactly what your plan covers — no surprises.",
  },
  {
    n: 4,
    title: "Begin treatment",
    text: "We coordinate travel and intake so you can start your recovery at the right center, often the same day.",
  },
];

const audiences = [
  {
    id: "self",
    icon: "user",
    title: "Get help for yourself",
    text: "Taking the first step takes courage. We make it simple — one confidential call and we'll handle the rest, meeting you exactly where you are with zero judgment.",
    points: ["A single, confidential point of contact", "Free insurance verification", "Same-day admissions when needed"],
  },
  {
    id: "loved-one",
    icon: "heart",
    title: "Get help for a loved one",
    text: "Watching someone you love struggle is painful. Our team helps you understand the options, plan a conversation, and guide them toward the care they need.",
    points: ["Guidance on how to approach the conversation", "Family support and education", "Help coordinating an intervention if needed"],
  },
];

export default function AdmissionsPage() {
  return (
    <>
      <PageHero
        crumb="Admissions"
        eyebrow="Admissions"
        title="Getting help is simpler than you think"
        subtitle="One confidential conversation is all it takes to begin. Our admissions team is available 24/7 to answer questions, verify your benefits, and guide you or your loved one toward the right care."
      />

      {/* Audiences */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2">
            {audiences.map((a) => (
              <div
                key={a.id}
                id={a.id}
                className={`card ${c.feature} reveal`}
                style={{ scrollMarginTop: "110px" }}
              >
                <div className={c.featureIcon}>
                  <Icon name={a.icon as any} size={26} />
                </div>
                <h3 style={{ fontSize: "1.4rem" }}>{a.title}</h3>
                <p className="mt-1">{a.text}</p>
                <ul className={s.checks} style={{ gridTemplateColumns: "1fr", marginTop: "1.25rem" }}>
                  {a.points.map((p) => (
                    <li key={p}>
                      <Icon name="check" size={18} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section bg-soft" id="process">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">Admissions process</span>
            <h2>Four simple steps to recovery</h2>
            <p>
              We&apos;ve made starting treatment as seamless and stress-free as
              possible, so you can focus on what matters — getting well.
            </p>
          </div>
          <div className={`${c.steps} mt-4`} style={{ marginTop: "3.5rem" }}>
            {steps.map((step) => (
              <div key={step.n} className={`${c.step} reveal`}>
                <span className={c.stepNum}>{step.n}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance + form */}
      <section className="section" id="insurance" style={{ scrollMarginTop: "90px" }}>
        <div className={`container ${s.formGrid}`}>
          <div className={s.formCopy}>
            <span className="eyebrow">Verify your insurance</span>
            <h2>We accept most major insurance plans</h2>
            <p className="lead mt-2">
              Verifying your benefits is fast, free, and completely confidential —
              and it won&apos;t affect your coverage. Let us help you understand
              what your plan covers so you can take the next step with confidence.
            </p>
            <ul className={s.formPoints}>
              <li>
                <Icon name="shield-check" size={20} />
                <div>
                  <strong>Free &amp; confidential</strong>
                  <span>No cost, no obligation, no impact on your coverage.</span>
                </div>
              </li>
              <li>
                <Icon name="clock" size={20} />
                <div>
                  <strong>Fast answers</strong>
                  <span>We&apos;ll review your benefits and get back to you quickly.</span>
                </div>
              </li>
              <li>
                <Icon name="badge" size={20} />
                <div>
                  <strong>In-network options</strong>
                  <span>We work with most major insurance providers nationwide.</span>
                </div>
              </li>
            </ul>
            <a href={site.phoneHref} className={s.bigPhone}>
              <Icon name="phone" size={22} />
              {site.phone}
            </a>
          </div>
          <div className={s.formSide}>
            <LeadForm />
          </div>
        </div>
      </section>
    </>
  );
}
