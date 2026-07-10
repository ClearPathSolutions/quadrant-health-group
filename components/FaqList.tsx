"use client";

import { useState } from "react";
import Icon from "./Icon";
import styles from "./Faq.module.css";

export default function FaqList({
  items,
  defaultOpen = 0,
}: {
  items: { q: string; a: string }[];
  defaultOpen?: number | null;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  if (!items?.length) return null;
  return (
    <div className={styles.list}>
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}>
            <button className={styles.q} aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : i)}>
              <span>{f.q}</span>
              <Icon name="chevron-down" size={22} className={`${styles.icon} ${isOpen ? styles.iconOpen : ""}`} />
            </button>
            <div className={`${styles.aWrap} ${isOpen ? styles.aOpen : ""}`}>
              <div className={styles.aInner}>
                <p>{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
