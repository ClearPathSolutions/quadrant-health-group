import Link from "next/link";
import Icon from "@/components/Icon";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="section" style={{ textAlign: "center", paddingBlock: "clamp(5rem, 12vw, 9rem)" }}>
      <div className="container" style={{ maxWidth: "640px" }}>
        <span className="eyebrow" style={{ justifyContent: "center", display: "inline-flex" }}>
          Page not found
        </span>
        <h1 style={{ marginTop: "1rem", fontSize: "clamp(3rem, 10vw, 6rem)" }}>404</h1>
        <p className="lead mt-2">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s
          get you back on the path to recovery.
        </p>
        <div className="btn-group" style={{ justifyContent: "center", marginTop: "2rem" }}>
          <Link href="/" className="btn btn-lg">
            <Icon name="home" size={18} />
            Back to home
          </Link>
          <a href={site.phoneHref} className="btn btn-ghost btn-lg">
            <Icon name="phone" size={18} />
            Call {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
