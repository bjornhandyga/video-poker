import "./TotalCoins.css";

type TotalCoinsProps = {
  coins: number;
  playerName?: string;
};

/** Viser spillerens nåværende myntbeholdning. */
export function TotalCoins({ coins, playerName }: TotalCoinsProps) {
  return (
    <div className="total-coins" aria-live="polite">
      {playerName && (
        <span className="total-coins__name">{playerName}: </span>
      )}
      <span className="total-coins__label">Mynter</span>
      <span className="total-coins__value">{coins}</span>
    </div>
  );
}
