import { describe, expect, it } from 'vitest'
import type { Puzzle } from '../types'
import { init, guess, skip } from './progressive'

const puzzle: Puzzle = {
  id: 'atenea',
  answer: 'Atenea',
  hints: ['h1', 'h2', 'h3', 'h4', 'h5'],
}

describe('progressive mode', () => {
  it('starts with hint 1 revealed and status playing', () => {
    const state = init(puzzle)
    expect(state.status).toBe('playing')
    expect(state.outcomes).toEqual([])
  })

  it('a correct guess wins immediately', () => {
    let state = init(puzzle)
    state = guess(state, puzzle, 'atenea')
    expect(state.status).toBe('won')
    expect(state.outcomes).toEqual(['correct'])
  })

  it('a wrong guess records "wrong" and does not end the game before 5 outcomes', () => {
    let state = init(puzzle)
    state = guess(state, puzzle, 'zeus')
    expect(state.status).toBe('playing')
    expect(state.outcomes).toEqual(['wrong'])
  })

  it('skip records "skip" and does not end the game before 5 outcomes', () => {
    let state = init(puzzle)
    state = skip(state, puzzle)
    expect(state.status).toBe('playing')
    expect(state.outcomes).toEqual(['skip'])
  })

  it('loses after 5 outcomes without a correct guess', () => {
    let state = init(puzzle)
    for (let i = 0; i < 5; i++) {
      state = guess(state, puzzle, 'zeus')
    }
    expect(state.status).toBe('lost')
    expect(state.outcomes).toEqual(['wrong', 'wrong', 'wrong', 'wrong', 'wrong'])
  })

  it('does not accept further guesses once the game has ended', () => {
    let state = init(puzzle)
    state = guess(state, puzzle, 'atenea')
    const afterWin = state
    state = guess(state, puzzle, 'zeus')
    expect(state).toEqual(afterWin)
  })
})
