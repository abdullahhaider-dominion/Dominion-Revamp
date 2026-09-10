import Image from "next/image";
import Link from "next/link";
import type { ComponentType } from "react";
import { Building2, Clock, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactMap } from "@/components/contact/ContactMap";
import "@/styles/contact.css";

type IconType = ComponentType<{
  size?: number | string;
  strokeWidth?: number | string;
  "aria-hidden"?: boolean | "true" | "false";
}>;

const PHONE = "+971 4 570 4324";
const PHONE_HREF = "tel:+97145704324";
const EMAIL = "info@dominionmarkets.com";

const SOCIAL = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/dominionmarkets/",
  },
  {
    label: "X",
    href: "https://twitter.com/DominionMktsLLC",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@DominionMarkets/featured",
  },
  {
    label: "Discord",
    href: "https://discord.gg/EKKkR8FzY7",
  },
] as const;

function IconWell({ icon: Icon }: { icon: IconType }) {
  return (
    <span className="contact-icon" aria-hidden="true">
      <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
    </span>
  );
}

export function ContactPage() {
  return (
    <main className="contact-page" id="top">
      <section className="contact-hero" aria-labelledby="contact-hero-title">
        <Image
          src="/assets/Accounts-page/accounts-hero-mountains.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="contact-cover"
        />
        <div className="contact-hero__wash" aria-hidden="true" />
        <div className="contact-wrap contact-hero__inner">
          <nav className="contact-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Contact</span>
          </nav>
          <p className="contact-eyebrow">Get in touch</p>
          <h1 id="contact-hero-title">Contact Us</h1>
          <p>
            Do not hesitate to reach out. Just fill in the contact form here and
            we’ll be sure to reply as fast as possible.
          </p>
        </div>
      </section>

      <div className="contact-flow">
      <section className="contact-body" aria-label="Contact form and details">
        <div className="contact-wrap contact-layout">
          <div className="contact-panel contact-glass">
            <h2 className="contact-panel__title">Send a message</h2>
            <p className="contact-panel__lead">
              Tell us how we can help. A member of the team will reply during
              office hours.
            </p>
            <ContactForm />
          </div>

          <aside className="contact-aside" aria-label="Offices and channels">
            <article className="contact-card contact-glass">
              <IconWell icon={Building2} />
              <div>
                <h3>Management office</h3>
                <p>
                  Office-4f-B-04, 345 Sheikh Zayed Road
                  <br />
                  Dubai, UAE
                </p>
              </div>
            </article>

            <article className="contact-card contact-glass">
              <IconWell icon={MapPin} />
              <div>
                <h3>Registered office</h3>
                <p>
                  Office 133, Ebene Junction
                  <br />
                  Rue De La Democratie, Ebene, Mauritius
                </p>
                <p className="contact-card__meta">
                  Dominion Markets Ltd · FSC Investment Dealer GB24203525
                </p>
              </div>
            </article>

            <article className="contact-card contact-glass">
              <IconWell icon={Phone} />
              <div>
                <h3>Phone</h3>
                <p>
                  <a href={PHONE_HREF}>{PHONE}</a>
                </p>
                <p className="contact-card__meta">
                  <Clock size={14} strokeWidth={2} aria-hidden="true" />
                  10am–6pm GMT+4
                </p>
              </div>
            </article>

            <article className="contact-card contact-glass">
              <IconWell icon={Mail} />
              <div>
                <h3>Email</h3>
                <p>
                  <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                </p>
              </div>
            </article>

            <div className="contact-social contact-glass">
              <h3>Social</h3>
              <ul>
                {SOCIAL.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} target="_blank" rel="noreferrer">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="contact-presence" aria-labelledby="contact-presence-title">
        <div className="contact-wrap contact-presence__inner">
          <div className="contact-presence__copy">
            <p className="contact-eyebrow">Around the world</p>
            <h2 id="contact-presence-title">Our global presence</h2>
            <p>
              With 3+ offices across key regions, we are positioned to support
              traders around the world.
            </p>
            <Link className="contact-button contact-button--outline" href="/about">
              Learn more about us
              <span aria-hidden="true">→</span>
            </Link>
          </div>
          <ContactMap />
        </div>
      </section>

      <section className="contact-close" aria-labelledby="contact-close-title">
        <div className="contact-wrap contact-close__inner contact-glass">
          <div>
            <p className="contact-eyebrow">Ready to trade?</p>
            <h2 id="contact-close-title">Take a step forward, open an account with us</h2>
          </div>
          <div className="contact-close__actions">
            <Link className="contact-button" href="/accounts">
              Get Started
            </Link>
            <a
              className="contact-button contact-button--outline"
              href="https://app.dominionmarkets.com/en/login"
            >
              Client area
            </a>
          </div>
        </div>
      </section>
      </div>
    </main>
  );
}
