import type { CSSProperties } from "react";
import type { PlayingCard } from "../../types/cards";
import "./Card.css";

type CardProps = {
  /** Kortdata; utelates når baksiden vises. */
  card?: PlayingCard;
  /** Vis kortets bakside i stedet for verdi og farge. */
  faceDown?: boolean;
  /** Om kortet er markert som «hold». */
  held?: boolean;
  /** Klikk/keyboard for å holde kort i deal-fasen. */
  onToggleHold?: () => void;
  /** Tilgjengelig etikett for skjermlesere. */
  ariaLabel?: string;
  /** Posisjon i hånden (0–4) for animasjon og tastaturhint. */
  cardIndex?: number;
};

const SUIT_SYMBOL: Record<PlayingCard["suit"], string> = {
  spades: "♠",
  hearts: "♥",
  diamonds: "♦",
  clubs: "♣",
};

/**
 * Ett spillkort tegnet med CSS Grid.
 * Baksiden håndteres i samme komponent via faceDown for felles størrelse og layout.
 */
export function Card({
  card,
  faceDown = false,
  held = false,
  onToggleHold,
  ariaLabel,
  cardIndex,
}: CardProps) {
  const interactive = Boolean(onToggleHold);
  const className = [
    "playing-card",
    faceDown ? "playing-card--back" : "playing-card--face",
    card ? `playing-card--${card.suit}` : "",
    held ? "playing-card--held" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const inner = faceDown ? (
    <div className="playing-card__back-pattern" aria-hidden="true" />
  ) : (
    card && (
      <>
        <span className="playing-card__corner playing-card__corner--tl">
          <span className="playing-card__rank">{card.rank}</span>
          <span className="playing-card__suit">{SUIT_SYMBOL[card.suit]}</span>
        </span>
        <span className="playing-card__center" aria-hidden="true">
          {SUIT_SYMBOL[card.suit]}
        </span>
        <span className="playing-card__corner playing-card__corner--br">
          <span className="playing-card__rank">{card.rank}</span>
          <span className="playing-card__suit">{SUIT_SYMBOL[card.suit]}</span>
        </span>
      </>
    )
  );

  const style =
    cardIndex !== undefined
      ? ({ ["--card-index" as string]: cardIndex } as CSSProperties)
      : undefined;

  if (interactive) {
    return (
      <button
        type="button"
        className={className}
        style={style}
        onClick={onToggleHold}
        aria-pressed={held}
        aria-label={ariaLabel}
      >
        {held && <span className="playing-card__hold-badge">HOLD</span>}
        {cardIndex !== undefined && (
          <span className="playing-card__key-hint" aria-hidden="true">
            {cardIndex + 1}
          </span>
        )}
        {inner}
      </button>
    );
  }

  return (
    <div className={className} style={style} aria-label={ariaLabel}>
      {inner}
    </div>
  );
}
