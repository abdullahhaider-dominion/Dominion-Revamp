"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  Clock,
  Search,
} from "lucide-react";
import {
  BLOG_ARTICLES,
  BLOG_ASSET,
  BLOG_FEATURED,
  BLOG_FILTERS,
  BLOG_PAGE_SIZE,
  BLOG_SORTS,
  articleHref,
  type BlogArticle,
} from "@/content/blog";
import { SITE_REGISTER_HREF } from "@/content/site-nav";
import "@/styles/blog.css";

type FilterId = (typeof BLOG_FILTERS)[number]["id"];
type SortId = (typeof BLOG_SORTS)[number]["id"];

function matchesFilter(article: BlogArticle, filter: FilterId) {
  if (filter === "all") return true;
  if (filter === "Platforms") return article.category === "Platforms";
  return article.category === filter;
}

function ArticleMeta({ article }: { article: BlogArticle }) {
  return (
    <div className="blog-meta">
      <span>
        <Clock size={14} strokeWidth={2.2} aria-hidden="true" />
        {article.minutes} min read
      </span>
      <Link className="blog-read" href={articleHref(article.slug)}>
        Read article
        <ArrowRight size={16} strokeWidth={2.4} aria-hidden="true" />
      </Link>
    </div>
  );
}

function FeaturedCard({
  article,
  compact = false,
}: {
  article: BlogArticle;
  compact?: boolean;
}) {
  return (
    <article className={`blog-feature${compact ? " blog-feature--compact" : ""}`}>
      <Link className="blog-feature__media" href={articleHref(article.slug)}>
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          sizes={compact ? "(max-width: 899px) 100vw, 360px" : "(max-width: 899px) 100vw, 720px"}
          priority={!compact}
        />
      </Link>
      <p className="blog-kicker">{article.categoryLabel}</p>
      <h2>
        <Link href={articleHref(article.slug)}>{article.title}</Link>
      </h2>
      {compact ? null : <p className="blog-feature__excerpt">{article.excerpt}</p>}
      <ArticleMeta article={article} />
    </article>
  );
}

function LatestCard({ article }: { article: BlogArticle }) {
  return (
    <article className="blog-card">
      <Link className="blog-card__media" href={articleHref(article.slug)}>
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          sizes="(max-width: 899px) 100vw, 360px"
        />
      </Link>
      <p className="blog-kicker">{article.categoryLabel}</p>
      <h3>
        <Link href={articleHref(article.slug)}>{article.title}</Link>
      </h3>
      <p>{article.excerpt}</p>
      <ArticleMeta article={article} />
    </article>
  );
}

export function BlogPage() {
  const [filter, setFilter] = useState<FilterId>("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortId>("latest");
  const [page, setPage] = useState(1);
  const [subscribed, setSubscribed] = useState(false);

  const featured = BLOG_FEATURED;
  const [lead, ...side] = featured;

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const rows = BLOG_ARTICLES.filter((article) => {
      if (article.featured) return false;
      if (!matchesFilter(article, filter)) return false;
      if (!needle) return true;
      return (
        article.title.toLowerCase().includes(needle) ||
        article.excerpt.toLowerCase().includes(needle) ||
        article.categoryLabel.toLowerCase().includes(needle)
      );
    });
    rows.sort((a, b) => {
      if (sort === "title") return a.title.localeCompare(b.title);
      const diff = a.publishedAt.localeCompare(b.publishedAt);
      return sort === "oldest" ? diff : -diff;
    });
    return rows;
  }, [filter, query, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / BLOG_PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const visible = filtered.slice(
    (currentPage - 1) * BLOG_PAGE_SIZE,
    currentPage * BLOG_PAGE_SIZE,
  );
  const pageNumbers = Array.from({ length: pageCount }, (_, index) => index + 1);

  function applyFilter(next: FilterId) {
    setFilter(next);
    setPage(1);
  }

  function onSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubscribed(true);
  }

  return (
    <main className="blog-page" id="top">
      <section className="blog-hero" aria-labelledby="blog-title">
        <div className="blog-hero__mountains" aria-hidden="true">
          <Image
            src={`${BLOG_ASSET}/hero-mountain-background.png`}
            alt=""
            fill
            sizes="100vw"
            priority
          />
        </div>
        <div className="blog-wrap">
          <nav className="blog-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Blog</span>
          </nav>
          <p className="blog-eyebrow">Ideas. Insights. Education.</p>
          <h1 id="blog-title">The Dominion Journal</h1>
          <p className="blog-hero__lead">
            Practical guides and fresh perspectives for your trading journey.
          </p>
        </div>
      </section>

      <section className="blog-toolbar" aria-label="Article filters">
        <div className="blog-wrap blog-toolbar__row">
          <div className="blog-filters" role="tablist" aria-label="Categories">
            {BLOG_FILTERS.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={filter === item.id}
                className={`blog-filter${filter === item.id ? " is-active" : ""}`}
                onClick={() => applyFilter(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <label className="blog-search">
            <Search size={16} strokeWidth={2.2} aria-hidden="true" />
            <span className="blog-sr">Search articles</span>
            <input
              type="search"
              value={query}
              placeholder="Search articles, topics or keywords..."
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
            />
          </label>
        </div>
      </section>

      {filter === "all" && !query ? (
        <section className="blog-featured" aria-label="Featured articles">
          <div className="blog-wrap blog-featured__grid">
            {lead ? <FeaturedCard article={lead} /> : null}
            <div className="blog-featured__side">
              {side.map((article) => (
                <FeaturedCard key={article.slug} article={article} compact />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="blog-latest" aria-labelledby="blog-latest-title">
        <div className="blog-wrap">
          <div className="blog-latest__head">
            <h2 id="blog-latest-title">Explore the latest</h2>
            <label className="blog-sort">
              <span>Sort:</span>
              <select
                value={sort}
                onChange={(event) => {
                  setSort(event.target.value as SortId);
                  setPage(1);
                }}
              >
                {BLOG_SORTS.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} strokeWidth={2.4} aria-hidden="true" />
            </label>
          </div>
          {visible.length ? (
            <div className="blog-latest__grid">
              {visible.map((article) => (
                <LatestCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <p className="blog-empty">No articles match that search.</p>
          )}
          {pageCount > 1 ? (
            <nav className="blog-pages" aria-label="Pagination">
              {pageNumbers.map((number) => (
                <button
                  key={number}
                  type="button"
                  className={number === currentPage ? "is-active" : undefined}
                  aria-current={number === currentPage ? "page" : undefined}
                  onClick={() => setPage(number)}
                >
                  {number}
                </button>
              ))}
              {currentPage < pageCount ? (
                <button type="button" onClick={() => setPage(currentPage + 1)}>
                  Next
                </button>
              ) : null}
            </nav>
          ) : null}
        </div>
      </section>

      <section className="blog-pace" aria-labelledby="blog-pace-title">
        <div className="blog-wrap blog-pace__inner">
          <div className="blog-pace__copy">
            <h2 id="blog-pace-title">Learn at your own pace.</h2>
            <p>
              Explore in-depth platform guides, trading fundamentals and market
              insights, all in one place.
            </p>
            <button
              type="button"
              className="blog-btn"
              onClick={() => {
                applyFilter("Platforms");
                document.getElementById("blog-latest-title")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
            >
              Browse platform guides
            </button>
          </div>
          <div className="blog-pace__visual" aria-hidden="true">
            <Image
              src={`${BLOG_ASSET}/learn-at-your-own-pace-banner.png`}
              alt=""
              fill
              sizes="(max-width: 899px) 100vw, 520px"
              className="blog-pace__art"
            />
          </div>
          <p className="blog-pace__aside" aria-hidden="true">
            <span>Discipline</span>
            <span>Perspective</span>
            <span>Progress</span>
          </p>
        </div>
      </section>

      <section className="blog-subscribe" aria-labelledby="blog-subscribe-title">
        <div className="blog-wrap blog-subscribe__row">
          <div>
            <h2 id="blog-subscribe-title">Stay informed</h2>
            <p>Get the latest educational content from Dominion Markets.</p>
          </div>
          {subscribed ? (
            <p className="blog-subscribe__done">Thanks — you are on the list.</p>
          ) : (
            <form className="blog-subscribe__form" onSubmit={onSubscribe}>
              <label className="blog-sr" htmlFor="blog-email">
                Email address
              </label>
              <input
                id="blog-email"
                type="email"
                name="email"
                required
                placeholder="Your email address"
              />
              <button className="blog-btn" type="submit">
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      <section className="blog-next" aria-labelledby="blog-next-title">
        <div className="blog-wrap blog-next__row">
          <div>
            <h2 id="blog-next-title">Your next step starts with knowledge.</h2>
            <p>Put what you learn into practice with a real trading account.</p>
          </div>
          <div className="blog-next__actions">
            <a className="blog-btn" href={SITE_REGISTER_HREF}>
              Open Account
              <ArrowRight size={16} strokeWidth={2.4} aria-hidden="true" />
            </a>
            <Link className="blog-btn blog-btn--outline" href="/accounts">
              Explore Accounts
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
