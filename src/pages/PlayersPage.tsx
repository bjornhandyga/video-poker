import { FormEvent, useState } from "react";
import { useGameStore } from "../store/gameStore";
import { TotalCoins } from "../components/TotalCoins/TotalCoins";
import "./PlayersPage.css";

/** Velg eksisterende spiller eller opprett ny med startkapital. */
export function PlayersPage() {
  const players = useGameStore((s) => s.players);
  const currentPlayerId = useGameStore((s) => s.currentPlayerId);
  const createPlayer = useGameStore((s) => s.createPlayer);
  const selectPlayer = useGameStore((s) => s.selectPlayer);
  const [name, setName] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    createPlayer(name);
    setName("");
  };

  return (
    <section className="players-page" aria-labelledby="players-heading">
      <h1 id="players-heading">Spillere</h1>
      <p className="players-page__intro">
        Identifiser deg med navn. Nye spillere starter med 100 mynter.
      </p>

      <form className="players-page__form" onSubmit={handleSubmit}>
        <label htmlFor="player-name">Ny spiller</label>
        <div className="players-page__form-row">
          <input
            id="player-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Navn"
            autoComplete="name"
            maxLength={40}
            required
          />
          <button type="submit">Opprett</button>
        </div>
      </form>

      {players.length === 0 ? (
        <p>Ingen spillere ennå. Opprett den første over.</p>
      ) : (
        <ul className="players-page__list">
          {players.map((player) => {
            const selected = player.id === currentPlayerId;
            return (
              <li key={player.id}>
                <button
                  type="button"
                  className={`players-page__player${selected ? " players-page__player--active" : ""}`}
                  onClick={() => selectPlayer(player.id)}
                  aria-pressed={selected}
                >
                  <span className="players-page__player-name">{player.name}</span>
                  <TotalCoins coins={player.coins} />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
