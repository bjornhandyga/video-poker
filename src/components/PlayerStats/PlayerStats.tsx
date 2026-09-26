import type { PlayerStats as PlayerStatsType } from "../../types/player";
import { POKER_HAND_LABELS } from "../../types/pokerHand";
import "./PlayerStats.css";

type PlayerStatsProps = {
  stats: PlayerStatsType;
};

/** Viser enkel statistikk for valgt spiller. */
export function PlayerStats({ stats }: PlayerStatsProps) {
  if (stats.roundsPlayed === 0) {
    return (
      <p className="player-stats player-stats--empty">
        Ingen fullførte runder ennå.
      </p>
    );
  }

  return (
    <dl className="player-stats">
      <div className="player-stats__row">
        <dt>Runder spilt</dt>
        <dd>{stats.roundsPlayed}</dd>
      </div>
      <div className="player-stats__row">
        <dt>Totalt vunnet</dt>
        <dd>{stats.totalCoinsWon} mynter</dd>
      </div>
      <div className="player-stats__row">
        <dt>Beste gevinst</dt>
        <dd>{stats.bestPayout} mynter</dd>
      </div>
      <div className="player-stats__row">
        <dt>Beste hånd</dt>
        <dd>
          {stats.bestHand
            ? POKER_HAND_LABELS[stats.bestHand]
            : "—"}
        </dd>
      </div>
    </dl>
  );
}
