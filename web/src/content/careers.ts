export type CareerPath = {
  id: string;
  label: string;
  hint: string;
};

export const CAREER_PATHS: readonly CareerPath[] = [
  {
    id: "markets",
    label: "Markets",
    hint: "Desks, research, and trading craft",
  },
  {
    id: "platform",
    label: "Platform",
    hint: "cTrader, MT5, and product care",
  },
  {
    id: "partnerships",
    label: "Partnerships",
    hint: "IBs, affiliates, and partners",
  },
  {
    id: "operations",
    label: "Operations",
    hint: "Support, ops, and the client path",
  },
] as const;

export const CAREERS_EMAIL = "careers@dominionmarkets.com";
export const CAREERS_FORM_ACTION = `https://formsubmit.co/${CAREERS_EMAIL}`;
