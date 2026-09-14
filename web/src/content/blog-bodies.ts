import {
  BLOG_ASSET,
  type BlogArticleBody,
  type BlogBlock,
  type BlogTocItem,
} from "@/content/blog";

function guide(
  sections: {
    id: string;
    title: string;
    paragraphs: string[];
    h3?: { title: string; paragraphs: string[] };
  }[],
  extras?: {
    doDont?: { do: string; dont: string };
    figure?: { src: string; alt: string };
  },
): BlogArticleBody {
  const toc: BlogTocItem[] = sections.map((section) => ({
    id: section.id,
    label: section.title,
  }));
  const blocks: BlogBlock[] = [];
  for (const [index, section] of sections.entries()) {
    blocks.push({ type: "h2", id: section.id, text: section.title });
    for (const text of section.paragraphs) {
      blocks.push({ type: "p", text });
    }
    if (section.h3) {
      blocks.push({ type: "h3", text: section.h3.title });
      for (const text of section.h3.paragraphs) {
        blocks.push({ type: "p", text });
      }
    }
    if (index === 0 && extras?.doDont) {
      blocks.push({ type: "doDont", ...extras.doDont });
    }
    if (index === 1 && extras?.figure) {
      blocks.push({ type: "figure", ...extras.figure });
    }
  }
  return { toc, blocks };
}

export const BLOG_BODIES: Record<string, BlogArticleBody> = {
  "understanding-mt5-timeframes": guide(
    [
      {
        id: "introduction",
        title: "What a timeframe actually is",
        paragraphs: [
          "A timeframe is simply the size of each candle on the chart. On M15, one candle is fifteen minutes of price. On H4, one candle is four hours. The market is the same — you are only choosing how much history each bar summarises.",
          "MT5 lets you switch from one-minute through to monthly without leaving the chart. The skill is not knowing the list. It is matching the candle size to the decision you are trying to make.",
        ],
      },
      {
        id: "mt5-list",
        title: "The MT5 timeframe list",
        paragraphs: [
          "Intraday traders usually live in M5, M15 and M30. Swing traders spend more time on H1, H4 and D1. Monthly and weekly charts are for bias — they tell you the weather, not the next trade.",
          "You can open the same symbol in several windows at once. That is the point of MT5: one setup, several clocks.",
        ],
        h3: {
          title: "How to switch without losing the plot",
          paragraphs: [
            "Set your higher timeframe first so the bias is honest. Then drop to the execution chart. If the two disagree, wait. A clean M15 long against a falling D1 is a different trade from a pullback that agrees with the day.",
          ],
        },
      },
      {
        id: "choose",
        title: "How to choose one",
        paragraphs: [
          "Start from how long you can sit with a position. If you cannot watch the screen, M1 will punish you. If you only check charts in the evening, H4 and D1 will do more work than a stack of one-minute candles.",
          "Pick one execution timeframe for a month. Changing clocks every session is how mixed results get explained away as “the market”.",
        ],
      },
    ],
    {
      doDont: {
        do: "Decide bias on a higher chart, then time the entry on a lower one.",
        dont: "Jump timeframes after a loss to find a candle that agrees with you.",
      },
      figure: {
        src: `${BLOG_ASSET}/mt5-indicators-workstation.png`,
        alt: "MT5 workstation showing more than one chart timeframe",
      },
    },
  ),
  "managing-risk-before-you-trade": guide(
    [
      {
        id: "introduction",
        title: "Introduction",
        paragraphs: [
          "Risk is the part of the trade you still control after you click buy or sell. The market can gap, spread can widen, and a thesis can be wrong. Position size, stop placement and a daily loss cap are how you keep those facts from turning into an account problem.",
          "This is not a lecture on being cautious. It is a sequence you can run before every order so the loss you accept is the loss you meant to accept.",
        ],
      },
      {
        id: "leverage",
        title: "Leverage basics",
        paragraphs: [
          "Leverage scales both sides. 1:100 on a small account does not make you a larger trader — it makes a 1% move in the market feel like 100% in the margin you posted. Used well, it lets you risk a small fraction of equity. Used poorly, it turns a normal session into a margin call.",
          "Before you raise leverage, write the cash amount you are willing to lose on the next trade. Then back into lot size from the stop distance. Leverage is the leftover, not the starting number.",
        ],
        h3: {
          title: "Position sizing",
          paragraphs: [
            "A simple rule: risk a fixed fraction of equity — many discretionary traders use 0.5% to 1% — measured from entry to stop. If the stop is 20 pips away, the lot size is whatever makes those 20 pips equal that cash amount. The chart does not care that a round lot “feels” professional.",
          ],
        },
      },
      {
        id: "stops",
        title: "Stop losses",
        paragraphs: [
          "A stop belongs where the idea is wrong, not where the pain is comfortable. If you need a tighter stop to make the risk number look small, the position is too large or the setup is too noisy.",
          "Place it beyond structure — a swing, a range edge, a level that would invalidate the reason you entered — then size the trade to that distance. Moving it further away after you are in is how a planned 1% becomes an unplanned 4%.",
        ],
      },
    ],
    {
      doDont: {
        do: "Size the position from the stop, then click the order.",
        dont: "Pick a lot size first and squeeze the stop until the loss “looks fine”.",
      },
      figure: {
        src: `${BLOG_ASSET}/leverage-margin-architecture.png`,
        alt: "Structured city architecture used as a metaphor for leverage and margin",
      },
    },
  ),
  "how-to-read-candlestick-charts": guide(
    [
      {
        id: "introduction",
        title: "Why candlesticks",
        paragraphs: [
          "A candlestick packs four prices into one shape: open, high, low and close. The body shows where the session opened and closed. The wicks show how far price travelled and got rejected. Once you can read that at a glance, you stop needing a paragraph of numbers for every bar.",
          "Candles do not predict. They describe who was more aggressive in that window — buyers or sellers — and whether that pressure held into the close.",
        ],
      },
      {
        id: "anatomy",
        title: "Anatomy of a candle",
        paragraphs: [
          "A close above the open prints a bullish body. A close below prints a bearish one. Long wicks mean the move was tested and given back. A tiny body with long wicks is indecision, not a secret signal.",
          "Colour is a preference. Structure is not. Two traders can invert green and red and still agree on the high, the low and the close.",
        ],
        h3: {
          title: "What the wick is telling you",
          paragraphs: [
            "A long lower wick after a sell-off says buyers showed up at that price. A long upper wick after a rally says supply appeared. Neither is a trade by itself. It is context for the next candle and for the level you already marked.",
          ],
        },
      },
      {
        id: "practice",
        title: "How to actually read a chart",
        paragraphs: [
          "Start with the last swing high and swing low. Then look at whether recent candles are closing near their highs or getting wicks rejected. Patterns — engulfing, pin, inside bar — only matter when they print at a level you already care about.",
          "If you cannot explain the last ten candles in a sentence, zoom out. The story on H4 is usually clearer than a stack of M1 noise.",
        ],
      },
    ],
    {
      doDont: {
        do: "Read candles against a level you marked in advance.",
        dont: "Name a pattern in the middle of nowhere and treat it as an entry.",
      },
      figure: {
        src: `${BLOG_ASSET}/featured-mt5-timeframes.png`,
        alt: "Laptop chart used to read candlestick structure",
      },
    },
  ),
  "how-to-add-indicators-on-mt5": guide(
    [
      {
        id: "find",
        title: "Where MT5 keeps indicators",
        paragraphs: [
          "Open Insert → Indicators, or use the Navigator pane. Trend, oscillators, volumes and Bill Williams are the built-in groups. Custom indicators you install land under a separate folder in the same list.",
          "Double-click the name, set inputs, then apply. If the chart goes noisy, you added too many — not too few.",
        ],
      },
      {
        id: "add",
        title: "Adding and editing",
        paragraphs: [
          "Most overlays (moving averages, Bollinger) sit on price. Oscillators (RSI, MACD) open in a separate window. Right-click the chart, choose Indicator List, and you can edit or delete without hunting the menu again.",
          "Save a template once the chart looks like work, not a demo. Templates are how you stop rebuilding the same three averages every morning.",
        ],
      },
      {
        id: "customise",
        title: "Keep the chart honest",
        paragraphs: [
          "An indicator is a view of price, not a second market. If you cannot see candles through the overlays, remove colour until you can. The trade still happens on the candle.",
        ],
      },
    ],
    {
      doDont: {
        do: "Add one tool, decide what it is for, then save a template.",
        dont: "Stack five oscillators and wait for all of them to agree.",
      },
      figure: {
        src: `${BLOG_ASSET}/featured-mt5-timeframes.png`,
        alt: "MT5 chart with a clean indicator layout",
      },
    },
  ),
  "a-guide-to-forex-currency-pairs": guide(
    [
      {
        id: "majors",
        title: "Majors, minors and exotics",
        paragraphs: [
          "Majors pair the US dollar with the other most-traded currencies — EURUSD, GBPUSD, USDJPY, USDCHF, AUDUSD, USDCAD, NZDUSD. They usually have the tightest spreads and the most session coverage.",
          "Minors (crosses) skip the dollar — EURGBP, EURJPY. Exotics pair a major with a smaller currency. Spreads are wider, gaps are ruder, and news in the smaller economy can dominate.",
        ],
      },
      {
        id: "moves",
        title: "What actually moves a pair",
        paragraphs: [
          "Relative rates, growth data, and risk appetite. A pair is two stories. EURUSD is not “the euro” — it is the euro versus the dollar. If both currencies are weak, the pair can still go nowhere.",
          "Session overlap matters. London–New York is when many dollar pairs put in the day’s range. Asian hours often belong to JPY and AUD.",
        ],
      },
      {
        id: "choose",
        title: "Choosing what to trade",
        paragraphs: [
          "Trade the pair whose session you can actually watch, and whose spread does not eat the stop you need. A beautiful exotic on a 1-minute chart is a hobby, not a process.",
        ],
      },
    ],
    {
      doDont: {
        do: "Learn one major deeply before you collect a watchlist of exotics.",
        dont: "Treat every pair as interchangeable because they all have candles.",
      },
      figure: {
        src: `${BLOG_ASSET}/trading-sessions-globe.png`,
        alt: "Global map suggesting which pairs are active by session",
      },
    },
  ),
  "trading-sessions-explained": guide(
    [
      {
        id: "clock",
        title: "The market is a clock, not a place",
        paragraphs: [
          "Spot FX runs all week, but liquidity is not even. Tokyo, London and New York each bring their own flows. The pair you trade should match the session that actually prints volume in it.",
          "Session times shift with daylight saving. Learn the windows in your local clock once, then keep a note — guessing is how you fade a dead Asian range.",
        ],
      },
      {
        id: "windows",
        title: "The three windows",
        paragraphs: [
          "Asia often sets a range in JPY and AUD. London typically opens that range or extends it. New York overlaps London and is when many USD pairs do the heavy work.",
          "The London–New York overlap is not magic. It is simply when two large books are open at once. Spreads tighten, news lands, and stops get tested.",
        ],
      },
      {
        id: "use",
        title: "How to use this",
        paragraphs: [
          "If you can only trade two hours a day, pick the overlap that matches your pairs. If you trade Asia, do not expect EURUSD to behave like the London close. The chart is honest about volume if you let it be.",
        ],
      },
    ],
    {
      doDont: {
        do: "Match the pair to the session that actually trades it.",
        dont: "Force a London-style breakout onto a quiet Asian afternoon.",
      },
      figure: {
        src: `${BLOG_ASSET}/currency-symbols.png`,
        alt: "Currency symbols representing pairs that change character by session",
      },
    },
  ),
  "gold-trading-the-fundamentals": guide(
    [
      {
        id: "drivers",
        title: "What gold is responding to",
        paragraphs: [
          "Gold is priced in dollars and sensitive to real rates. When yields and the dollar rise together, gold often struggles. When policy looks easier or risk hits equities, gold can bid even if the “story” that week is messy.",
          "It is also a commodity with jewellery, ETF and central-bank demand. Those flows are slower than a CPI print, but they are why gold is not just an inverse-USD toy.",
        ],
      },
      {
        id: "trade",
        title: "How traders usually approach it",
        paragraphs: [
          "XAUUSD can move hundreds of dollars in a session. That is not an invitation to size like EURUSD. Widen the stop to structure, then cut the lot until the cash risk matches your rule.",
          "London and New York still matter. A quiet Asian drift in gold is a different market from a US data spike.",
        ],
      },
      {
        id: "respect",
        title: "Respect the instrument",
        paragraphs: [
          "If your process was built on a 10-pip EUR stop, do not paste it onto gold. The product is faster and the overnight gaps are less polite. Adjust the clock and the size, or pick another market.",
        ],
      },
    ],
    {
      doDont: {
        do: "Size gold from a structure stop, not from a forex habit.",
        dont: "Treat every dip as a bargain because gold “always comes back”.",
      },
      figure: {
        src: `${BLOG_ASSET}/currency-symbols.png`,
        alt: "Dollar context sitting behind a gold trade",
      },
    },
  ),
  "building-a-trading-plan": guide(
    [
      {
        id: "why",
        title: "Why a plan is not a slogan",
        paragraphs: [
          "A trading plan is the list of decisions you refuse to remake under pressure: markets, session, risk per trade, invalidation, and when you stop for the day. If it cannot be followed on a bad Tuesday, it is a mood board.",
          "Write it short enough to read before the open. Long documents get ignored; short rules get used.",
        ],
      },
      {
        id: "pieces",
        title: "The pieces that actually matter",
        paragraphs: [
          "Markets and session. Setup definition — what must be true before you look for an order. Risk cap per trade and per day. Review habit: screenshot, reason, result.",
          "Skip the motivational paragraph. Include the boring one: what you do after two losses. That is where plans die.",
        ],
      },
      {
        id: "use",
        title: "Putting it into practice",
        paragraphs: [
          "Run the plan for a fixed sample — twenty trades, not two days. Change one rule at a time. If you change three, you will not know which one helped.",
        ],
      },
    ],
    {
      doDont: {
        do: "Write the stop, the size and the daily cap before the session.",
        dont: "Invent a new setup the moment the plan feels slow.",
      },
      figure: {
        src: `${BLOG_ASSET}/risk-management-chess.png`,
        alt: "Chess pieces standing in for planned decisions rather than impulse",
      },
    },
  ),
  "understanding-leverage-and-margin": guide(
    [
      {
        id: "words",
        title: "Leverage and margin in plain words",
        paragraphs: [
          "Margin is the deposit the broker sets aside to keep the position open. Leverage is how large that position is relative to the deposit. They are two views of the same lever.",
          "Free margin is what is left if price goes against you. When it hits the stop-out level, the platform starts closing trades. That is not a conspiracy. It is the contract you clicked.",
        ],
      },
      {
        id: "use",
        title: "Using it without drama",
        paragraphs: [
          "You do not have to use the maximum the account offers. A 1:500 account can still be traded at a fraction of that. The useful number is still “how much cash do I lose if the stop hits”.",
          "Leave room for spread and a spike. A stop that sits exactly on the last wick will get tagged more often than your backtest suggested.",
        ],
      },
      {
        id: "manage",
        title: "Managing it",
        paragraphs: [
          "If one position uses most of your margin, you do not have a portfolio — you have a bet. Split size or skip the extra order. Margin is for staying in the idea, not for collecting tickets.",
        ],
      },
    ],
    {
      doDont: {
        do: "Treat max leverage as a ceiling the account allows, not a target.",
        dont: "Open a second lot because “there is still margin left”.",
      },
      figure: {
        src: `${BLOG_ASSET}/risk-management-chess.png`,
        alt: "Risk decisions sitting behind a leveraged position",
      },
    },
  ),
  "mt5-order-types-explained": guide(
    [
      {
        id: "market",
        title: "Market orders",
        paragraphs: [
          "A market order says fill me now at whatever the bid or ask is. Use it when being in is more important than a tick. In a quiet pair that is cheap. In gold during data it is a different cost.",
        ],
      },
      {
        id: "pending",
        title: "Pending orders",
        paragraphs: [
          "Buy limit and sell limit wait for price to come to you. Buy stop and sell stop wait for price to go through a level. The names are less important than the intent: are you fading a level or buying a break?",
          "Stops and limits can be attached to the order so the invalidation is in the ticket, not in your memory.",
        ],
      },
      {
        id: "when",
        title: "When not to use them",
        paragraphs: [
          "A pending order left overnight in a thin market is a gift to the gap. If you cannot manage it, cancel it. An old limit sitting in the book is not a plan — it is a forgotten one.",
        ],
      },
    ],
    {
      doDont: {
        do: "Put the stop in the order ticket when you place it.",
        dont: "Leave stale pendings working because you might “need them later”.",
      },
      figure: {
        src: `${BLOG_ASSET}/featured-mt5-timeframes.png`,
        alt: "MT5 chart where order type should match the setup",
      },
    },
  ),
  "what-moves-the-us-dollar": guide(
    [
      {
        id: "rates",
        title: "Rates first",
        paragraphs: [
          "The dollar often follows the path of US rates — not the last print, the expected path. A hot CPI number that the market already owned can sell the dollar. A soft one that kills a cut can bid it.",
        ],
      },
      {
        id: "data",
        title: "Data and risk appetite",
        paragraphs: [
          "Payrolls, inflation, and Fed speak are the usual suspects. Equities and credit matter too: when risk is dumped, the dollar can still bid as a funding currency even if the data that week was dull.",
          "Watch the calendar. Trading USD pairs into a red-folder release without a plan for spread is optional pain.",
        ],
      },
      {
        id: "pairs",
        title: "It still takes two",
        paragraphs: [
          "USDJPY is not the same trade as EURUSD. The other currency has a central bank too. If you only have a dollar view, you do not yet have a pair view.",
        ],
      },
    ],
    {
      doDont: {
        do: "Ask what the other currency is doing before you call a dollar trade.",
        dont: "Buy every USD pair because one headline was “hawkish”.",
      },
      figure: {
        src: `${BLOG_ASSET}/trading-sessions-globe.png`,
        alt: "Global session map behind dollar flows",
      },
    },
  ),
  "how-to-size-a-position": guide(
    [
      {
        id: "cash",
        title: "Start from cash, not lots",
        paragraphs: [
          "Decide the money you will lose if the stop is hit. Then measure the distance from entry to stop in pips or points. Lot size is the number that makes those two match.",
          "If that lot looks “too small”, the stop is wide or the account is small. Both are information. Neither is a reason to up the size.",
        ],
      },
      {
        id: "math",
        title: "A simple framework",
        paragraphs: [
          "Risk amount ÷ (stop distance × value per pip per lot) = lots. MT5’s calculator and a notebook both work. What does not work is rounding up because a micro lot feels unserious.",
        ],
      },
      {
        id: "repeat",
        title: "Keep it boring",
        paragraphs: [
          "Same fraction, every trade, until you have a sample. Varying size with confidence is how a good month hides three oversized losses.",
        ],
      },
    ],
    {
      doDont: {
        do: "Fix the cash risk, then solve for lots.",
        dont: "Choose 0.10 lots because that is what you traded yesterday.",
      },
      figure: {
        src: `${BLOG_ASSET}/leverage-margin-architecture.png`,
        alt: "Structure standing in for a measured position size",
      },
    },
  ),
  "reading-the-economic-calendar": guide(
    [
      {
        id: "scan",
        title: "Scan the week, not the minute",
        paragraphs: [
          "Sunday or Monday, mark the red-folder events that hit your pairs. You do not need every speech. You need the prints that move the currency you actually trade.",
          "If two central banks speak on the same day, the pair can whip without a clean direction. That is a size-down day, not a challenge.",
        ],
      },
      {
        id: "trade",
        title: "Trading around the number",
        paragraphs: [
          "Some traders stand aside a few minutes either side. Some fade the first spike. Both are processes only if you wrote them down. “I’ll see how it looks” is not a process.",
          "Spread will widen. Stops that were fine at 10am can fill at a worse price at 13:30. Build that into the size or stay out.",
        ],
      },
      {
        id: "matter",
        title: "What actually matters",
        paragraphs: [
          "The surprise versus consensus, and whether it changes the rate path. A beat that the market already priced is decoration. A miss that kills a cut is a trade.",
        ],
      },
    ],
    {
      doDont: {
        do: "Know the week’s red folders before Monday’s first order.",
        dont: "Discover CPI because the spread just tripled.",
      },
      figure: {
        src: `${BLOG_ASSET}/currency-symbols.png`,
        alt: "Currencies that reprice when the calendar hits",
      },
    },
  ),
  "support-and-resistance-basics": guide(
    [
      {
        id: "mark",
        title: "How to mark a level",
        paragraphs: [
          "Use places price has turned more than once — swing highs, swing lows, obvious round numbers if they actually reacted. A line with one touch is a guess. A zone with several is a level.",
          "Draw it as a zone if wicks cluster. A single-pixel line will make you feel precise and then stop you out for a tick.",
        ],
      },
      {
        id: "hold",
        title: "Why they hold or break",
        paragraphs: [
          "They hold when enough orders still sit there. They break when those orders are gone or overwhelmed. You will not see the book. You will see the close. A wick through and a close back is not the same as a close through.",
        ],
      },
      {
        id: "story",
        title: "Do not force a story",
        paragraphs: [
          "If you need three extra lines to make the chart look “respected”, you are decorating. Fewer levels, clearer decisions. Delete the ones you are not willing to trade.",
        ],
      },
    ],
    {
      doDont: {
        do: "Wait for a close relative to the zone, not just a wick.",
        dont: "Draw a new line after every candle so the story never fails.",
      },
      figure: {
        src: `${BLOG_ASSET}/featured-mt5-timeframes.png`,
        alt: "Chart with structure that can be marked as support or resistance",
      },
    },
  ),
  "keeping-a-trading-journal": guide(
    [
      {
        id: "record",
        title: "What to record",
        paragraphs: [
          "Screenshot, pair, session, setup name, size, stop, reason, and what you felt if it changed the decision. Result is last. Result without context teaches you nothing except whether you got paid.",
        ],
      },
      {
        id: "review",
        title: "Review the decision",
        paragraphs: [
          "A winning trade that broke the plan is not a good trade. A losing trade that followed it is not a reason to throw the plan. The journal is how you keep those two from swapping places in your memory.",
        ],
      },
      {
        id: "habit",
        title: "Keep it light enough to use",
        paragraphs: [
          "Five fields you always fill beat a beautiful spreadsheet you abandon in week two. If you will not do it after a loss, shorten it until you will.",
        ],
      },
    ],
    {
      doDont: {
        do: "Log the reason before you know the outcome, or immediately after.",
        dont: "Only journal winners so the file stays encouraging.",
      },
      figure: {
        src: `${BLOG_ASSET}/risk-management-chess.png`,
        alt: "Deliberate decisions that belong in a journal",
      },
    },
  ),
  "customising-mt5-charts": guide(
    [
      {
        id: "colour",
        title: "Colour that you can sit with",
        paragraphs: [
          "Pick bull and bear colours you will not fight at 2am. High contrast on the body, quieter grid. If the background is shouting, the candle is not.",
        ],
      },
      {
        id: "templates",
        title: "Templates and layouts",
        paragraphs: [
          "Save a template for execution and a separate one for review. Layouts remember which symbols sit where. That is how you stop rebuilding the desk every morning.",
        ],
      },
      {
        id: "noise",
        title: "Remove noise",
        paragraphs: [
          "If an object is not in the plan, it is decoration. Delete old trendlines. The next session does not need last month’s doodles.",
        ],
      },
    ],
    {
      doDont: {
        do: "Save one clean template and open it on purpose.",
        dont: "Keep every drawing because it might become support later.",
      },
      figure: {
        src: `${BLOG_ASSET}/mt5-indicators-workstation.png`,
        alt: "MT5 charts after a cleaner layout",
      },
    },
  ),
  "trading-the-london-new-york-overlap": guide(
    [
      {
        id: "why",
        title: "Why this window is busy",
        paragraphs: [
          "London is still open and New York is coming in. Dollar pairs, gold and index CFDs often put in a large share of the day’s range here. Spreads are usually at their most competitive.",
        ],
      },
      {
        id: "plan",
        title: "Plan around it",
        paragraphs: [
          "If you trade this window, your stop and size should assume a faster tape. A range from Asia can break in the first hour of overlap. That is a feature if you planned for it, a surprise if you did not.",
        ],
      },
      {
        id: "after",
        title: "After the overlap",
        paragraphs: [
          "Liquidity thins into the US afternoon. Chasing the last hour as if it were 14:00 London is how good mornings become messy closes.",
        ],
      },
    ],
    {
      doDont: {
        do: "Treat overlap as a scheduled session with its own size.",
        dont: "Leave an Asian scale-in working into the New York open unattended.",
      },
      figure: {
        src: `${BLOG_ASSET}/currency-symbols.png`,
        alt: "Dollar pairs that often wake up in the overlap",
      },
    },
  ),
  "majors-vs-exotics": guide(
    [
      {
        id: "spread",
        title: "Spread and liquidity",
        paragraphs: [
          "Majors usually cost less to enter and exit. Exotics pay you with range and charge you with spread, slippage and the occasional gap. Run the cost against your stop before you call the exotic “more opportunity”.",
        ],
      },
      {
        id: "session",
        title: "Session behaviour",
        paragraphs: [
          "A major can be quiet in Asia and violent in London. An exotic can be quiet until its local print, then untradeable. Know which clock the pair belongs to.",
        ],
      },
      {
        id: "choice",
        title: "How to choose",
        paragraphs: [
          "If your edge is a 12-pip pattern, it probably lives on a major. If you cannot explain why the exotic should move in your session, you are collecting pairs, not trading them.",
        ],
      },
    ],
    {
      doDont: {
        do: "Compare cost-to-stop, not just how “big” the candles look.",
        dont: "Add an exotic to feel more advanced.",
      },
      figure: {
        src: `${BLOG_ASSET}/trading-sessions-globe.png`,
        alt: "Session map behind the choice of major or exotic",
      },
    },
  ),
  "stop-losses-that-make-sense": guide(
    [
      {
        id: "where",
        title: "Where the idea is wrong",
        paragraphs: [
          "The stop goes where the reason for the trade stops being true — beyond the swing, out of the range, through the level you said mattered. A round number is only useful if structure lives there too.",
        ],
      },
      {
        id: "vol",
        title: "Respect volatility",
        paragraphs: [
          "ATR or a look at recent range will tell you if a 10-pip stop is a wish. If the market has been printing 40-pip noise, a 12-pip stop is not discipline. It is a donation.",
        ],
      },
      {
        id: "after",
        title: "After you are in",
        paragraphs: [
          "Moving a stop further away because you “need room” is a new trade. Closing because the idea is dead is the original trade. Know which one you are doing.",
        ],
      },
    ],
    {
      doDont: {
        do: "Place the stop from structure, then size to it.",
        dont: "Park it at a round number because it looks tidy.",
      },
      figure: {
        src: `${BLOG_ASSET}/candlestick-market-display.png`,
        alt: "Candles showing why a stop belongs beyond structure",
      },
    },
  ),
  "why-gold-moves-with-the-dollar": guide(
    [
      {
        id: "inverse",
        title: "The usual inverse",
        paragraphs: [
          "Gold is quoted in dollars. A stronger dollar makes gold more expensive for other-currency buyers and often weighs on the metal. A weaker dollar does the opposite. That is the textbook overlay you will see on most desks.",
        ],
      },
      {
        id: "when",
        title: "When it decouples",
        paragraphs: [
          "Real rates, geopolitical bids, and ETF flows can shove gold while the dollar does something else. Both can rally if the story is “policy error” or “I need a hedge and cash”. The overlay is a default, not a law.",
        ],
      },
      {
        id: "trade",
        title: "Trading the relationship",
        paragraphs: [
          "If your gold idea is only “dollar down”, you already have a EURUSD or DXY view. Make sure gold is adding something — rates, positioning, a level — or just trade the dollar pair.",
        ],
      },
    ],
    {
      doDont: {
        do: "Check dollar and yields before you assume gold must follow.",
        dont: "Force an inverse on a day when both are being bid as hedges.",
      },
      figure: {
        src: `${BLOG_ASSET}/currency-symbols.png`,
        alt: "Dollar symbols sitting behind a gold price",
      },
    },
  ),
  "reviewing-trades-without-hindsight": guide(
    [
      {
        id: "then",
        title: "Judge the information you had",
        paragraphs: [
          "The candle after your exit is not part of the decision. Hide it. Read the chart as it looked when you clicked. If the plan said leave, leaving was correct even if the next bar would have paid you.",
        ],
      },
      {
        id: "process",
        title: "A simple review",
        paragraphs: [
          "Was the setup present? Was the size the planned size? Did you move the stop for a reason that was in the plan? Three yes/no questions beat a novel about how you feel.",
        ],
      },
      {
        id: "next",
        title: "What you change",
        paragraphs: [
          "Change a rule only when the sample says the rule is the problem. One painful winner you missed is not a sample. It is bait.",
        ],
      },
    ],
    {
      doDont: {
        do: "Review from the screenshot you took at the time, not from the live chart.",
        dont: "Rewrite the story because the next candle would have been better.",
      },
      figure: {
        src: `${BLOG_ASSET}/trading-plan.png`,
        alt: "A notebook used to review the decision rather than the outcome",
      },
    },
  ),
};

export function getArticleBody(slug: string) {
  return BLOG_BODIES[slug];
}
