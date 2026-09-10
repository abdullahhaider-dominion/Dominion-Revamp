"use client";

import { useEffect, useState } from "react";

const LOCATIONS = [
  {
    id: "uae",
    place: "UAE",
    role: "Management office",
    entity: "Dominion Financial Services L.L.C.",
    address: "Office-4f-B-04, 345 Sheikh Zayed Road, Dubai",
    meta: "CMA licence 20200000425",
    left: "65.3%",
    top: "36%",
    align: "e",
    tip: "s",
  },
  {
    id: "cyprus",
    place: "Cyprus",
    role: "Company",
    entity: "Dominion Markets LTD",
    address: "Kyklaminon 16A, Parekklisia, 4520, Limassol",
    meta: "Company no. HE460499",
    left: "59.4%",
    top: "31%",
    align: "nw",
    tip: "s",
  },
  {
    id: "mauritius",
    place: "Mauritius",
    role: "FSC registered entity",
    entity: "Dominion Markets Ltd",
    address: "Office 133, Ebene Junction, Rue De La Democratie, Ebene",
    meta: "FSC Investment Dealer GB24203525",
    left: "65.9%",
    top: "61.4%",
    align: "e",
    tip: "n",
  },
  {
    id: "comoros",
    place: "Comoros",
    role: "International entity",
    entity: "Dominion Markets LLC",
    address: "Bonovo Road, Fomboni, Mohéli",
    meta: "IBC licence T2023340",
    left: "62.1%",
    top: "56.8%",
    align: "w",
    tip: "n",
  },
] as const;

type LocationId = (typeof LOCATIONS)[number]["id"];

function LocationTip({
  location,
}: {
  location: (typeof LOCATIONS)[number];
}) {
  return (
    <>
      <p className="contact-tip__role">{location.role}</p>
      <p className="contact-tip__entity">{location.entity}</p>
      <p>{location.address}</p>
      <p className="contact-tip__meta">{location.meta}</p>
    </>
  );
}

export function ContactMap() {
  const [active, setActive] = useState<LocationId | null>(null);
  const selected = LOCATIONS.find((location) => location.id === active) ?? null;

  useEffect(() => {
    if (!active) {
      return;
    }

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActive(null);
      }
    };

    const onPointer = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }
      if (!target.closest("[data-contact-map]")) {
        setActive(null);
      }
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [active]);

  return (
    <div className="contact-map-root" data-contact-map="">
      <div
        className="contact-map"
        role="group"
        aria-label="Office locations. Hover or focus a pin for details."
      >
        <img
          className="contact-map__lands"
          src="/assets/regulatory/world-map.svg"
          alt=""
        />
        {LOCATIONS.map((location) => {
          const open = active === location.id;
          return (
            <button
              key={location.id}
              type="button"
              className={`contact-pin contact-pin--${location.align} contact-pin--tip-${location.tip}${open ? " is-active" : ""}`}
              style={{ left: location.left, top: location.top }}
              aria-expanded={open}
              aria-describedby={`contact-tip-${location.id}`}
              onFocus={() => setActive(location.id)}
              onBlur={(event) => {
                const next = event.relatedTarget;
                if (
                  next instanceof Node &&
                  event.currentTarget
                    .closest("[data-contact-map]")
                    ?.contains(next)
                ) {
                  return;
                }
                setActive((current) =>
                  current === location.id ? null : current,
                );
              }}
              onClick={() =>
                setActive((current) =>
                  current === location.id ? null : location.id,
                )
              }
            >
              <span className="contact-pin__mark">
                <i />
                <em>
                  <strong>{location.place}</strong>
                  {location.role}
                </em>
              </span>
              <span
                className="contact-tip"
                id={`contact-tip-${location.id}`}
                role="tooltip"
              >
                <LocationTip location={location} />
              </span>
            </button>
          );
        })}
      </div>

      <ul className="contact-map__legend">
        {LOCATIONS.map((location) => (
          <li key={location.id}>
            <button
              type="button"
              className={active === location.id ? "is-active" : undefined}
              aria-expanded={active === location.id}
              onClick={() =>
                setActive((current) =>
                  current === location.id ? null : location.id,
                )
              }
            >
              {location.place} — {location.role}
            </button>
          </li>
        ))}
      </ul>

      <div
        className={`contact-map__detail${selected ? " is-open" : ""}`}
        hidden={!selected}
      >
        {selected ? <LocationTip location={selected} /> : null}
      </div>
    </div>
  );
}
