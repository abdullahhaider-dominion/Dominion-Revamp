import Image from "next/image";
import Link from "next/link";
import { FaqsExplorer } from "@/components/faqs/FaqsExplorer";
import "@/styles/faqs.css";

export function FaqsPage() {
  return (
    <main className="faqs-page" id="top">
      <section className="faqs-hero" aria-labelledby="faqs-hero-title">
        <Image
          src="/assets/Accounts-page/accounts-hero-mountains.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="faqs-cover"
        />
        <div className="faqs-hero__wash" aria-hidden="true" />
        <div className="faqs-wrap faqs-hero__inner">
          <nav className="faqs-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>FAQs</span>
          </nav>
          <p className="faqs-eyebrow">Help center</p>
          <h1 id="faqs-hero-title">FAQs</h1>
          <p>
            Answers on accounts, cTrader, deposits, and withdrawals. Pick a
            topic or search — we will jump to the matching questions.
          </p>
        </div>
      </section>

      <div className="faqs-flow">
        <section className="faqs-body" aria-label="Frequently asked questions">
          <div className="faqs-wrap">
            <FaqsExplorer />
          </div>
        </section>

        <section className="faqs-close" aria-labelledby="faqs-close-title">
          <div className="faqs-wrap faqs-close__inner faqs-glass">
            <div>
              <p className="faqs-eyebrow">Still need a person?</p>
              <h2 id="faqs-close-title">Contact the team or open an account</h2>
            </div>
            <div className="faqs-close__actions">
              <Link className="faqs-button" href="/contact">
                Contact us
              </Link>
              <Link className="faqs-button faqs-button--outline" href="/accounts">
                View accounts
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
