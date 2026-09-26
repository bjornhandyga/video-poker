import { PayoutTable } from "../components/PayoutTable/PayoutTable";
import { useGameStore } from "../store/gameStore";
import "./RulesPage.css";

/** Regler, utbetalinger og informasjon om appen. */
export function RulesPage() {
  const currentBet = useGameStore((s) => s.currentBet);

  return (
    <article className="rules-page">
      <h1>Regler og utbetalinger</h1>

      <section aria-labelledby="rules-how">
        <h2 id="rules-how">Slik spiller du</h2>
        <ol>
          <li>Opprett eller velg en spiller (100 mynter ved start).</li>
          <li>Velg innsats mellom 1 og 5 mynter før hver runde.</li>
          <li>Trykk «Del ut» for å få fem kort. Innsatsen trekkes fra saldoen.</li>
          <li>Klikk på kort du vil beholde (markert med gul ramme).</li>
          <li>Trykk «Bytt kort» – ukvalgte kort erstattes, og gevinst beregnes.</li>
          <li>En aktiv runde lagres om du bytter side eller laster siden på nytt.</li>
        </ol>
      </section>

      <section aria-labelledby="rules-payout">
        <h2 id="rules-payout">Gevinsttabell</h2>
        <PayoutTable bet={currentBet} />
      </section>

      <section aria-labelledby="rules-about">
        <h2 id="rules-about">Om appen</h2>
        <p>
          Video Poker er laget som skoleprosjekt med React, TypeScript, React
          Router og Zustand. Spillvarianten følger Jacks or Better med
          standard utbetalingstabell.
        </p>
        <p>
          Inspirasjon:{" "}
          <a
            href="https://www.freeslots.com/poker.htm"
            target="_blank"
            rel="noreferrer"
          >
            freeslots.com/poker
          </a>
        </p>
      </section>
    </article>
  );
}
