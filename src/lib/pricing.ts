// Prices are shown as points and cash together. Each item has its own points → cash rate:
// real storefront catalogue items are 1 point = SAR 1; the original sample items are 10 points = SAR 1.
export const STOREFRONT_RATE = 1;
export const SAMPLE_RATE = 0.1;

const round2 = (n: number) => Math.round(n * 100) / 100;

export const cashOf = (points: number, rate: number = SAMPLE_RATE) => round2(points * rate);

export const fmtPts = (points: number) => `${points.toLocaleString()} pts`;

export const fmtCash = (cash: number) =>
  `SAR ${cash.toLocaleString("en-US", { minimumFractionDigits: Number.isInteger(cash) ? 0 : 2, maximumFractionDigits: 2 })}`;

/** "782 pts · SAR 782" */
export const priceText = (points: number, rate: number = SAMPLE_RATE) => `${fmtPts(points)} · ${fmtCash(cashOf(points, rate))}`;

export type PaymentMode = "points" | "cash" | "split";
export type PaymentResult = { mode: PaymentMode; pointsUsed: number; cashPaid: number };

/** One-line description of how an order was paid, e.g. "400 pts + SAR 382". */
export const paidText = (r: PaymentResult) =>
  r.mode === "points" ? fmtPts(r.pointsUsed) : r.mode === "cash" ? fmtCash(r.cashPaid) : `${fmtPts(r.pointsUsed)} + ${fmtCash(r.cashPaid)}`;
