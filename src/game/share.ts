import type { GuessOutcome, ProgressiveState, UnlimitedState } from './types'

const OUTCOME_EMOJI: Record<GuessOutcome, string> = {
  correct: '✅',
  wrong: '❌',
  skip: '⬜',
}

export function progressiveShareText(
  state: ProgressiveState,
  puzzleNumber: number,
  firstHint: string,
  url: string,
): string {
  const grid = state.outcomes.map((outcome) => OUTCOME_EMOJI[outcome]).join('')
  return `Mitol #${puzzleNumber}: "${firstHint}"\n${state.outcomes.length}/5 ${grid}\n${url}`
}

export function unlimitedShareText(
  state: UnlimitedState,
  puzzleNumber: number,
  firstHint: string,
  url: string,
): string {
  const grid = '🟨'.repeat(state.revealedHints) + (state.status === 'won' ? '✅' : '🏳️')
  return `Mitol #${puzzleNumber}: "${firstHint}"\n${state.revealedHints}/5 ${grid}\n${url}`
}
