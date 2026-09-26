import type { PokerHand } from "./pokerHand";

/** Enkle tall per spiller, lagres sammen med Player i store. */
export type PlayerStats = {
  roundsPlayed: number;
  totalCoinsWon: number;
  bestPayout: number;
  bestHand: PokerHand | null;
};

/** Spiller som identifiseres med navn og eier mynter. */
export type Player = {
  id: string;
  name: string;
  coins: number;
  stats: PlayerStats;
};
