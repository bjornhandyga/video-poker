import type { PokerHand } from "../types/pokerHand";

/** Utbetaling per mynt for hver hånd (Jacks or Better). */
export const PAYOUT_MULTIPLIERS: Record<PokerHand, number> = {
  high_card: 0,
  jacks_or_better: 1,
  two_pair: 2,
  three_of_a_kind: 3,
  straight: 4,
  flush: 6,
  full_house: 9,
  four_of_a_kind: 25,
  straight_flush: 50,
  royal_flush: 250,
};

/**
 * Beregner gevinst basert på hånd og innsats.
 * @param hand Evaluert pokerhånd.
 * @param bet Antall mynter satset i runden.
 * @returns Totalt antall mynter som utbetales.
 */
export function calculatePayout(hand: PokerHand, bet: number): number {
  return PAYOUT_MULTIPLIERS[hand] * bet;
}

/** Rader til utbetalingstabellen, sortert fra høyest til lavest gevinst. */
export const PAYOUT_TABLE_ROWS: { hand: PokerHand; multiplier: number }[] = (
  Object.entries(PAYOUT_MULTIPLIERS) as [PokerHand, number][]
)
  .filter(([, multiplier]) => multiplier > 0)
  .sort((a, b) => b[1] - a[1])
  .map(([hand, multiplier]) => ({ hand, multiplier }));
