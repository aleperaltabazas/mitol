import { describe, expect, it } from 'vitest'
import type { Puzzle } from '../types'
import { getEngine } from './engine'

const puzzle: Puzzle = {
  id: 'atenea',
  answer: 'Atenea',
  hints: ['h1', 'h2', 'h3', 'h4', 'h5'],
}

describe('getEngine', () => {
  it('returns a progressive engine that wires init/guess/skip', () => {
    const engine = getEngine('progressive')
    const state = engine.init(puzzle)
    expect(state.mode).toBe('progressive')
    const won = engine.guess(state, puzzle, 'atenea')
    expect(won.status).toBe('won')
  })

  it('returns an unlimited engine that wires init/guess/revealNextHint/giveUp', () => {
    const engine = getEngine('unlimited')
    const state = engine.init(puzzle)
    expect(state.mode).toBe('unlimited')
    const gaveUp = engine.giveUp(state)
    expect(gaveUp.status).toBe('gaveup')
  })
})
