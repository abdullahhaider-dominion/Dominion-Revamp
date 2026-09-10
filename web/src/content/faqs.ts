export type FaqItem = {
  id: string;
  question: string;
  answer: readonly string[];
};

export type FaqTopic = {
  id: string;
  label: string;
  items: readonly FaqItem[];
};

export const FAQ_TOPICS: readonly FaqTopic[] = [
  {
    id: "company",
    label: "Company",
    items: [
      {
        id: "who-owns",
        question: "Who owns Dominion Markets?",
        answer: [
          "Dominion Markets is a fully licensed Forex/CFD broker (licence T2023340). It is privately owned by people with experience in foreign exchange, education, and risk management.",
        ],
      },
      {
        id: "where-situated",
        question: "Where is Dominion Markets situated?",
        answer: [
          "Offices are in Business Bay, Dubai, United Arab Emirates, and on the Island of Mohéli, Comoros Union.",
        ],
      },
      {
        id: "what-is",
        question: "What is Dominion Markets?",
        answer: [
          "An offshore brokerage with segregated client accounts, 24/7 crypto trading, 23/5 currency trading, and rapid deposits and withdrawals by crypto or bank transfer. We provide a fair environment for clients to trade and apply risk-management strategies.",
        ],
      },
    ],
  },
  {
    id: "account",
    label: "Account set-up",
    items: [
      {
        id: "demo-expire",
        question: "Does my demo account ever expire?",
        answer: ["Dominion Markets demo accounts do not have an expiry date."],
      },
      {
        id: "open-demo",
        question: "How do I open a demo account?",
        answer: [
          "Log in at app.dominionmarkets.com. On the left, open the cTrader option and create a demo on cTrader.",
        ],
      },
      {
        id: "ping-test",
        question: "How do I test latency to the cTrader trade server?",
        answer: [
          "Run a ping test from your computer: open CMD, type ping followed by a space and the server IP, then read the minimum, maximum, and average times in milliseconds.",
        ],
      },
      {
        id: "id-time",
        question: "How long does it take to process identification documents?",
        answer: [
          "Verification typically takes 24 to 48 hours.",
        ],
      },
      {
        id: "open-account",
        question: "How can I open a Dominion Markets account?",
        answer: [
          "Fill in your details on the Sign Up page to create an account.",
        ],
      },
      {
        id: "start-trading",
        question: "How can I start trading?",
        answer: [
          "After you log in, deposit a minimum of $50 and create a free cTrader trading account.",
        ],
      },
      {
        id: "equipment",
        question: "What equipment do I need to start trading?",
        answer: [
          "A mobile device, tablet, or desktop with an internet connection, and the cTrader app.",
        ],
      },
      {
        id: "demo-trade",
        question: "Can I trade using a demo account?",
        answer: [
          "Yes. Free demos match live market conditions so you can practise on cTrader without using real funds.",
        ],
      },
      {
        id: "how-many-accounts",
        question: "How many trading accounts can I open?",
        answer: [
          "There is no limit on demo or live accounts. You can use different leverage and currencies on each.",
        ],
      },
      {
        id: "base-currency",
        question: "What are the base currency options?",
        answer: ["USD, GBP, EUR, or CAD."],
      },
    ],
  },
  {
    id: "trading",
    label: "Trading",
    items: [
      {
        id: "techniques",
        question: "Does Dominion Markets prohibit any trading techniques?",
        answer: [
          "We only allow normal manual trading. Hedging, HFT, grids, Martingale, robots, auto traders, and Expert Advisors are not permitted.",
        ],
      },
      {
        id: "no-margin",
        question: "What happens if I have no free margin left?",
        answer: [
          "Open positions are stopped out and you cannot open new trades. In some cases the balance can go negative if the loss exceeds the account. Positions typically close if margin percentage falls below 80%.",
        ],
      },
      {
        id: "position-size",
        question: "What are the smallest and largest position sizes?",
        answer: ["You can open positions from 0.01 lots to 500 lots."],
      },
      {
        id: "assets",
        question: "What assets are available to trade?",
        answer: [
          "55 forex pairs, 35 cryptocurrency pairs, 64 stocks, 11 indices, plus metals and commodities.",
        ],
      },
      {
        id: "leverage",
        question: "What leverage do you offer?",
        answer: [
          "1:500 for forex. 1:100 for indices, metals, cryptocurrency pairs, and stocks.",
        ],
      },
      {
        id: "margin-rules",
        question: "Do you have any margin rules?",
        answer: [
          "A margin call is issued at 100% margin level. Stop-out is at or below 80%.",
        ],
      },
      {
        id: "balance-equity",
        question: "What is the difference between balance, equity, margin, and free margin?",
        answer: [
          "Balance is the amount in the account excluding open profit or loss. Equity includes open profit or loss. Margin is reserved to protect the account. Free margin is what remains available to open new positions.",
        ],
      },
      {
        id: "trading-problem",
        question: "What if I have a problem while trading?",
        answer: [
          "Contact 24/7 support by live chat, email, or a phone-call request.",
        ],
      },
      {
        id: "crypto-commission",
        question: "What are the commissions when you trade crypto?",
        answer: [
          "0.35% of 1 lot to open and 0.35% to close (0.7% round trip). Formula: (price × volume × rate) / 100.",
        ],
      },
    ],
  },
  {
    id: "deposits",
    label: "Deposits",
    items: [
      {
        id: "deposit-crypto",
        question: "Can I deposit funds via crypto?",
        answer: [
          "Yes. Crypto is the main and fastest method. Options include BTC, ETH, LTC, DASH, BCH, XMR, NEO, XRP, and ADA.",
        ],
      },
      {
        id: "deposit-card",
        question: "Can I deposit with a credit or debit card?",
        answer: [
          "Yes, through our third-party payment processor. Bank transfer is also available.",
        ],
      },
      {
        id: "how-deposit",
        question: "How can I deposit funds?",
        answer: [
          "Log in, open Deposit on the dashboard, and choose a method.",
          "For crypto: enter the amount, choose an asset, and send to the wallet shown. Unused addresses expire after 14 days.",
          "Card deposits go through compliance first. If rejected, funds return to the card.",
        ],
      },
      {
        id: "min-deposit",
        question: "Is there a minimum deposit?",
        answer: [
          "The minimum crypto deposit is $50. Amounts below that may not appear because of network fees (0.0005 BTC is cited per Bitcoin transaction). Other methods start at $100.",
        ],
      },
      {
        id: "deposit-fee",
        question: "Am I charged a fee every time I deposit?",
        answer: [
          "Crypto deposits use a weighted average from exchanges such as Coinbase and Kraken, plus a 1% markup. The rate is set when crypto arrives in our wallet, not when you send it.",
        ],
      },
      {
        id: "btc-time",
        question: "How long until Bitcoin appears in my account?",
        answer: [
          "Bitcoin typically arrives in 5 minutes to 1 hour, depending on chain traffic.",
        ],
      },
    ],
  },
  {
    id: "withdrawals",
    label: "Withdrawals",
    items: [
      {
        id: "withdraw-methods",
        question: "What withdrawal methods does Dominion Markets offer?",
        answer: [
          "Same-day crypto withdrawals, reviewed within 24 hours. Card and bank transfer are also available. Withdraw on the same rail you used to deposit.",
        ],
      },
      {
        id: "min-withdraw",
        question: "Is there a minimum amount for withdrawals?",
        answer: ["The minimum withdrawal is $50."],
      },
      {
        id: "max-withdraw",
        question: "Is there a maximum amount for withdrawals?",
        answer: ["There is no maximum withdrawal amount."],
      },
      {
        id: "withdraw-time",
        question: "How long do withdrawals take?",
        answer: [
          "The team reviews requests within 24 hours. After that, chain or bank times still apply.",
        ],
      },
      {
        id: "trade-while-withdraw",
        question: "Can I trade while a withdrawal is processing?",
        answer: [
          "Yes, unless you have withdrawn all funds. Remaining balance stays available to trade.",
        ],
      },
      {
        id: "cancel-withdraw",
        question: "Can I cancel my withdrawal request?",
        answer: [
          "Only while it is still pending, by contacting support (available 24/5).",
        ],
      },
    ],
  },
] as const;
