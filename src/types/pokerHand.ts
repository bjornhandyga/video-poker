/** Alle pokerhender som gir utbetaling i Jacks or Better-varianten. */
export type PokerHand =
  | "high_card"
  | "jacks_or_better"
  | "two_pair"
  | "three_of_a_kind"
  | "straight"
  | "flush"
  | "full_house"
  | "four_of_a_kind"
  | "straight_flush"
  | "royal_flush";

/** Lesbare norske navn på hender for visning i grensesnittet. */
export const POKER_HAND_LABELS: Record<PokerHand, string> = {
  high_card: "Høyt kort",
  jacks_or_better: "Par i knekt eller bedre",
  two_pair: "To par",
  three_of_a_kind: "Tre like",
  straight: "Straight",
  flush: "Flush",
  full_house: "Fullt hus",
  four_of_a_kind: "Fire like",
  straight_flush: "Straight flush",
  royal_flush: "Royal flush",
};
