import { useEffect } from "react";
import type { RoundPhase } from "../store/gameStore";

type GameKeyboardOptions = {
  roundPhase: RoundPhase;
  canDeal: boolean;
  onToggleHold: (index: number) => void;
  onDraw: () => void;
  onDeal: () => void;
};

/** Tastaturstøtte: 1–5 holder kort, Enter hovedhandling, D del ut / ny runde. */
export function useGameKeyboard({
  roundPhase,
  canDeal,
  onToggleHold,
  onDraw,
  onDeal,
}: GameKeyboardOptions) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (roundPhase === "dealt") {
        const holdKey = Number(event.key);
        if (holdKey >= 1 && holdKey <= 5) {
          event.preventDefault();
          onToggleHold(holdKey - 1);
          return;
        }
        if (event.key === "Enter") {
          event.preventDefault();
          onDraw();
          return;
        }
      }

      if (
        (roundPhase === "idle" || roundPhase === "complete") &&
        (event.key === "d" || event.key === "D")
      ) {
        if (!canDeal) return;
        event.preventDefault();
        onDeal();
      }

      if (
        (roundPhase === "idle" || roundPhase === "complete") &&
        event.key === "Enter" &&
        canDeal
      ) {
        event.preventDefault();
        onDeal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [roundPhase, canDeal, onToggleHold, onDraw, onDeal]);
}
