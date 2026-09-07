"use client";

import { useState } from "react";
import {
  ChevronRight,
  KeyRound,
  MessageCircle,
  Presentation,
} from "lucide-react";

const INCLUDED_ITEMS = [
  {
    icon: KeyRound,
    title: "Digital Magic Keys",
    summary: "Automated trading tools",
    body: (
      <>
        Unlock access to a revolutionary trading tool — the Digital Magic Keys
        — trusted by 42,000 satisfied customers for its ability to enhance
        trader immediacy and precision after hitting just $80 in commissions.
      </>
    ),
    note: "Note: Clients must meet a minimum of $80 in commissions.",
    tone: "green",
  },
  {
    icon: Presentation,
    title: "Educational Seminars",
    summary: "Live from experienced traders",
    body: (
      <>
        Master the Art of Price Action and Candle Reading with Rajabanks.
        Understand market movements and practical strategies to improve your
        trading decisions.
      </>
    ),
    note: "Learn practical techniques directly from experienced market professionals.",
    tone: "navy",
  },
  {
    icon: MessageCircle,
    title: "Discord Community",
    summary: "Connect with fellow traders",
    body: (
      <>
        Unlock entry to the Dominion Markets Discord community, a vibrant hub
        of 40,000 members. You&apos;ll gain access to real-time market updates,
        trends, and the opportunity to engage with forex experts.
      </>
    ),
    note: "Connect, learn and exchange ideas with the wider trading community.",
    tone: "blue",
  },
] as const;

export function CommissionIncluded() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = INCLUDED_ITEMS[activeIndex];

  function selectFromKeyboard(index: number) {
    setActiveIndex(index);
    requestAnimationFrame(() => {
      document.getElementById(`ci-included-tab-${index}`)?.focus();
    });
  }

  return (
    <div className="ci-included__grid">
      <article
        className="ci-included__feature"
        id="ci-included-panel"
        role="tabpanel"
        aria-labelledby={`ci-included-tab-${activeIndex}`}
        key={activeItem.title}
      >
        <span className="ci-rule" aria-hidden="true" />
        <div>
          <h3>{activeItem.title}</h3>
          <p>{activeItem.body}</p>
          <span>{activeItem.note}</span>
        </div>
      </article>

      <div
        className="ci-included__list"
        role="tablist"
        aria-label="Commission incentive benefits"
      >
        {INCLUDED_ITEMS.map(({ icon: Icon, title, summary, tone }, index) => {
          const selected = activeIndex === index;

          return (
            <button
              className={`ci-included-card${selected ? " is-active" : ""}`}
              id={`ci-included-tab-${index}`}
              key={title}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls="ci-included-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(event) => {
                if (event.key === "ArrowDown" || event.key === "ArrowRight") {
                  event.preventDefault();
                  selectFromKeyboard((index + 1) % INCLUDED_ITEMS.length);
                } else if (
                  event.key === "ArrowUp" ||
                  event.key === "ArrowLeft"
                ) {
                  event.preventDefault();
                  selectFromKeyboard(
                    (index - 1 + INCLUDED_ITEMS.length) %
                      INCLUDED_ITEMS.length,
                  );
                } else if (event.key === "Home") {
                  event.preventDefault();
                  selectFromKeyboard(0);
                } else if (event.key === "End") {
                  event.preventDefault();
                  selectFromKeyboard(INCLUDED_ITEMS.length - 1);
                }
              }}
            >
              <span className={`ci-round-icon ci-round-icon--${tone}`}>
                <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <span className="ci-included-card__copy">
                <strong>{title}</strong>
                <small>{summary}</small>
              </span>
              <ChevronRight size={17} aria-hidden="true" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
