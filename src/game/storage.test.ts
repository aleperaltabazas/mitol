import { beforeEach, describe, expect, it } from 'vitest'
import type { ProgressiveState } from './types'
import { loadGameState, saveGameState } from './storage'

const state: ProgressiveState = {
  puzzleId: 'atenea',
  mode: 'progressive',
  status: 'playing',
  outcomes: ['wrong'],
  guesses: ['zeus'],
}

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns undefined when nothing is stored for the puzzle', () => {
    expect(loadGameState('atenea', 'progressive')).toBeUndefined()
  })

  it('round-trips a saved state', () => {
    saveGameState(state)
    expect(loadGameState('atenea', 'progressive')).toEqual(state)
  })

  it('ignores state stored for a different puzzle id', () => {
    saveGameState(state)
    expect(loadGameState('amaterasu', 'progressive')).toBeUndefined()
  })

  it('ignores state stored under a different mode', () => {
    saveGameState(state)
    expect(loadGameState('atenea', 'unlimited')).toBeUndefined()
  })

  it('ignores malformed JSON', () => {
    localStorage.setItem('mitol:atenea:progressive', 'not json')
    expect(loadGameState('atenea', 'progressive')).toBeUndefined()
  })
})
