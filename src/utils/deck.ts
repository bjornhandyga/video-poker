import type { PlayingCard, Rank, Suit } from "../types/cards";

const SUITS: Suit[] = ["clubs", "diamonds", "hearts", "spades"];

const RANKS: Rank[] = [
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

/**
 * Lager en komplett kortstokk med 52 unike kort.
 * @returns Array med alle kort i standard rekkefølge før stokking.
 */
export function createDeck(): PlayingCard[] {
  const deck: PlayingCard[] = [];
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({ suit, rank, id: `${rank}-${suit}` });
    }
  }
  return deck;
}

/**
 * Stokker kortstokken tilfeldig (fisher yates tror jeg det heter).
 * @param deck Kortstokken som skal stokkes.
 * @returns Ny array med samme kort i tilfeldig rekkefølge.
 */
export function shuffleDeck(deck: PlayingCard[]): PlayingCard[] {
  const copy = [...deck];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Trekker et antall kort fra toppen av stokken.
 * @param deck Gjenværende kort i stokken.
 * @param count Antall kort som skal trekkes.
 * @returns Objekt med trukne kort og resten av stokken.
 */
export function drawCards(
  deck: PlayingCard[],
  count: number,
): { drawn: PlayingCard[]; remaining: PlayingCard[] } {
  const drawn = deck.slice(0, count);
  const remaining = deck.slice(count);
  return { drawn, remaining };
}
