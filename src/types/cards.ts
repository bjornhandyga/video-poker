/** Fargene i en standard kortstokk. */
export type Suit = "clubs" | "diamonds" | "hearts" | "spades";

/** Verdier fra 2 til ess. */
export type Rank =
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "J"
  | "Q"
  | "K"
  | "A";

/** Representerer ett spillkort med farge og verdi. */
export type PlayingCard = {
  suit: Suit;
  rank: Rank;
  id: string;
};
