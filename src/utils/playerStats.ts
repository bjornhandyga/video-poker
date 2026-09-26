import type { Player, PlayerStats } from "../types/player";
import type { PokerHand } from "../types/pokerHand";
import { PAYOUT_MULTIPLIERS } from "./payouts";

/** Tom statistikk for nye spillere. */
export function createDefaultStats(): PlayerStats {
  return {
    roundsPlayed: 0,
    totalCoinsWon: 0,
    bestPayout: 0,
    bestHand: null,
  };
}

function handScore(hand: PokerHand): number {
  return PAYOUT_MULTIPLIERS[hand];
}

/**
 * Oppdaterer statistikk etter en fullført runde.
 * @param stats Eksisterende stats for spilleren.
 * @param hand Evaluert hånd etter bytte.
 * @param payout Mynter utbetalt denne runden.
 */
export function statsAfterRound(
  stats: PlayerStats,
  hand: PokerHand,
  payout: number,
): PlayerStats {
  const next: PlayerStats = {
    roundsPlayed: stats.roundsPlayed + 1,
    totalCoinsWon: stats.totalCoinsWon + payout,
    bestPayout: Math.max(stats.bestPayout, payout),
    bestHand: stats.bestHand,
  };

  if (
    !next.bestHand ||
    handScore(hand) > handScore(next.bestHand) ||
    (handScore(hand) === handScore(next.bestHand) && payout > stats.bestPayout)
  ) {
    next.bestHand = hand;
  }

  return next;
}

/** Slår sammen gammel spillerdata uten stats (fra tidligere localStorage). */
export function normalizePlayer(player: Player & { stats?: PlayerStats }): Player {
  return {
    ...player,
    stats: player.stats ?? createDefaultStats(),
  };
}
