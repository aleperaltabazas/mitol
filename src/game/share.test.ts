import { describe, expect, it } from 'vitest'
import type { ProgressiveState, UnlimitedState } from './types'
import { progressiveShareText, unlimitedShareText } from './share'

describe('progressiveShareText', () => {
  it('renders an emoji grid and a win title', () => {
    const state: ProgressiveState = {
      puzzleId: 'atenea',
      mode: 'progressive',
      status: 'won',
      outcomes: ['skip', 'wrong', 'correct'],
    }
    const text = progressiveShareText(state, '2026-07-10')
    expect(text).toContain('⬜❌✅')
    expect(text).toContain('2026-07-10')
    expect(text).toContain('Resuelto')
  })

  it('renders a loss title when the game was lost', () => {
    const state: ProgressiveState = {
      puzzleId: 'atenea',
      mode: 'progressive',
      status: 'lost',
      outcomes: ['wrong', 'wrong', 'wrong', 'wrong', 'wrong'],
    }
    const text = progressiveShareText(state, '2026-07-10')
    expect(text).toContain('❌❌❌❌❌')
    expect(text).not.toContain('Resuelto')
  })
})

describe('unlimitedShareText', () => {
  it('reports hints and guesses used on a win', () => {
    const state: UnlimitedState = {
      puzzleId: 'atenea',
      mode: 'unlimited',
      status: 'won',
      revealedHints: 3,
      wrongGuesses: 2,
    }
    const text = unlimitedShareText(state, '2026-07-10')
    expect(text).toContain('3 pistas')
    expect(text).toContain('2 intentos')
  })

  it('reports a give-up state', () => {
    const state: UnlimitedState = {
      puzzleId: 'atenea',
      mode: 'unlimited',
      status: 'gaveup',
      revealedHints: 5,
      wrongGuesses: 4,
    }
    const text = unlimitedShareText(state, '2026-07-10')
    expect(text).toContain('Me rendí')
  })
})
