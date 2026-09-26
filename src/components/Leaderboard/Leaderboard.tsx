import type { Player } from "../../types/player";
import "./Leaderboard.css";

type LeaderboardProps = {
  players: Player[];
  currentPlayerId: string | null;
};

/** Sorterer spillere på mynter (høyest først). */
export function Leaderboard({ players, currentPlayerId }: LeaderboardProps) {
  if (players.length === 0) return null;

  const ranked = [...players].sort((a, b) => {
    if (b.coins !== a.coins) return b.coins - a.coins;
    return a.name.localeCompare(b.name, "nb");
  });

  return (
    <section className="leaderboard" aria-labelledby="leaderboard-heading">
      <h2 id="leaderboard-heading">Toppliste</h2>
      <ol className="leaderboard__list">
        {ranked.map((player, index) => (
          <li
            key={player.id}
            className={
              player.id === currentPlayerId
                ? "leaderboard__item leaderboard__item--active"
                : "leaderboard__item"
            }
          >
            <span className="leaderboard__rank">{index + 1}</span>
            <span className="leaderboard__name">{player.name}</span>
            <span className="leaderboard__coins">{player.coins}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
