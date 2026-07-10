import Link from "next/link";
import Image from "next/image";
import Icon from "./Icon";
import type { Location } from "@/lib/site";
import styles from "./LocationCard.module.css";

export default function LocationCard({ loc }: { loc: Location }) {
  return (
    <article className={`card card-hover ${styles.card}`}>
      <div className={styles.media}>
        <Image
          src={loc.image}
          alt={`${loc.name} — ${loc.city}, ${loc.state}`}
          width={400}
          height={280}
          className={styles.img}
          sizes="(max-width: 620px) 100vw, (max-width: 960px) 50vw, 33vw"
        />
        {/* Name overlay only for photos that don't have it baked into the card */}
        {!loc.hasCard && (
          <div className={styles.caption}>
            <span>{loc.name}</span>
          </div>
        )}
        {loc.comingSoon && <span className={styles.soon}>Coming Soon</span>}
      </div>
      <div className={styles.body}>
        <p className={styles.place}>
          <Icon name="pin" size={16} />
          {loc.city}, {loc.state}
        </p>
        <p className={styles.blurb}>{loc.blurb}</p>
        <div className={styles.tags}>
          {loc.care.map((c) => (
            <span key={c} className="tag">
              {c}
            </span>
          ))}
        </div>
        <Link
          href={loc.comingSoon ? "/contact" : `/locations/${loc.slug}`}
          className={`link-arrow ${styles.link}`}
        >
          {loc.comingSoon ? "Get notified" : "Learn more"}
          <Icon name="arrow-right" size={18} />
        </Link>
      </div>
    </article>
  );
}
