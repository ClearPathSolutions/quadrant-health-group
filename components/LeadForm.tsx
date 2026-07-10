"use client";

import { useState } from "react";
import Icon from "./Icon";
import { site } from "@/lib/site";
import styles from "./LeadForm.module.css";

export default function LeadForm({
  variant = "card",
}: {
  variant?: "card" | "plain";
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    // Front-end demo: in production, POST to /api/lead or a form provider.
    setTimeout(() => setStatus("done"), 700);
  }

  if (status === "done") {
    return (
      <div className={`${styles.form} ${variant === "card" ? styles.asCard : ""} ${styles.success}`}>
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

      <button type="submit" className="btn btn-lg btn-block" disabled={status === "sending"}>
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
