"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const QUOTES = [
  {
    name: "Clive",
    text: "Went through something unfamiliar and decided to open a support ticket. Issue was resolved on the same day. Stellar support by the support team.",
  },
  {
    name: "Amira",
    text: "I joined to test my discipline under published rules. Copy trading was allowed, the drawdown limit was honest, and support treated it like a real trading account — not a gimmick.",
  },
  {
    name: "Marcus",
    text: "Ranking against other traders changed how I sized risk. I stayed inside the 2.5% drawdown, hit the weekly trade minimum, and the board did the rest.",
  },
] as const;

export function LbTestimonials() {
  const [index, setIndex] = useState(0);
  const quote = QUOTES[index];

  const go = (dir: -1 | 1) => {
    setIndex((current) => (current + dir + QUOTES.length) % QUOTES.length);
  };

  return (
    <section className="lb-quotes" aria-labelledby="lb-quotes-title">
      <div className="lb-wrap">
        <h2 id="lb-quotes-title">What our Clients says about us</h2>
        <figure className="lb-quote">
          <Quote className="lb-quote__mark" size={28} strokeWidth={1.75} aria-hidden="true" />
          <blockquote>
            <p>{quote.text}</p>
          </blockquote>
          <figcaption>— {quote.name}</figcaption>
          <button
            type="button"
            className="lb-quote__nav lb-quote__nav--prev"
            aria-label="Previous testimonial"
            onClick={() => go(-1)}
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="lb-quote__nav lb-quote__nav--next"
            aria-label="Next testimonial"
            onClick={() => go(1)}
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </figure>
        <div className="lb-quote__dots" role="tablist" aria-label="Testimonials">
          {QUOTES.map((item, i) => (
            <button
              key={item.name}
              type="button"
              role="tab"
              className={i === index ? "is-active" : undefined}
              aria-label={`Show quote from ${item.name}`}
              aria-selected={i === index}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
