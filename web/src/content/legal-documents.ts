export type LegalDocument = {
  label: string;
  file: string;
};

export type LegalGroup = {
  id: string;
  label: string;
  documents: readonly LegalDocument[];
};

export const LEGAL_GROUPS: readonly LegalGroup[] = [
  {
    id: "client",
    label: "Client relationship",
    documents: [
      {
        label: "Client Agreement & Terms and Conditions",
        file: "client-agreement-terms-and-conditions.pdf",
      },
      {
        label: "Website Terms and Conditions",
        file: "website-terms-and-conditions.pdf",
      },
      {
        label: "Privacy Policy",
        file: "privacy-policy.pdf",
      },
    ],
  },
  {
    id: "trading",
    label: "Trading",
    documents: [
      {
        label: "Trading Practices Policy",
        file: "trading-practices-policy.pdf",
      },
      {
        label: "Risk Disclosure and Warning Notice",
        file: "risk-disclosure-and-warning-notice.pdf",
      },
    ],
  },
  {
    id: "funding",
    label: "Funding",
    documents: [
      {
        label: "Card Funding Disclaimer & Policy",
        file: "card-funding-disclaimer-policy.pdf",
      },
      {
        label: "Withdrawal and Refund Policy",
        file: "withdrawal-and-refund-policy.pdf",
      },
    ],
  },
  {
    id: "compliance",
    label: "Compliance",
    documents: [
      {
        label: "AML CFT Policy",
        file: "aml-cft-policy.pdf",
      },
      {
        label: "Complaint Handling Policy",
        file: "complaint-handling-policy.pdf",
      },
    ],
  },
] as const;

export function legalDocumentHref(file: string) {
  return `/legal/${file}`;
}
