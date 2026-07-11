import { isCorrectGuess } from '../normalize'
import type { Puzzle, UnlimitedState } from '../types'

const MAX_HINTS = 5

export function init(puzzle: Puzzle): UnlimitedState {
  return {
    puzzleId: puzzle.id,
    mode: 'unlimited',
    status: 'playing',
    revealedHints: 1,
    wrongGuesses: 0,
  }
}

export function guess(state: UnlimitedState, puzzle: Puzzle, rawGuess: string): UnlimitedState {
  if (state.status !== 'playing') {
    return state
  }
  if (isCorrectGuess(rawGuess, puzzle.answer)) {
    return { ...state, status: 'won' }
  }
  return { ...state, wrongGuesses: state.wrongGuesses + 1 }
}

export function revealNextHint(state: UnlimitedState): UnlimitedState {
  if (state.status !== 'playing') {
    return state
  }
  return { ...state, revealedHints: Math.min(state.revealedHints + 1, MAX_HINTS) }
}

export function giveUp(state: UnlimitedState): UnlimitedState {
  if (state.status !== 'playing') {
    return state
  }
  return { ...state, status: 'gaveup' }
}
