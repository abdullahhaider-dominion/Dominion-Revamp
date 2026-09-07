"use client";

import { useEffect } from "react";
import { CinematicHero } from "@/components/CinematicHero";
import { homeBodyHtml } from "@/content/shared-footer-html";

export function DominionHome() {
  useEffect(() => {
    let cancelled = false;

    void import("@/lib/mockups-main.js").then((mod) => {
      if (cancelled) return;
      mod.initDominionMockups();
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <CinematicHero />
      <div
        className="page-root"
        // Remaining mockup sections (proof → final CTA) for 1:1 parity below the new hero.
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: homeBodyHtml }}
      />
    </>
  );
}
