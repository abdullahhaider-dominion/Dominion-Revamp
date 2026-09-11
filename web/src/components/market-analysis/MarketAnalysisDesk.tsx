"use client";

import { useMemo, useState } from "react";
import { MARKET_ANALYSIS_POSTS } from "@/content/market-analysis";

const FILTERS = [
  { id: "all" as const, label: "All" },
  { id: "XAUUSD" as const, label: "XAUUSD" },
  { id: "GBPJPY" as const, label: "GBPJPY" },
];

type FilterId = (typeof FILTERS)[number]["id"];

export function MarketAnalysisDesk() {
  const [filter, setFilter] = useState<FilterId>("all");

  const posts = useMemo(
    () =>
      filter === "all"
        ? MARKET_ANALYSIS_POSTS
        : MARKET_ANALYSIS_POSTS.filter((post) => post.pair === filter),
    [filter],
  );

  return (
    <div className="analysis-desk">
      <div className="analysis-filters" role="tablist" aria-label="Filter by pair">
        {FILTERS.map((item) => {
          const selected = filter === item.id;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={selected}
              className={`analysis-chip${selected ? " is-on" : ""}`}
              onClick={() => setFilter(item.id)}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <p className="analysis-note">
        Analysis only — not financial advice. Notes open on the Dominion
        Markets desk archive.
      </p>

      <ul className="analysis-grid">
        {posts.map((post) => (
          <li key={post.id}>
            <a
              className="analysis-card analysis-glass"
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span
                className={`analysis-pair${post.pair === "XAUUSD" ? " is-gold" : ""}`}
              >
                {post.pair}
              </span>
              <h2>{post.title}</h2>
              <p>
                by {post.author}
                <span aria-hidden="true"> · </span>
                <time>{post.published}</time>
              </p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
