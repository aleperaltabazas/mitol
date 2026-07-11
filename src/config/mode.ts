import type { GameMode } from '../game/types'

export function getGameMode(): GameMode {
  return import.meta.env.VITE_GAME_MODE === 'unlimited' ? 'unlimited' : 'progressive'
}
