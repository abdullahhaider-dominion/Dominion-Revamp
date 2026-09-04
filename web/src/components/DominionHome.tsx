"use client";

import { useEffect } from "react";
import { CinematicHero } from "@/components/CinematicHero";
import { homeHtml } from "@/content/home-html";

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
        // Remaining mockup sections (proof → footer) for 1:1 parity below the new hero.
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: homeHtml }}
      />
    </>
  );
}
