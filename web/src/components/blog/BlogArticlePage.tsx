"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { ArrowRight, Clock } from "lucide-react";
import {
  BLOG_ASSET,
  articleHref,
  relatedArticles,
  type BlogArticle,
  type BlogBlock,
} from "@/content/blog";
import { getArticleBody } from "@/content/blog-bodies";
import { SITE_REGISTER_HREF } from "@/content/site-nav";
import "@/styles/blog.css";

function Block({ block }: { block: BlogBlock }) {
  if (block.type === "h2") {
    return <h2 id={block.id}>{block.text}</h2>;
  }
  if (block.type === "h3") {
    return <h3>{block.text}</h3>;
  }
  if (block.type === "p") {
    return <p>{block.text}</p>;
  }
  if (block.type === "doDont") {
    return (
      <div className="blog-article__split">
        <div className="blog-article__callout blog-article__callout--do">
          <p>Do</p>
          <p>{block.do}</p>
        </div>
        <div className="blog-article__callout blog-article__callout--dont">
          <p>Don&apos;t</p>
          <p>{block.dont}</p>
        </div>
      </div>
    );
  }
  return (
    <figure className="blog-article__figure">
      <Image
        src={block.src}
        alt={block.alt}
        width={1200}
        height={720}
        sizes="(max-width: 899px) 100vw, 760px"
      />
    </figure>
  );
}

function RailCard({ article }: { article: BlogArticle }) {
  return (
    <article className="blog-rail-card">
      <Link className="blog-rail-card__media" href={articleHref(article.slug)}>
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          sizes="320px"
        />
      </Link>
      <p className="blog-kicker">{article.categoryLabel}</p>
      <h3>
        <Link href={articleHref(article.slug)}>{article.title}</Link>
      </h3>
      <p>{article.excerpt}</p>
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
    </article>
  );
}

export function BlogArticlePage({ article }: { article: BlogArticle }) {
  const body = getArticleBody(article.slug);
  const related = relatedArticles(article.slug);
  const [subscribed, setSubscribed] = useState(false);
  const [activeId, setActiveId] = useState(body?.toc[0]?.id ?? "");

  useEffect(() => {
    if (!body?.toc.length) return;
    const nodes = body.toc
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => Boolean(node));
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const id = visible?.target.getAttribute("id");
        if (id) setActiveId(id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0.1, 0.25, 0.5] },
    );
    for (const node of nodes) observer.observe(node);
    return () => observer.disconnect();
  }, [body]);

  function onSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubscribed(true);
  }

  const toc = body?.toc ?? [];
  const blocks = body?.blocks ?? [
    {
      type: "p" as const,
      text: article.excerpt,
    },
  ];

  return (
    <main className="blog-page" id="top">
      <section className="blog-hero blog-hero--article" aria-labelledby="blog-article-title">
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
            <Link href="/blog">Blog</Link>
            <span aria-hidden="true">/</span>
            <span>{article.title}</span>
          </nav>
          <p className="blog-eyebrow">{article.categoryLabel}</p>
          <h1 id="blog-article-title">{article.title}</h1>
          <p className="blog-article__meta">
            <Clock size={15} strokeWidth={2.2} aria-hidden="true" />
            {article.minutes} min read
          </p>
        </div>
      </section>

      <section className="blog-article" aria-label={article.title}>
        <div className="blog-wrap blog-article__layout">
          <div className="blog-article__main">
            <div className="blog-article__cover">
              <Image
                src={article.image}
                alt={article.imageAlt}
                fill
                sizes="(max-width: 899px) 100vw, 760px"
                priority
              />
            </div>
            <div className="blog-article__body">
              {blocks.map((block, index) => (
                <Block key={`${block.type}-${index}`} block={block} />
              ))}
            </div>
          </div>

          <aside className="blog-article__rail">
            {toc.length ? (
              <nav className="blog-toc" aria-label="On this page">
                <p>On this page</p>
                <ol>
                  {toc.map((item, index) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className={item.id === activeId ? "is-active" : undefined}
                      >
                        <span>{index + 1}.</span> {item.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            ) : null}
            <a className="blog-btn blog-article__cta" href={SITE_REGISTER_HREF}>
              Open Account
            </a>
            <div className="blog-article__related">
              {related.map((item) => (
                <RailCard key={item.slug} article={item} />
              ))}
            </div>
          </aside>
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
              <label className="blog-sr" htmlFor="blog-article-email">
                Email address
              </label>
              <input
                id="blog-article-email"
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
