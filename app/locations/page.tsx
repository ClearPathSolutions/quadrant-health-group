import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import LocationCard from "@/components/LocationCard";
import Icon from "@/components/Icon";
import { locations, site } from "@/lib/site";
import c from "../content.module.css";

export const metadata: Metadata = {
  title: "Our Locations",
  description:
    "Find a Quadrant Health treatment center near you. A nationwide network of luxury, accredited addiction and mental health facilities across CA, TX, FL, NJ and IA.",
};

const order = ["California", "Texas", "Florida", "New Jersey", "Iowa"];

export default function LocationsPage() {
  const byRegion = order
    .map((region) => ({
      region,
      items: locations.filter((l) => l.region === region),
    }))
    .filter((g) => g.items.length);

  return (
    <>
      <PageHero
        crumb="Locations"
        eyebrow="Our locations"
        title="Find a Quadrant Health treatment center near you"
        subtitle="With addiction recovery centers across the country, we're here wherever you need us. Our nationwide network of fully equipped, luxury facilities offers proven treatment, compassionate care, and a dedicated admissions team to make your path to recovery as seamless and stress-free as possible."
      />

      <section className="section">
        <div className="container">
          {byRegion.map((group) => (
            <div key={group.region}>
              <div className={c.region}>
                <span className={c.regionName}>{group.region}</span>
                <span className={c.regionCount}>
                  {group.items.length}{" "}
                  {group.items.length === 1 ? "center" : "centers"}
                </span>
                <span className={c.regionLine} />
              </div>
              <div className="grid grid-3">
                {group.items.map((loc) => (
                  <div key={loc.slug} className="reveal">
                    <LocationCard loc={loc} />
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className={`${c.ctaMini} mt-4`} style={{ marginTop: "3.5rem" }}>
            <div>
              <h3>Not sure which location is right for you?</h3>
              <p>
                Our admissions team will help you find the center and level of
                care that best fits your needs — confidentially and with no
                obligation.
              </p>
            </div>
            <div className="btn-group">
              <a href={site.phoneHref} className="btn btn-lg">
                <Icon name="phone" size={18} />
                Call {site.phone}
              </a>
              <Link href="/contact" className="btn btn-ghost btn-lg">
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
