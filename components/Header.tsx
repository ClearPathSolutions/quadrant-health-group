"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Icon from "./Icon";
import { nav, site } from "@/lib/site";
import styles from "./Header.module.css";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const pathname = usePathname();

  // Sticky style once the page scrolls a little.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile drawer on route change.
  useEffect(() => {
    setOpen(false);
    setExpanded(null);
  }, [pathname]);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.split("#")[0]);

  return (
    <>
      {/* Utility bar */}
      <div className={styles.topbar}>
        <div className={`container ${styles.topbarInner}`}>
          <span className={styles.topNote}>
            <Icon name="shield-check" size={16} />
            Confidential help, available 24/7
          </span>
          <div className={styles.topLinks}>
            <a href={`mailto:${site.email}`} className={styles.topLink}>
              <Icon name="mail" size={15} />
              <span>{site.email}</span>
            </a>
            <a href={site.phoneHref} className={styles.topLink}>
              <Icon name="phone" size={15} />
              <span>{site.phone}</span>
            </a>
          </div>
        </div>
      </div>

      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        <div className={`container-wide container ${styles.bar}`}>
          <Link href="/" className={styles.logo} aria-label={site.name}>
            <Image
              src="/images/logo.png"
              alt={site.name}
              width={443}
              height={147}
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className={styles.desktopNav} aria-label="Primary">
            {nav.map((item) =>
              item.children ? (
                <div key={item.label} className={styles.navItem}>
                  <Link
                    href={item.href}
                    className={`${styles.navLink} ${
                      isActive(item.href) ? styles.navActive : ""
                    }`}
                  >
                    {item.label}
                    <Icon name="chevron-down" size={16} className={styles.caret} />
                  </Link>
                  <div className={styles.dropdown} role="menu">
                    <div className={styles.dropInner}>
                      {item.children.map((c) => (
                        <Link key={c.label} href={c.href} className={styles.dropLink}>
                          <span className={styles.dropTitle}>{c.label}</span>
                          {c.desc && (
                            <span className={styles.dropDesc}>{c.desc}</span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`${styles.navLink} ${
                    isActive(item.href) ? styles.navActive : ""
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className={styles.actions}>
            <a href={site.phoneHref} className={`${styles.callBtn}`}>
              <Icon name="phone" size={18} />
              <span className={styles.callText}>{site.phone}</span>
            </a>
            <Link href="/admissions#insurance" className={`btn ${styles.verifyBtn}`}>
              Verify Insurance
            </Link>
            <button
              className={styles.hamburger}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <Icon name={open ? "close" : "menu"} size={26} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`${styles.overlay} ${open ? styles.overlayOpen : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />
      <aside
        className={`${styles.drawer} ${open ? styles.drawerOpen : ""}`}
        aria-hidden={!open}
      >
        <div className={styles.drawerHead}>
          <Image src="/images/logo.png" alt={site.name} width={200} height={66} />
          <button
            className={styles.drawerClose}
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            <Icon name="close" size={24} />
          </button>
        </div>

        <nav className={styles.drawerNav} aria-label="Mobile">
          {nav.map((item) =>
            item.children ? (
              <div key={item.label} className={styles.mItem}>
                <div className={styles.mRow}>
                  <Link href={item.href} className={styles.mLink}>
                    {item.label}
                  </Link>
                  <button
                    className={styles.mToggle}
                    aria-label={`Toggle ${item.label} submenu`}
                    aria-expanded={expanded === item.label}
                    onClick={() =>
                      setExpanded((e) => (e === item.label ? null : item.label))
                    }
                  >
                    <Icon
                      name="chevron-down"
                      size={20}
                      className={`${styles.mCaret} ${
                        expanded === item.label ? styles.mCaretOpen : ""
                      }`}
                    />
                  </button>
                </div>
                <div
                  className={`${styles.mSub} ${
                    expanded === item.label ? styles.mSubOpen : ""
                  }`}
                >
                  <div className={styles.mSubInner}>
                    {item.children.map((c) => (
                      <Link key={c.label} href={c.href} className={styles.mSubLink}>
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link key={item.label} href={item.href} className={styles.mLink}>
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className={styles.drawerFoot}>
          <a href={site.phoneHref} className="btn btn-lg btn-block">
            <Icon name="phone" size={18} />
            Call {site.phone}
          </a>
          <Link href="/admissions#insurance" className="btn btn-ghost btn-block">
            Verify Your Insurance
          </Link>
          <p className={styles.drawerNote}>100% confidential · No obligation</p>
        </div>
      </aside>
    </>
  );
}
