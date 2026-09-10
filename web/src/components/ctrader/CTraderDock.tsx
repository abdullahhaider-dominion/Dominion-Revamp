"use client";

import { useState } from "react";
import { CTRADER_DOWNLOADS } from "@/content/ctrader";

export function CTraderDock() {
  const [more, setMore] = useState(false);
  const always = CTRADER_DOWNLOADS.filter((item) => item.dock === "always");
  const extra = CTRADER_DOWNLOADS.filter((item) => item.dock === "more");

  return (
    <div className="ctrader-dock" id="download">
      <p className="ctrader-dock__label">Download</p>
      <div className="ctrader-dock__row">
        {always.map((item) => (
          <a
            key={item.id}
            className={`ctrader-chip${item.primary ? " ctrader-chip--primary" : ""}`}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.label}
          </a>
        ))}
        {extra.map((item) => (
          <a
            key={item.id}
            className={`ctrader-chip ctrader-chip--desktop${item.primary ? " ctrader-chip--primary" : ""}`}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.label}
          </a>
        ))}
        <button
          type="button"
          className="ctrader-chip ctrader-chip--more"
          aria-expanded={more}
          aria-controls="ctrader-dock-more"
          onClick={() => setMore((open) => !open)}
        >
          {more ? "Less" : "More"}
        </button>
      </div>
      <div
        id="ctrader-dock-more"
        className={`ctrader-dock__more${more ? " is-open" : ""}`}
        hidden={!more}
      >
        {extra.map((item) => (
          <a
            key={item.id}
            className="ctrader-chip"
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}
