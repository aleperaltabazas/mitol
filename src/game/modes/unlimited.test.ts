import { describe, expect, it } from 'vitest'
import type { Puzzle } from '../types'
import { init, guess, revealNextHint, giveUp } from './unlimited'

const puzzle: Puzzle = {
  id: 'atenea',
  answer: 'Atenea',
  hints: ['h1', 'h2', 'h3', 'h4', 'h5'],
}

describe('unlimited mode', () => {
  it('starts with hint 1 revealed for free and status playing', () => {
    const state = init(puzzle)
    expect(state.status).toBe('playing')
    expect(state.revealedHints).toBe(1)
    expect(state.wrongGuesses).toBe(0)
  })

  it('a correct guess wins without revealing more hints', () => {
    let state = init(puzzle)
    state = guess(state, puzzle, 'atenea')
    expect(state.status).toBe('won')
    expect(state.wrongGuesses).toBe(0)
  })

  it('a wrong guess increments the counter but does not reveal a hint', () => {
    let state = init(puzzle)
    state = guess(state, puzzle, 'zeus')
    expect(state.status).toBe('playing')
    expect(state.wrongGuesses).toBe(1)
    expect(state.revealedHints).toBe(1)
  })

  it('revealNextHint increments revealedHints up to 5', () => {
    let state = init(puzzle)
    state = revealNextHint(state)
    expect(state.revealedHints).toBe(2)
    state = revealNextHint(state)
    state = revealNextHint(state)
    state = revealNextHint(state)
    expect(state.revealedHints).toBe(5)
    state = revealNextHint(state)
    expect(state.revealedHints).toBe(5)
  })

  it('there is no cap on wrong guesses and no loss state', () => {
    let state = init(puzzle)
    for (let i = 0; i < 20; i++) {
      state = guess(state, puzzle, 'zeus')
    }
    expect(state.status).toBe('playing')
    expect(state.wrongGuesses).toBe(20)
  })

  it('giveUp ends the game', () => {
    let state = init(puzzle)
    state = giveUp(state)
    expect(state.status).toBe('gaveup')
  })

  it('does not accept further actions once the game has ended', () => {
    let state = init(puzzle)
    state = guess(state, puzzle, 'atenea')
    const afterWin = state
    state = guess(state, puzzle, 'zeus')
    state = revealNextHint(state)
    expect(state).toEqual(afterWin)
  })
})
