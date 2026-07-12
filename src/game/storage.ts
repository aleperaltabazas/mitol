import type { GameMode, GameState } from './types'

function storageKey(puzzleId: string, mode: GameMode): string {
  return `mitol:${puzzleId}:${mode}`
}

export function loadGameState(puzzleId: string, mode: GameMode): GameState | undefined {
  const raw = localStorage.getItem(storageKey(puzzleId, mode))
  if (!raw) {
    return undefined
  }
  try {
    const parsed = JSON.parse(raw) as GameState
    return parsed.puzzleId === puzzleId && parsed.mode === mode ? parsed : undefined
  } catch {
    return undefined
  }
}

export function saveGameState(state: GameState): void {
  localStorage.setItem(storageKey(state.puzzleId, state.mode), JSON.stringify(state))
}
