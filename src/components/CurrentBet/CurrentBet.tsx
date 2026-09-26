import "./CurrentBet.css";

type CurrentBetProps = {
  bet: number;
  onIncrease?: () => void;
  onDecrease?: () => void;
  disabled?: boolean;
};

/** Viser og justerer spillerens innsats i mynter. */
export function CurrentBet({
  bet,
  onIncrease,
  onDecrease,
  disabled = false,
}: CurrentBetProps) {
  return (
    <div className="current-bet">
      <span className="current-bet__label">Innsats</span>
      <div className="current-bet__controls">
        <button
          type="button"
          className="current-bet__btn"
          onClick={onDecrease}
          disabled={disabled || !onDecrease}
          aria-label="Senk innsats"
        >
          −
        </button>
        <span className="current-bet__value" aria-live="polite">
          {bet}
        </span>
        <button
          type="button"
          className="current-bet__btn"
          onClick={onIncrease}
          disabled={disabled || !onIncrease}
          aria-label="Øk innsats"
        >
          +
        </button>
      </div>
    </div>
  );
}
