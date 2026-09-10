"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { FAQ_TOPICS, type FaqItem } from "@/content/faqs";

type VisibleItem = FaqItem & { topicId: string; topicLabel: string };

export function FaqsExplorer() {
  const searchId = useId();
  const [topicId, setTopicId] = useState(FAQ_TOPICS[0].id);
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(
    FAQ_TOPICS[0].items[0]?.id ?? null,
  );

  const needle = query.trim().toLowerCase();
  const searching = needle.length > 0;

  const visible = useMemo<VisibleItem[]>(() => {
    const matches = (item: FaqItem) => {
      if (!searching) {
        return true;
      }
      const haystack = `${item.question} ${item.answer.join(" ")}`.toLowerCase();
      return haystack.includes(needle);
    };

    if (searching) {
      return FAQ_TOPICS.flatMap((topic) =>
        topic.items
          .filter(matches)
          .map((item) => ({
            ...item,
            topicId: topic.id,
            topicLabel: topic.label,
          })),
      );
    }

    const topic = FAQ_TOPICS.find((entry) => entry.id === topicId) ?? FAQ_TOPICS[0];
    return topic.items.map((item) => ({
      ...item,
      topicId: topic.id,
      topicLabel: topic.label,
    }));
  }, [needle, searching, topicId]);

  useEffect(() => {
    if (visible.length === 0) {
      setOpenId(null);
      return;
    }
    if (!visible.some((item) => item.id === openId)) {
      setOpenId(visible[0].id);
    }
  }, [openId, visible]);

  const stageTitle = searching
    ? visible.length === 1
      ? "1 matching question"
      : `${visible.length} matching questions`
    : (FAQ_TOPICS.find((topic) => topic.id === topicId)?.label ?? "FAQs");

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <div className="faqs-explorer">
      <div className="faqs-index">
        <label className="faqs-search" htmlFor={searchId}>
          <Search size={18} strokeWidth={2} aria-hidden="true" />
          <span className="faqs-search__label">Search questions</span>
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search questions"
            autoComplete="off"
          />
        </label>

        <nav className="faqs-topics" aria-label="FAQ topics">
          {FAQ_TOPICS.map((topic) => {
            const selected = !searching && topic.id === topicId;
            return (
              <button
                key={topic.id}
                type="button"
                className={selected ? "is-active" : undefined}
                aria-current={selected ? "true" : undefined}
                onClick={() => {
                  setQuery("");
                  setTopicId(topic.id);
                  setOpenId(topic.items[0]?.id ?? null);
                }}
              >
                {topic.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="faqs-stage faqs-glass">
        <div className="faqs-stage__head">
          <p className="faqs-eyebrow">{searching ? "Search" : "Topic"}</p>
          <h2>{stageTitle}</h2>
        </div>

        {visible.length === 0 ? (
          <p className="faqs-empty">No questions match that search.</p>
        ) : (
          <div className="faqs-list">
            {visible.map((item) => {
              const open = item.id === openId;
              const panelId = `faq-panel-${item.id}`;
              return (
                <article
                  key={item.id}
                  className={`faqs-item${open ? " is-open" : ""}`}
                >
                  <h3>
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => toggle(item.id)}
                    >
                      <span>
                        {searching ? (
                          <small>{item.topicLabel}</small>
                        ) : null}
                        {item.question}
                      </span>
                      <ChevronDown
                        className="faqs-item__chevron"
                        size={18}
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </button>
                  </h3>
                  <div className="faqs-item__body" id={panelId}>
                    <div>
                      {item.answer.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
