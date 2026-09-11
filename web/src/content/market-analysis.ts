export type AnalysisPair = "XAUUSD" | "GBPJPY";

export type AnalysisPost = {
  id: string;
  pair: AnalysisPair;
  title: string;
  href: string;
  author: string;
  published: string;
};

export const ANALYSIS_AUTHOR = "Salim Yakoubene";

export const MARKET_ANALYSIS_POSTS: readonly AnalysisPost[] = [
  {
    id: "xauusd-2026-09-11",
    pair: "XAUUSD",
    title: "XAUUSD Technical Analysis 11th September 2026 1h chart",
    href: "https://www.dominionmarkets.com/marketanalysis/2026/09/10/xauusd-technical-analysis-11th-september-2026-1h-chart/",
    author: ANALYSIS_AUTHOR,
    published: "10 September 2026",
  },
  {
    id: "gbpjpy-2026-09-11",
    pair: "GBPJPY",
    title: "GBPJPY Technical Analysis 11th September 2026 1h chart",
    href: "https://www.dominionmarkets.com/marketanalysis/2026/09/10/gbpjpy-technical-analysis-11th-september-2026-1h-chart/",
    author: ANALYSIS_AUTHOR,
    published: "10 September 2026",
  },
  {
    id: "xauusd-2026-09-10",
    pair: "XAUUSD",
    title: "XAUUSD Technical Analysis 10th September 2026 1h chart",
    href: "https://www.dominionmarkets.com/marketanalysis/2026/09/09/xauusd-technical-analysis-10th-september-2026-1h-chart/",
    author: ANALYSIS_AUTHOR,
    published: "9 September 2026",
  },
  {
    id: "gbpjpy-2026-09-10",
    pair: "GBPJPY",
    title: "GBPJPY Technical Analysis 10th September 2026 1h chart",
    href: "https://www.dominionmarkets.com/marketanalysis/2026/09/09/gbpjpy-technical-analysis-10th-september-2026-1h-chart/",
    author: ANALYSIS_AUTHOR,
    published: "9 September 2026",
  },
  {
    id: "xauusd-2026-09-09",
    pair: "XAUUSD",
    title: "XAUUSD Technical Analysis 9th September 2026 1h chart",
    href: "https://www.dominionmarkets.com/marketanalysis/2026/09/08/xauusd-technical-analysis-9th-september-2026-1h-chart/",
    author: ANALYSIS_AUTHOR,
    published: "8 September 2026",
  },
  {
    id: "gbpjpy-2026-09-09",
    pair: "GBPJPY",
    title: "GBPJPY Technical Analysis 9th September 2026 1h chart",
    href: "https://www.dominionmarkets.com/marketanalysis/2026/09/08/gbpjpy-technical-analysis-9th-september-2026-1h-chart/",
    author: ANALYSIS_AUTHOR,
    published: "8 September 2026",
  },
  {
    id: "xauusd-2026-09-08",
    pair: "XAUUSD",
    title: "XAUUSD Technical Analysis 8th September 2026 1h chart",
    href: "https://www.dominionmarkets.com/marketanalysis/2026/09/07/xauusd-technical-analysis-8th-september-2026-1h-chart/",
    author: ANALYSIS_AUTHOR,
    published: "7 September 2026",
  },
  {
    id: "gbpjpy-2026-09-08",
    pair: "GBPJPY",
    title: "GBPJPY Technical Analysis 8th September 2026 1h chart",
    href: "https://www.dominionmarkets.com/marketanalysis/2026/09/07/gbpjpy-technical-analysis-8th-september-2026-1h-chart/",
    author: ANALYSIS_AUTHOR,
    published: "7 September 2026",
  },
  {
    id: "xauusd-2026-09-07",
    pair: "XAUUSD",
    title: "XAUUSD Technical Analysis 7th September 2026 1h chart",
    href: "https://www.dominionmarkets.com/marketanalysis/2026/09/06/xauusd-technical-analysis-7th-september-2026-1h-chart/",
    author: ANALYSIS_AUTHOR,
    published: "6 September 2026",
  },
  {
    id: "gbpjpy-2026-09-07",
    pair: "GBPJPY",
    title: "GBPJPY Technical Analysis 7th September 2026 1h chart",
    href: "https://www.dominionmarkets.com/marketanalysis/2026/09/06/gbpjpy-technical-analysis-7th-september-2026-1h-chart/",
    author: ANALYSIS_AUTHOR,
    published: "6 September 2026",
  },
  {
    id: "xauusd-2026-09-04",
    pair: "XAUUSD",
    title: "XAUUSD Technical Analysis 4th September 2026 1h chart",
    href: "https://www.dominionmarkets.com/marketanalysis/2026/09/03/xauusd-technical-analysis-4th-september-2026-1h-chart/",
    author: ANALYSIS_AUTHOR,
    published: "3 September 2026",
  },
  {
    id: "gbpjpy-2026-09-04",
    pair: "GBPJPY",
    title: "GBPJPY Technical Analysis 4th September 2026 1h chart",
    href: "https://www.dominionmarkets.com/marketanalysis/2026/09/03/gbpjpy-technical-analysis-4th-september-2026-1h-chart/",
    author: ANALYSIS_AUTHOR,
    published: "3 September 2026",
  },
];

export type AnalysisArchive = {
  label: string;
  href: string;
};

export const MARKET_ANALYSIS_ARCHIVES: readonly AnalysisArchive[] = [
  { label: "September 2026", href: "https://www.dominionmarkets.com/marketanalysis/2026/09/" },
  { label: "August 2026", href: "https://www.dominionmarkets.com/marketanalysis/2026/08/" },
  { label: "July 2026", href: "https://www.dominionmarkets.com/marketanalysis/2026/07/" },
  { label: "June 2026", href: "https://www.dominionmarkets.com/marketanalysis/2026/06/" },
  { label: "May 2026", href: "https://www.dominionmarkets.com/marketanalysis/2026/05/" },
  { label: "April 2026", href: "https://www.dominionmarkets.com/marketanalysis/2026/04/" },
  { label: "March 2026", href: "https://www.dominionmarkets.com/marketanalysis/2026/03/" },
  { label: "February 2026", href: "https://www.dominionmarkets.com/marketanalysis/2026/02/" },
  { label: "January 2026", href: "https://www.dominionmarkets.com/marketanalysis/2026/01/" },
  { label: "December 2025", href: "https://www.dominionmarkets.com/marketanalysis/2025/12/" },
  { label: "November 2025", href: "https://www.dominionmarkets.com/marketanalysis/2025/11/" },
  { label: "October 2025", href: "https://www.dominionmarkets.com/marketanalysis/2025/10/" },
  { label: "September 2025", href: "https://www.dominionmarkets.com/marketanalysis/2025/09/" },
  { label: "August 2025", href: "https://www.dominionmarkets.com/marketanalysis/2025/08/" },
  { label: "July 2025", href: "https://www.dominionmarkets.com/marketanalysis/2025/07/" },
  { label: "June 2025", href: "https://www.dominionmarkets.com/marketanalysis/2025/06/" },
  { label: "May 2025", href: "https://www.dominionmarkets.com/marketanalysis/2025/05/" },
  { label: "April 2025", href: "https://www.dominionmarkets.com/marketanalysis/2025/04/" },
  { label: "March 2025", href: "https://www.dominionmarkets.com/marketanalysis/2025/03/" },
  { label: "February 2025", href: "https://www.dominionmarkets.com/marketanalysis/2025/02/" },
  { label: "January 2025", href: "https://www.dominionmarkets.com/marketanalysis/2025/01/" },
  { label: "December 2024", href: "https://www.dominionmarkets.com/marketanalysis/2024/12/" },
  { label: "November 2024", href: "https://www.dominionmarkets.com/marketanalysis/2024/11/" },
  { label: "October 2024", href: "https://www.dominionmarkets.com/marketanalysis/2024/10/" },
  { label: "September 2024", href: "https://www.dominionmarkets.com/marketanalysis/2024/09/" },
  { label: "August 2024", href: "https://www.dominionmarkets.com/marketanalysis/2024/08/" },
  { label: "July 2024", href: "https://www.dominionmarkets.com/marketanalysis/2024/07/" },
  { label: "June 2024", href: "https://www.dominionmarkets.com/marketanalysis/2024/06/" },
  { label: "May 2024", href: "https://www.dominionmarkets.com/marketanalysis/2024/05/" },
  { label: "April 2024", href: "https://www.dominionmarkets.com/marketanalysis/2024/04/" },
  { label: "March 2024", href: "https://www.dominionmarkets.com/marketanalysis/2024/03/" },
  { label: "February 2024", href: "https://www.dominionmarkets.com/marketanalysis/2024/02/" },
  { label: "January 2024", href: "https://www.dominionmarkets.com/marketanalysis/2024/01/" },
  { label: "December 2023", href: "https://www.dominionmarkets.com/marketanalysis/2023/12/" },
  { label: "November 2023", href: "https://www.dominionmarkets.com/marketanalysis/2023/11/" },
  { label: "October 2023", href: "https://www.dominionmarkets.com/marketanalysis/2023/10/" },
  { label: "September 2023", href: "https://www.dominionmarkets.com/marketanalysis/2023/09/" },
  { label: "August 2023", href: "https://www.dominionmarkets.com/marketanalysis/2023/08/" },
  { label: "July 2023", href: "https://www.dominionmarkets.com/marketanalysis/2023/07/" },
  { label: "June 2023", href: "https://www.dominionmarkets.com/marketanalysis/2023/06/" },
  { label: "May 2023", href: "https://www.dominionmarkets.com/marketanalysis/2023/05/" },
  { label: "April 2023", href: "https://www.dominionmarkets.com/marketanalysis/2023/04/" },
  { label: "March 2023", href: "https://www.dominionmarkets.com/marketanalysis/2023/03/" },
  { label: "February 2023", href: "https://www.dominionmarkets.com/marketanalysis/2023/02/" },
  { label: "January 2023", href: "https://www.dominionmarkets.com/marketanalysis/2023/01/" },
  { label: "December 2022", href: "https://www.dominionmarkets.com/marketanalysis/2022/12/" },
  { label: "November 2022", href: "https://www.dominionmarkets.com/marketanalysis/2022/11/" },
  { label: "October 2022", href: "https://www.dominionmarkets.com/marketanalysis/2022/10/" },
  { label: "September 2022", href: "https://www.dominionmarkets.com/marketanalysis/2022/09/" },
  { label: "August 2022", href: "https://www.dominionmarkets.com/marketanalysis/2022/08/" },
  { label: "July 2022", href: "https://www.dominionmarkets.com/marketanalysis/2022/07/" },
  { label: "June 2022", href: "https://www.dominionmarkets.com/marketanalysis/2022/06/" },
  { label: "May 2022", href: "https://www.dominionmarkets.com/marketanalysis/2022/05/" },
  { label: "April 2022", href: "https://www.dominionmarkets.com/marketanalysis/2022/04/" },
  { label: "March 2022", href: "https://www.dominionmarkets.com/marketanalysis/2022/03/" },
  { label: "February 2022", href: "https://www.dominionmarkets.com/marketanalysis/2022/02/" },
  { label: "January 2022", href: "https://www.dominionmarkets.com/marketanalysis/2022/01/" },
  { label: "December 2021", href: "https://www.dominionmarkets.com/marketanalysis/2021/12/" },
  { label: "November 2021", href: "https://www.dominionmarkets.com/marketanalysis/2021/11/" },
];

/** First visible block ends at August 2024; older months sit behind Load more. */
const archivePreviewIndex = MARKET_ANALYSIS_ARCHIVES.findIndex((month) =>
  month.href.endsWith("/2024/08/"),
);
export const MARKET_ANALYSIS_ARCHIVE_PREVIEW =
  archivePreviewIndex >= 0 ? archivePreviewIndex + 1 : 26;
