import { POKER_HAND_LABELS } from "../../types/pokerHand";
import { PAYOUT_TABLE_ROWS } from "../../utils/payouts";
import "./PayoutTable.css";

type PayoutTableProps = {
  /** Valgfri innsats for å vise total utbetaling per rad. */
  bet?: number;
};

/** Tabell med gevinster og utbetalinger for Jacks or Better. */
export function PayoutTable({ bet = 1 }: PayoutTableProps) {
  return (
    <div className="payout-table-wrapper">
      <table className="payout-table">
        <caption className="payout-table__caption">
          Utbetalinger (Jacks or Better)
        </caption>
        <thead>
          <tr>
            <th scope="col">Hånd</th>
            <th scope="col">Per mynt</th>
            {bet > 1 && <th scope="col">Ved innsats {bet}</th>}
          </tr>
        </thead>
        <tbody>
          {PAYOUT_TABLE_ROWS.map(({ hand, multiplier }) => (
            <tr key={hand}>
              <td>{POKER_HAND_LABELS[hand]}</td>
              <td>{multiplier}</td>
              {bet > 1 && <td>{multiplier * bet}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
