import Link from "next/link";
import Image from "next/image";
import Icon from "./Icon";
import { site } from "@/lib/site";
import styles from "./Footer.module.css";

const columns = [
  {
    title: "Get Help",
    links: [
      { label: "Admissions", href: "/admissions" },
      { label: "Get Into Treatment", href: "/admissions/help-for-yourself" },
      { label: "Help for a Loved One", href: "/admissions/help-for-loved-one" },
      { label: "Verify Your Insurance", href: "/admissions/insurance-verification" },
      { label: "Admissions Hotline", href: site.phoneHref },
    ],
  },
  {
    title: "Treatment",
    links: [
      { label: "Levels of Care", href: "/treatment#levels" },
      { label: "What We Treat", href: "/treatment#treat" },
      { label: "Therapy Modalities", href: "/treatment#modalities" },
      { label: "Dual Diagnosis", href: "/treatment#levels" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Meet the Team", href: "/about/meet-the-team" },
      { label: "Our Locations", href: "/locations" },
      { label: "Blog & Resources", href: "/blog" },
      { label: "FAQs", href: "/about/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export default function Footer() {
  // F-11 — was hardcoded to 2026. This is a server component rendered at build
  // time, so there is no hydration mismatch to avoid; a redeploy keeps it current.
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      {/* CTA band */}
      <div className={styles.ctaBand}>
        <div className={`container ${styles.ctaInner}`}>
          <div>
            <h2 className={styles.ctaTitle}>Let healing begin today</h2>
            <p className={styles.ctaText}>
              A caring admissions specialist is ready to talk — confidentially,
              with no obligation. Your next chapter can start right now.
            </p>
          </div>
          <div className="btn-group">
            <a href={site.phoneHref} className="btn btn-white btn-lg">
              <Icon name="phone" size={19} />
              Call {site.phone}
            </a>
            <Link href="/admissions/insurance-verification" className="btn btn-outline-white btn-lg">
              Verify Insurance
            </Link>
          </div>
        </div>
      </div>

      <div className={`container ${styles.main}`}>
        <div className={styles.brandCol}>
          {/* CR-05 — client asked for the horizontal lockup here. It also spells
              out "HEALTH GROUP" beside the wordmark, which serves CR-01. */}
          <Image
            src="/images/logo-white-horizontal.png"
            alt={site.name}
            width={900}
            height={247}
            className={styles.logo}
          />
          <p className={styles.blurb}>
            A nationwide network of luxury, accredited addiction and mental
            health treatment centers delivering personalized, evidence-based care.
          </p>
          <div className={styles.social}>
            <a href={site.social.facebook} aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <Icon name="facebook" size={20} />
            </a>
            <a href={site.social.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <Icon name="instagram" size={20} />
            </a>
            <a href={site.social.linkedin} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <Icon name="linkedin" size={20} />
            </a>
          </div>
        </div>

        <div className={styles.linkCols}>
          {columns.map((col) => (
            <div key={col.title} className={styles.linkCol}>
              <h3 className={styles.colTitle}>{col.title}</h3>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className={styles.linkCol}>
            <h3 className={styles.colTitle}>Contact</h3>
            <ul className={styles.contact}>
              <li>
                <Icon name="phone" size={17} />
                <a href={site.phoneHref}>{site.phone}</a>
              </li>
              <li>
                <Icon name="mail" size={17} />
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <Icon name="pin" size={17} />
                <span>
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={`container ${styles.bottomInner}`}>
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <nav className={styles.legal} aria-label="Legal">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/editorial-policy">Editorial Policy</Link>
            <Link href="/sms-terms">SMS Terms &amp; Conditions</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
        <div className={`container ${styles.disclaimer}`}>
          <p>
            If you or someone you know is experiencing a medical emergency, call
            911 immediately. For 24/7 free and confidential support, contact the
            SAMHSA National Helpline at 1-800-662-4357.
          </p>
        </div>
      </div>
    </footer>
  );
}
