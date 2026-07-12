import { describe, expect, it } from 'vitest'
import type { ProgressiveState, UnlimitedState } from './types'
import { progressiveShareText, unlimitedShareText } from './share'

const URL = 'https://mitol.app'

describe('progressiveShareText', () => {
  it('renders the puzzle number, first hint, ratio and emoji grid', () => {
    const state: ProgressiveState = {
      puzzleId: 'atenea',
      mode: 'progressive',
      status: 'won',
      outcomes: ['skip', 'wrong', 'correct'],
    }
    const text = progressiveShareText(state, 5, 'Nací completamente armada.', URL)
    expect(text).toBe('Mitol #5: "Nací completamente armada."\n3/5 ⬜❌✅\nhttps://mitol.app')
  })

  it('renders a full grid on a loss', () => {
    const state: ProgressiveState = {
      puzzleId: 'atenea',
      mode: 'progressive',
      status: 'lost',
      outcomes: ['wrong', 'wrong', 'wrong', 'wrong', 'wrong'],
    }
    const text = progressiveShareText(state, 5, 'Nací completamente armada.', URL)
    expect(text).toContain('5/5 ❌❌❌❌❌')
  })
})

describe('unlimitedShareText', () => {
  it('renders a hint-reveal grid capped by a win emoji', () => {
    const state: UnlimitedState = {
      puzzleId: 'atenea',
      mode: 'unlimited',
      status: 'won',
      revealedHints: 3,
      wrongGuesses: 2,
    }
    const text = unlimitedShareText(state, 5, 'Nací completamente armada.', URL)
    expect(text).toBe('Mitol #5: "Nací completamente armada."\n3/5 🟨🟨🟨✅\nhttps://mitol.app')
  })

  it('renders a give-up flag instead of the win check', () => {
    const state: UnlimitedState = {
      puzzleId: 'atenea',
      mode: 'unlimited',
      status: 'gaveup',
      revealedHints: 5,
      wrongGuesses: 4,
    }
    const text = unlimitedShareText(state, 5, 'Nací completamente armada.', URL)
    expect(text).toContain('5/5 🟨🟨🟨🟨🟨🏳️')
  })
})
