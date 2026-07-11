import { isCorrectGuess } from '../normalize'
import type { ProgressiveState, Puzzle } from '../types'

const MAX_OUTCOMES = 5

export function init(puzzle: Puzzle): ProgressiveState {
  return {
    puzzleId: puzzle.id,
    mode: 'progressive',
    status: 'playing',
    outcomes: [],
  }
}

function applyOutcome(
  state: ProgressiveState,
  outcome: ProgressiveState['outcomes'][number],
): ProgressiveState {
  if (state.status !== 'playing') {
    return state
  }
  const outcomes = [...state.outcomes, outcome]
  const status =
    outcome === 'correct' ? 'won' : outcomes.length >= MAX_OUTCOMES ? 'lost' : 'playing'
  return { ...state, outcomes, status }
}

export function guess(state: ProgressiveState, puzzle: Puzzle, rawGuess: string): ProgressiveState {
  return applyOutcome(state, isCorrectGuess(rawGuess, puzzle.answer) ? 'correct' : 'wrong')
}

export function skip(state: ProgressiveState, _puzzle: Puzzle): ProgressiveState {
  return applyOutcome(state, 'skip')
}
