import { describe, expect, it } from 'vitest'
import { difficultyLabel } from './difficulty'

describe('difficultyLabel', () => {
  it('maps each difficulty level to its Spanish label', () => {
    expect(difficultyLabel(1)).toBe('muy fácil')
    expect(difficultyLabel(2)).toBe('fácil')
    expect(difficultyLabel(3)).toBe('media')
    expect(difficultyLabel(4)).toBe('difícil')
    expect(difficultyLabel(5)).toBe('muy difícil')
  })
})
