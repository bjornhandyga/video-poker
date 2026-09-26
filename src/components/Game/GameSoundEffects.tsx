import { useEffect, useRef } from "react";
import { useGameStore } from "../../store/gameStore";
import { gameSound } from "../../utils/gameSound";

/** Reagerer på runde-endringer i store og spiller passende lyder. */
export function GameSoundEffects() {
  const roundPhase = useGameStore((s) => s.roundPhase);
  const lastPayout = useGameStore((s) => s.lastPayout);
  const prevPhase = useRef(roundPhase);

  useEffect(() => {
    const previous = prevPhase.current;

    if (previous !== "dealt" && roundPhase === "dealt") {
      gameSound.playDeal();
    }

    if (previous === "dealt" && roundPhase === "complete") {
      gameSound.playDraw();
      if (lastPayout > 0) {
        window.setTimeout(() => gameSound.playWin(lastPayout), 120);
      }
    }

    prevPhase.current = roundPhase;
  }, [roundPhase, lastPayout]);

  return null;
}
