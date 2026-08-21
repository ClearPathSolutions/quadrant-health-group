import Image from "next/image";

/**
 * T8.5 — the accepted-insurer wall.
 *
 * This replaced `/images/photos/insurance.png`, a flat image with carrier marks
 * baked in. Two problems with that: the logos were unreadable to search engines
 * and screen readers, and the carriers it named were wrong. It showed Humana,
 * TRICARE and VA — none of which appear on the client's approved list — while
 * omitting twelve carriers that do. Claiming TRICARE and VA in particular is not
 * a cosmetic error.
 *
 * Source: the client's "Insurance Logos" Notion page. Every file is a
 * transparent PNG at a uniform 384px source height, which is why a single CSS
 * height lines them all up — the note on that page says the same.
 */
const INSURERS = [
  { file: "aetna.png", name: "Aetna" },
  { file: "ambetter.png", name: "Ambetter Health" },
  { file: "cigna.png", name: "Cigna Healthcare" },
  { file: "harvard-pilgrim.png", name: "Harvard Pilgrim Health Care" },
  { file: "health-net.png", name: "Health Net" },
  { file: "highmark.png", name: "Highmark" },
  { file: "horizon-bcbs.png", name: "Horizon Blue Cross Blue Shield" },
  { file: "kaiser-permanente.png", name: "Kaiser Permanente" },
  { file: "oscar.png", name: "Oscar Health" },
  { file: "priority-health.png", name: "Priority Health" },
  { file: "quartz.png", name: "Quartz" },
  { file: "select-health.png", name: "Select Health" },
  { file: "superior-health-plan.png", name: "Superior HealthPlan" },
  { file: "tufts-health-plan.png", name: "Tufts Health Plan" },
  { file: "uhc.png", name: "UnitedHealthcare" },
];

export default function InsurerLogos({ limit }: { limit?: number }) {
  const list = limit ? INSURERS.slice(0, limit) : INSURERS;
  return (
    <ul
      aria-label="Insurance plans we accept"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
        alignItems: "center",
        gap: "clamp(1rem, 2.5vw, 1.75rem)",
        listStyle: "none",
        margin: 0,
        padding: 0,
      }}
    >
      {list.map((i) => (
        <li
          key={i.file}
          style={{ display: "grid", placeItems: "center", minWidth: 0 }}
        >
          <Image
            src={`/images/insurers/${i.file}`}
            alt={i.name}
            width={500}
            height={96}
            sizes="160px"
            style={{ width: "auto", height: 34, maxWidth: "100%", objectFit: "contain" }}
          />
        </li>
      ))}
    </ul>
  );
}
