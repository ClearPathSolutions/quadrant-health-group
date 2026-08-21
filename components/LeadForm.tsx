"use client";

import { useState } from "react";
import Icon from "./Icon";
import { site } from "@/lib/site";
import { leadAttribution } from "@/lib/attribution";
import styles from "./LeadForm.module.css";

export default function LeadForm({
  variant = "card",
  formName = "website_lead",
}: {
  variant?: "card" | "plain";
  /** Sent to Clarion as `form_key`, so leads stay separable by surface. */
  formName?: string;
}) {
  const [status, setStatus] = useState<
    "idle" | "sending" | "done" | "undelivered" | "error"
  >("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    // page_url / referrer / utm / gclid / ctm_visitor_sid all come from the
    // first-touch store rather than the live URL. Reading them here would give
    // the form's own page and an empty campaign for anyone who browsed before
    // converting — which is almost everyone.
    const payload = {
      form_key: formName,
      name: String(fd.get("name") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      who: String(fd.get("who") || ""),
      message: String(fd.get("message") || "").trim(),
      company: String(fd.get("company") || ""), // honeypot
      ...leadAttribution(),
    };

    setStatus("sending");
    try {
      // Trailing slash is deliberate: `trailingSlash: true` (T1.1) 308-redirects
      // the slashless form, which would put an extra round-trip in front of
      // every lead submission.
      const res = await fetch("/api/lead/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      // F-02 — `delivered: false` means the lead reached us but Clarion
      // rejected it, so nothing was captured. Showing the thank-you state there
      // would tell someone asking for help that admissions had been contacted
      // when it had not. Route them to the 24/7 line instead.
      if (res.ok && json.ok) {
        setStatus(json.delivered === false ? "undelivered" : "done");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "undelivered") {
    return (
      <div
        className={`${styles.form} ${variant === "card" ? styles.asCard : ""} ${styles.success}`}
        role="alert"
      >
        <div className={styles.successIcon}>
          <Icon name="phone" size={34} />
        </div>
        <h3>Please call us — we couldn&apos;t send that through.</h3>
        <p>
          Something went wrong on our end and your message didn&apos;t reach our
          admissions team. Please call us directly so we can help you right now
          — we&apos;re here 24/7, and the call is free and confidential.
        </p>
        <a href={site.phoneHref} className="btn btn-lg mt-2">
          <Icon name="phone" size={18} />
          Call {site.phone}
        </a>
      </div>
    );
  }

  if (status === "done") {
    return (
      <div
        className={`${styles.form} ${variant === "card" ? styles.asCard : ""} ${styles.success}`}
      >
        <div className={styles.successIcon}>
          <Icon name="check" size={34} />
        </div>
        <h3>Thank you — we&apos;ve got it.</h3>
        <p>
          A member of our admissions team will reach out shortly. If you&apos;d
          like to talk right now, we&apos;re here 24/7.
        </p>
        <a href={site.phoneHref} className="btn btn-lg mt-2">
          <Icon name="phone" size={18} />
          Call {site.phone}
        </a>
      </div>
    );
  }

  return (
    <form
      className={`${styles.form} ${variant === "card" ? styles.asCard : ""}`}
      onSubmit={onSubmit}
      noValidate
    >
      <label className={styles.field}>
        <span>Name</span>
        <input name="name" type="text" required autoComplete="name" placeholder="Jane Doe" />
      </label>
      <div className={styles.row}>
        <label className={styles.field}>
          <span>Phone</span>
          <input name="phone" type="tel" required autoComplete="tel" placeholder="(555) 123-4567" />
        </label>
        <label className={styles.field}>
          <span>Email</span>
          <input name="email" type="email" required autoComplete="email" placeholder="jane@email.com" />
        </label>
      </div>
      <label className={styles.field}>
        <span>Who needs help?</span>
        <select name="who" defaultValue="">
          <option value="" disabled>
            Select one…
          </option>
          <option>Myself</option>
          <option>My spouse or partner</option>
          <option>My child</option>
          <option>A parent or family member</option>
          <option>A friend</option>
          <option>I&apos;m a professional / referral</option>
        </select>
      </label>
      <label className={styles.field}>
        <span>
          How can we help? <em>(optional)</em>
        </span>
        <textarea
          name="message"
          rows={3}
          placeholder="Tell us a little about your situation…"
        />
      </label>

      {/* Honeypot — hidden from humans, catches bots */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className={styles.honeypot}
      />

      {status === "error" && (
        <p className={styles.errorMsg} role="alert">
          <Icon name="phone" size={15} />
          Something went wrong sending your message. Please call us directly at{" "}
          <a href={site.phoneHref}>{site.phone}</a> — we&apos;re here 24/7.
        </p>
      )}

      <button
        type="submit"
        className="btn btn-lg btn-block"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending…" : "Send — Get Confidential Help"}
        {status !== "sending" && <Icon name="arrow-right" size={18} />}
      </button>
      <p className={styles.disclaimer}>
        <Icon name="shield-check" size={15} />
        100% confidential · No commitment · We never share your information.
      </p>
    </form>
  );
}
