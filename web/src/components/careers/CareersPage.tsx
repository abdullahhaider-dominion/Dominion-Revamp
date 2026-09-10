import Image from "next/image";
import Link from "next/link";
import { CareersApply } from "@/components/careers/CareersApply";
import "@/styles/careers.css";

export function CareersPage() {
  return (
    <main className="careers-page" id="top">
      <section className="careers-hero" aria-labelledby="careers-title">
        <Image
          src="/assets/Accounts-page/accounts-hero-mountains.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="careers-cover"
        />
        <div className="careers-hero__wash" aria-hidden="true" />
        <div className="careers-wrap careers-hero__inner">
          <nav className="careers-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Careers</span>
          </nav>
          <p className="careers-eyebrow">Join the team</p>
          <h1 id="careers-title">Careers</h1>
          <p>
            Join our team at Dominion Markets and shape the future of trading.
            Explore opportunities where your expertise in finance and technology
            can thrive in an environment dedicated to innovation and success.
          </p>
        </div>
      </section>

      <div className="careers-flow">
        <section className="careers-body" aria-labelledby="careers-paths-title">
          <div className="careers-wrap">
            <CareersApply />
          </div>
        </section>

        <section className="careers-close" aria-labelledby="careers-close-title">
          <div className="careers-wrap careers-close__inner careers-glass">
            <div>
              <p className="careers-eyebrow">Not a role, a conversation</p>
              <h2 id="careers-close-title">Questions before you apply?</h2>
            </div>
            <div className="careers-close__actions">
              <Link className="careers-button" href="/contact">
                Contact us
              </Link>
              <Link
                className="careers-button careers-button--outline"
                href="mailto:careers@dominionmarkets.com"
              >
                Email careers
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
