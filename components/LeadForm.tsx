"use client";

import { useState } from "react";
import Icon from "./Icon";
import { site } from "@/lib/site";
import styles from "./LeadForm.module.css";

export default function LeadForm({
  variant = "card",
  formName = "website_lead",
}: {
  variant?: "card" | "plain";
  /** Label reported to Clarion Form Capture (data-clarion-form). */
  formName?: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle"
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const firstName = String(fd.get("firstName") || "").trim();
    const lastName = String(fd.get("lastName") || "").trim();
    const payload = {
      name: `${firstName} ${lastName}`.trim(),
      phone: String(fd.get("phone") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      who: String(fd.get("who") || ""),
      message: String(fd.get("message") || "").trim(),
      company: String(fd.get("company") || ""), // honeypot
      page_url: typeof window !== "undefined" ? window.location.href : "",
      referrer: typeof document !== "undefined" ? document.referrer : "",
    };

    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      setStatus(res.ok && json.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
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
      data-clarion-form={formName}
      noValidate
    >
      <div className={styles.row}>
        <label className={styles.field}>
          <span>First name</span>
          <input name="firstName" type="text" required autoComplete="given-name" placeholder="Jane" />
        </label>
        <label className={styles.field}>
          <span>Last name</span>
          <input name="lastName" type="text" required autoComplete="family-name" placeholder="Doe" />
        </label>
      </div>
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
