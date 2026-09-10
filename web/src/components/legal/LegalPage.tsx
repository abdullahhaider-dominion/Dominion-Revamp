import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";
import {
  LEGAL_GROUPS,
  legalDocumentHref,
} from "@/content/legal-documents";
import "@/styles/legal.css";

export function LegalPage() {
  return (
    <main className="legal-page" id="top">
      <div className="legal-atmosphere" aria-hidden="true">
        <Image
          src="/assets/Legal-page/legal-hero-banner.jpg"
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          className="legal-cover"
        />
        <div className="legal-atmosphere__fade" />
      </div>
      <section className="legal-hero" aria-label="Legal documents">
        <div className="legal-wrap legal-hero__inner">
          <nav className="legal-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Legal Documents</span>
          </nav>
        </div>
      </section>

      <div className="legal-flow">
        <section className="legal-body" aria-labelledby="legal-title">
          <div className="legal-wrap legal-library">
            <div className="legal-story">
              <p className="legal-eyebrow">Policies</p>
              <h1 id="legal-title">Legal Documents</h1>
              <p>
                We advise our traders to review and understand our policies and
                procedures before opening a trading account or placing an order.
                If you have any questions, please don&apos;t hesitate to contact
                us.
              </p>
              <Link className="legal-text-link" href="/contact">
                Contact us
                <ArrowUpRight size={16} strokeWidth={2.2} aria-hidden="true" />
              </Link>
            </div>

            <div className="legal-stage legal-glass">
              {LEGAL_GROUPS.map((group) => (
                <section
                  className="legal-group"
                  key={group.id}
                  aria-labelledby={`legal-group-${group.id}`}
                >
                  <h2 id={`legal-group-${group.id}`}>{group.label}</h2>
                  <ul>
                    {group.documents.map((document) => (
                      <li key={document.file}>
                        <a
                          className="legal-row"
                          href={legalDocumentHref(document.file)}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${document.label} (PDF, opens in a new tab)`}
                        >
                          <span className="legal-row__icon" aria-hidden="true">
                            <FileText size={18} strokeWidth={1.8} />
                          </span>
                          <span className="legal-row__copy">
                            <span>{document.label}</span>
                            <small>PDF</small>
                          </span>
                          <ArrowUpRight
                            className="legal-row__go"
                            size={18}
                            strokeWidth={2}
                            aria-hidden="true"
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </div>
        </section>

        <section className="legal-close" aria-labelledby="legal-close-title">
          <div className="legal-wrap legal-close__inner legal-glass">
            <div>
              <p className="legal-eyebrow">Need a person?</p>
              <h2 id="legal-close-title">Questions about a policy?</h2>
            </div>
            <div className="legal-close__actions">
              <Link className="legal-button" href="/contact">
                Contact us
              </Link>
              <Link className="legal-button legal-button--outline" href="/accounts">
                View accounts
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
