import type { GuessOutcome, ProgressiveState, UnlimitedState } from './types'

const OUTCOME_EMOJI: Record<GuessOutcome, string> = {
  correct: '✅',
  wrong: '❌',
  skip: '⬜',
}

export function progressiveShareText(state: ProgressiveState, isoDate: string): string {
  const grid = state.outcomes.map((outcome) => OUTCOME_EMOJI[outcome]).join('')
  const title = state.status === 'won' ? '¡Resuelto!' : 'No lo logré'
  return `Mitol ${isoDate} — ${title}\n${grid}`
}

export function unlimitedShareText(state: UnlimitedState, isoDate: string): string {
  if (state.status === 'gaveup') {
    return `Mitol ${isoDate} — Me rendí (${state.revealedHints} pistas, ${state.wrongGuesses} intentos)`
  }
  return `Mitol ${isoDate} — Resuelto con ${state.revealedHints} pistas y ${state.wrongGuesses} intentos`
}
