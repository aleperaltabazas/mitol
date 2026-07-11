import type { GameMode, ProgressiveState, Puzzle, UnlimitedState } from '../types'
import * as progressive from './progressive'
import * as unlimited from './unlimited'

export interface ProgressiveEngine {
  init(puzzle: Puzzle): ProgressiveState
  guess(state: ProgressiveState, puzzle: Puzzle, rawGuess: string): ProgressiveState
  skip(state: ProgressiveState, puzzle: Puzzle): ProgressiveState
}

export interface UnlimitedEngine {
  init(puzzle: Puzzle): UnlimitedState
  guess(state: UnlimitedState, puzzle: Puzzle, rawGuess: string): UnlimitedState
  revealNextHint(state: UnlimitedState): UnlimitedState
  giveUp(state: UnlimitedState): UnlimitedState
}

const progressiveEngine: ProgressiveEngine = progressive
const unlimitedEngine: UnlimitedEngine = unlimited

export function getEngine(mode: 'progressive'): ProgressiveEngine
export function getEngine(mode: 'unlimited'): UnlimitedEngine
export function getEngine(mode: GameMode): ProgressiveEngine | UnlimitedEngine
export function getEngine(mode: GameMode): ProgressiveEngine | UnlimitedEngine {
  return mode === 'progressive' ? progressiveEngine : unlimitedEngine
}
