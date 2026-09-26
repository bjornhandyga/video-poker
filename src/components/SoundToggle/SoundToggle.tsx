import { useState } from "react";
import { gameSound } from "../../utils/gameSound";
import "./SoundToggle.css";

/** Knapp for å slå spill-lyder av og på. */
export function SoundToggle() {
  const [on, setOn] = useState(() => gameSound.isEnabled());

  return (
    <button
      type="button"
      className="sound-toggle"
      onClick={() => {
        const next = gameSound.toggle();
        setOn(next);
      }}
      aria-pressed={on}
      aria-label={on ? "Slå av lyd" : "Slå på lyd"}
    >
      {on ? "Lyd på" : "Lyd av"}
    </button>
  );
}
