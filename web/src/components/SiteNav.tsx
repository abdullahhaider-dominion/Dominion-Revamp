"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ComponentProps } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { SITE_NAV } from "@/content/site-nav";
import "@/styles/cinematic-hero.css";

function NavHref({
  href,
  children,
  ...props
}: { href: string } & Omit<ComponentProps<typeof Link>, "href">) {
  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navShown, setNavShown] = useState(true);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const lastY = useRef(0);
  const ticking = useRef(false);
  const menuLeaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelMenuLeave = () => {
    if (menuLeaveTimer.current) {
      clearTimeout(menuLeaveTimer.current);
      menuLeaveTimer.current = null;
    }
  };

  useEffect(() => {
    lastY.current = window.scrollY;
    const update = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      setScrolled(y > 12);

      if (y <= 24) {
        setNavShown(true);
      } else if (delta > 6) {
        setNavShown(false);
        setOpenMenu(null);
        setOpen(false);
      } else if (delta < -6) {
        setNavShown(true);
      }

      lastY.current = y;
      ticking.current = false;
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setOpenMenu(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => cancelMenuLeave, []);

  const closeMenus = () => {
    cancelMenuLeave();
    setOpen(false);
    setOpenMenu(null);
  };

  const frosted = scrolled || open;

  return (
    <header
      className={`dm-nav${frosted ? " is-scrolled" : ""}${open ? " is-open" : ""}${navShown || open ? "" : " is-hidden"}`}
      suppressHydrationWarning
    >
      <div className="dm-nav__inner">
        <Link href="/" className="dm-nav__brand" onClick={closeMenus}>
          <Image
            src="/assets/logo/logo-horizontal-reverse.svg"
            alt="Dominion Markets"
            width={176}
            height={28}
            priority
            className="dm-nav__logo dm-nav__logo--desktop"
          />
          <Image
            src="/assets/logo/logo-horizontal-reverse.svg"
            alt="Dominion Markets"
            width={140}
            height={22}
            priority
            className="dm-nav__logo dm-nav__logo--mobile"
          />
        </Link>

        <nav className="dm-nav__links" aria-label="Primary">
          {SITE_NAV.map((item) => {
            const hasChildren = Boolean(item.children?.length);
            return (
              <div
                key={item.label}
                className={`dm-nav__item${openMenu === item.label ? " is-open" : ""}`}
                onMouseEnter={() => {
                  cancelMenuLeave();
                  if (hasChildren) setOpenMenu(item.label);
                }}
                onMouseLeave={() => {
                  menuLeaveTimer.current = setTimeout(() => {
                    setOpenMenu(null);
                  }, 160);
                }}
              >
                <NavHref
                  href={item.href}
                  className="dm-nav__link"
                  aria-haspopup={hasChildren ? "menu" : undefined}
                  aria-expanded={hasChildren ? openMenu === item.label : undefined}
                  onClick={() => {
                    if (!hasChildren) setOpenMenu(null);
                  }}
                >
                  {item.label}
                  {hasChildren ? (
                    <ChevronDown
                      size={14}
                      className="dm-nav__chevron"
                      aria-hidden="true"
                    />
                  ) : null}
                </NavHref>
                {hasChildren ? (
                  <div className="dm-nav__dropdown" role="menu">
                    <div className="dm-nav__dropdown-panel">
                      {item.children!.map((child) => (
                        <NavHref
                          key={`${child.href}-${child.label}`}
                          href={child.href}
                          role="menuitem"
                          onClick={closeMenus}
                        >
                          {child.label}
                        </NavHref>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>

        <div className="dm-nav__actions">
          <Link href="/#final-cta" className="dm-nav__login" onClick={closeMenus}>
            Log in
          </Link>
          <Link
            href="/#accounts"
            className="hb-primary dm-nav__cta"
            onClick={closeMenus}
          >
            Get Started
          </Link>
          <button
            type="button"
            className="dm-nav__burger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="dm-nav-drawer"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div
        id="dm-nav-drawer"
        className={`dm-nav__drawer${open ? " is-open" : ""}`}
        hidden={!open}
      >
        <nav className="dm-nav__drawer-nav" aria-label="Mobile">
          {SITE_NAV.map((item) => (
            <div key={item.label} className="dm-nav__drawer-group">
              <NavHref
                href={item.href}
                className="dm-nav__drawer-link"
                onClick={closeMenus}
              >
                {item.label}
              </NavHref>
              {item.children
                ? item.children.map((child) => (
                    <NavHref
                      key={`${child.href}-${child.label}`}
                      href={child.href}
                      className="dm-nav__drawer-sub"
                      onClick={closeMenus}
                    >
                      {child.label}
                    </NavHref>
                  ))
                : null}
            </div>
          ))}
          <Link
            href="/#final-cta"
            className="dm-nav__drawer-link"
            onClick={closeMenus}
          >
            Log in
          </Link>
          <Link
            href="/#accounts"
            className="hb-primary dm-nav__drawer-cta"
            onClick={closeMenus}
          >
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  );
}
