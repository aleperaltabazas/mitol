import { isCorrectGuess } from '../normalize'
import type { ProgressiveState, Puzzle } from '../types'

const MAX_OUTCOMES = 5

export function init(puzzle: Puzzle): ProgressiveState {
  return {
    puzzleId: puzzle.id,
    mode: 'progressive',
    status: 'playing',
    outcomes: [],
    guesses: [],
  }
}

function applyOutcome(
  state: ProgressiveState,
  outcome: ProgressiveState['outcomes'][number],
  guessText: string,
): ProgressiveState {
  if (state.status !== 'playing') {
    return state
  }
  const outcomes = [...state.outcomes, outcome]
  const guesses = [...state.guesses, guessText]
  const status =
    outcome === 'correct' ? 'won' : outcomes.length >= MAX_OUTCOMES ? 'lost' : 'playing'
  return { ...state, outcomes, guesses, status }
}

export function guess(state: ProgressiveState, puzzle: Puzzle, rawGuess: string): ProgressiveState {
  return applyOutcome(state, isCorrectGuess(rawGuess, puzzle.answers) ? 'correct' : 'wrong', rawGuess)
}

export function skip(state: ProgressiveState, _puzzle: Puzzle): ProgressiveState {
  return applyOutcome(state, 'skip', '')
}
