import { Link } from "react-router-dom";
import { evaluateHand } from "../../utils/evaluateHand";
import { useCurrentPlayer, useGameStore } from "../../store/gameStore";
import { Card } from "../Card/Card";
import { CurrentBet } from "../CurrentBet/CurrentBet";
import { HandDisplay } from "../HandDisplay/HandDisplay";
import { TotalCoins } from "../TotalCoins/TotalCoins";
import "./Game.css";

/**
 * Spillbrettet som samler kort, innsats, mynter og handlingsknapper.
 */
export function Game() {
  const player = useCurrentPlayer();
  const hand = useGameStore((s) => s.hand);
  const heldIndices = useGameStore((s) => s.heldIndices);
  const discarded = useGameStore((s) => s.discarded);
  const currentBet = useGameStore((s) => s.currentBet);
  const roundPhase = useGameStore((s) => s.roundPhase);
  const lastHand = useGameStore((s) => s.lastHand);
  const lastPayout = useGameStore((s) => s.lastPayout);
  const setBet = useGameStore((s) => s.setBet);
  const startDeal = useGameStore((s) => s.startDeal);
  const toggleHold = useGameStore((s) => s.toggleHold);
  const drawCardsAction = useGameStore((s) => s.drawCards);
  const minBet = useGameStore((s) => s.minBet);
  const maxBet = useGameStore((s) => s.maxBet);

  if (!player) {
    return (
      <section className="game game--no-player">
        <p>Velg eller opprett en spiller før du starter.</p>
        <Link to="/spillere" className="game__link">
          Gå til spillere
        </Link>
      </section>
    );
  }

  // FIXME: innsats knappene oppfører seg rart noen ganger
  const canAdjustBet = roundPhase === "idle" || roundPhase === "complete";
  const liveHand =
    roundPhase === "complete" && lastHand
      ? lastHand
      : hand.length === 5
        ? evaluateHand(hand)
        : null;
  const showPayout = roundPhase === "complete" ? lastPayout : 0;

  const insufficientCoins = player.coins < currentBet;
  const canDeal =
    canAdjustBet && !insufficientCoins && (roundPhase === "idle" || roundPhase === "complete");

  return (
    <section className="game" aria-labelledby="game-heading">
      <header className="game__header">
        <h1 id="game-heading">Video Poker</h1>
        <TotalCoins coins={player.coins} playerName={player.name} />
      </header>

      <div className="game__toolbar">
        <CurrentBet
          bet={currentBet}
          disabled={!canAdjustBet}
          onDecrease={() => setBet(currentBet - 1)}
          onIncrease={() => setBet(currentBet + 1)}
        />
        <HandDisplay hand={liveHand} payout={showPayout} />
      </div>

      <div className="game__hand" role="group" aria-label="Din hånd">
        {hand.length === 0
          ? Array.from({ length: 5 }, (_, i) => (
              <Card key={`empty-${i}`} faceDown ariaLabel="Tom plass" />
            ))
          : hand.map((card, index) => (
              <Card
                key={card.id}
                card={card}
                held={heldIndices[index]}
                onToggleHold={
                  roundPhase === "dealt"
                    ? () => toggleHold(index)
                    : undefined
                }
                ariaLabel={
                  roundPhase === "dealt"
                    ? `${heldIndices[index] ? "Hold" : "Kast"} ${card.rank} ${card.suit}`
                    : `${card.rank} ${card.suit}`
                }
              />
            ))}
      </div>

      {discarded.length > 0 && (
        <div className="game__discarded">
          <h2 className="game__subheading">Kastede kort</h2>
          <div className="game__discarded-cards">
            {discarded.map((card) => (
              <Card key={`disc-${card.id}`} card={card} ariaLabel={`Kastet ${card.rank}`} />
            ))}
          </div>
        </div>
      )}

      <div className="game__actions">
        {roundPhase === "dealt" ? (
          <button
            type="button"
            className="game__primary-btn"
            onClick={() => drawCardsAction()}
          >
            Bytt kort
          </button>
        ) : (
          <button
            type="button"
            className="game__primary-btn"
            onClick={() => startDeal()}
            disabled={!canDeal}
          >
            {roundPhase === "complete" ? "Ny runde" : "Del ut"}
          </button>
        )}
        {insufficientCoins && canAdjustBet && (
          <p className="game__hint" role="status">
            Du har ikke nok mynter til denne innsatsen (min {minBet()}, maks{" "}
            {maxBet()}).
          </p>
        )}
      </div>
    </section>
  );
}
