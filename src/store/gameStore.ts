import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PlayingCard } from "../types/cards";
import type { Player } from "../types/player";
import type { PokerHand } from "../types/pokerHand";
import { createDeck, drawCards as drawFromDeck, shuffleDeck } from "../utils/deck";
import { evaluateHand } from "../utils/evaluateHand";
import { calculatePayout } from "../utils/payouts";

export type RoundPhase = "idle" | "dealt" | "complete";

const STARTING_COINS = 100;
const MIN_BET = 1;
const MAX_BET = 5;

type GameState = {
  players: Player[];
  currentPlayerId: string | null;
  deck: PlayingCard[];
  hand: PlayingCard[];
  discarded: PlayingCard[];
  heldIndices: boolean[];
  currentBet: number;
  roundPhase: RoundPhase;
  lastHand: PokerHand | null;
  lastPayout: number;
};

type GameActions = {
  createPlayer: (name: string) => void;
  selectPlayer: (id: string) => void;
  setBet: (bet: number) => void;
  startDeal: () => void;
  toggleHold: (index: number) => void;
  drawCards: () => void;
  minBet: () => number;
  maxBet: () => number;
};

export type GameStore = GameState & GameActions;

function updatePlayerCoins(
  players: Player[],
  playerId: string,
  delta: number,
): Player[] {
  return players.map((p) =>
    p.id === playerId ? { ...p, coins: Math.max(0, p.coins + delta) } : p,
  );
}

/**
 * Zustand-store for hele spillet med persistering i localStorage.
 * Holder styr på spillere, kortstokk, hånd, kast og runde-status.
 */
export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      players: [],
      currentPlayerId: null,
      deck: [],
      hand: [],
      discarded: [],
      heldIndices: [false, false, false, false, false],
      currentBet: 1,
      roundPhase: "idle",
      lastHand: null,
      lastPayout: 0,

      minBet: () => MIN_BET,
      maxBet: () => MAX_BET,

      createPlayer: (name: string) => {
        const trimmed = name.trim();
        if (!trimmed) return;
        const id = crypto.randomUUID();
        const player: Player = {
          id,
          name: trimmed,
          coins: STARTING_COINS,
        };
        set((state) => ({
          players: [...state.players, player],
          currentPlayerId: id,
        }));
      },

      selectPlayer: (id: string) => {
        set({ currentPlayerId: id });
      },

      setBet: (bet: number) => {
        const { roundPhase } = get();
        if (roundPhase !== "idle") return;
        const clamped = Math.min(MAX_BET, Math.max(MIN_BET, bet));
        set({ currentBet: clamped });
      },

      startDeal: () => {
        const { currentPlayerId, players, currentBet, roundPhase } = get();
        if (
          (roundPhase !== "idle" && roundPhase !== "complete") ||
          !currentPlayerId
        ) {
          return;
        }

        const player = players.find((p) => p.id === currentPlayerId);
        if (!player || player.coins < currentBet) return;

        const shuffled = shuffleDeck(createDeck());
        const { drawn, remaining } = drawFromDeck(shuffled, 5);

        set({
          players: updatePlayerCoins(
            players,
            currentPlayerId,
            -currentBet,
          ),
          deck: remaining,
          hand: drawn,
          discarded: [],
          heldIndices: [false, false, false, false, false],
          roundPhase: "dealt",
          lastHand: null,
          lastPayout: 0,
        });
      },

      toggleHold: (index: number) => {
        const { roundPhase, heldIndices } = get();
        if (roundPhase !== "dealt") return;
        const next = [...heldIndices];
        next[index] = !next[index];
        set({ heldIndices: next });
      },

      drawCards: () => {
        const {
          roundPhase,
          hand,
          deck,
          heldIndices,
          discarded,
          currentPlayerId,
          players,
          currentBet,
        } = get();
        if (roundPhase !== "dealt" || !currentPlayerId) return;

        const newHand = [...hand];
        const newDiscarded = [...discarded];
        let remainingDeck = [...deck];

        for (let i = 0; i < newHand.length; i += 1) {
          if (!heldIndices[i]) {
            newDiscarded.push(newHand[i]);
            const draw = drawFromDeck(remainingDeck, 1);
            newHand[i] = draw.drawn[0];
            remainingDeck = draw.remaining;
          }
        }

        const evaluated = evaluateHand(newHand);
        const payout = calculatePayout(evaluated, currentBet);

        set({
          hand: newHand,
          deck: remainingDeck,
          discarded: newDiscarded,
          heldIndices: [true, true, true, true, true],
          roundPhase: "complete",
          lastHand: evaluated,
          lastPayout: payout,
          players: updatePlayerCoins(players, currentPlayerId, payout),
        });
      },
    }),
    {
      name: "video-poker-storage",
      partialize: (state) => ({
        players: state.players,
        currentPlayerId: state.currentPlayerId,
        deck: state.deck,
        hand: state.hand,
        discarded: state.discarded,
        heldIndices: state.heldIndices,
        currentBet: state.currentBet,
        roundPhase: state.roundPhase,
        lastHand: state.lastHand,
        lastPayout: state.lastPayout,
      }),
    },
  ),
);

/** Henter aktiv spiller fra store, eller undefined. */
export function useCurrentPlayer(): Player | undefined {
  const players = useGameStore((s) => s.players);
  const id = useGameStore((s) => s.currentPlayerId);
  return players.find((p) => p.id === id);
}
