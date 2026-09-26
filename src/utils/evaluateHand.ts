import type { PlayingCard, Rank } from "../types/cards";
import type { PokerHand } from "../types/pokerHand";

const RANK_ORDER: Rank[] = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

/** Numerisk verdi for sortering og straight-sjekk (ess = 14). */
function rankValue(rank: Rank): number {
  return RANK_ORDER.indexOf(rank) + 2;
}

function isFlush(cards: PlayingCard[]): boolean {
  const suit = cards[0].suit;
  return cards.every((card) => card.suit === suit);
}

/** Sjekker straight inkludert wheel (A-2-3-4-5). */
function isStraight(cards: PlayingCard[]): boolean {
  const values = cards.map((c) => rankValue(c.rank)).sort((a, b) => a - b);
  const unique = [...new Set(values)];
  if (unique.length !== 5) return false;

  const isWheel =
    unique[0] === 2 &&
    unique[1] === 3 &&
    unique[2] === 4 &&
    unique[3] === 5 &&
    unique[4] === 14;
  if (isWheel) return true;

  for (let i = 1; i < unique.length; i += 1) {
    if (unique[i] - unique[i - 1] !== 1) return false;
  }
  return true;
}

function rankCounts(cards: PlayingCard[]): Map<Rank, number> {
  const counts = new Map<Rank, number>();
  for (const card of cards) {
    counts.set(card.rank, (counts.get(card.rank) ?? 0) + 1);
  }
  return counts;
}

function isRoyal(cards: PlayingCard[]): boolean {
  const values = new Set(cards.map((c) => c.rank));
  return ["10", "J", "Q", "K", "A"].every((r) => values.has(r as Rank));
}

function isJacksOrBetter(counts: Map<Rank, number>): boolean {
  for (const [rank, count] of counts) {
    if (count === 2 && rankValue(rank) >= 11) return true;
  }
  return false;
}

/**
 * Finner den beste pokerhånden for nøyaktig fem kort.
 * @param cards Fem kort på hånda.
 * @returns PokerHand-type som beskriver resultatet.
 */
export function evaluateHand(cards: PlayingCard[]): PokerHand {
  if (cards.length !== 5) {
    return "high_card";
  }

  const flush = isFlush(cards);
  const straight = isStraight(cards);
  const counts = rankCounts(cards);
  const countValues = [...counts.values()].sort((a, b) => b - a);

  if (flush && straight) {
    if (isRoyal(cards)) return "royal_flush";
    return "straight_flush";
  }

  if (countValues[0] === 4) return "four_of_a_kind";
  if (countValues[0] === 3 && countValues[1] === 2) return "full_house";
  if (flush) return "flush";
  if (straight) return "straight";
  if (countValues[0] === 3) return "three_of_a_kind";
  if (countValues[0] === 2 && countValues[1] === 2) return "two_pair";
  if (isJacksOrBetter(counts)) return "jacks_or_better";

  return "high_card";
}
