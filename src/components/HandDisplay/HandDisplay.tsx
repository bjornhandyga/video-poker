import type { PokerHand } from "../../types/pokerHand";
import { POKER_HAND_LABELS } from "../../types/pokerHand";
import "./HandDisplay.css";

type HandDisplayProps = {
  hand: PokerHand | null;
  payout?: number;
  celebrate?: boolean;
};

/** Viser evaluert pokerhånd og eventuell gevinst. */
export function HandDisplay({ hand, payout = 0, celebrate = false }: HandDisplayProps) {
  if (!hand) {
    return (
      <p className="hand-display hand-display--empty">
        Ingen hånd evaluert ennå
      </p>
    );
  }

  return (
    <div
      className={`hand-display${celebrate ? " hand-display--celebrate" : ""}`}
      aria-live="polite"
    >
      <span className="hand-display__name">{POKER_HAND_LABELS[hand]}</span>
      {payout > 0 && (
        <span className="hand-display__payout">+{payout} mynter</span>
      )}
    </div>
  );
}
