import Link from "next/link";
import Icon from "./Icon";
import styles from "./PageHero.module.css";

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  crumb,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  crumb: string;
}) {
  return (
    <section className={styles.hero}>
      <div className={styles.blob} />
      <div className={`container ${styles.inner}`}>
        <nav className={styles.crumbs} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <Icon name="chevron-down" size={15} className={styles.sep} />
          <span>{crumb}</span>
        </nav>
        <span className="eyebrow">{eyebrow}</span>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
    </section>
  );
}
