import { describe, expect, it } from 'vitest'
import { loadTodaysPuzzle } from './loadPuzzle'

describe('loadTodaysPuzzle', () => {
  it('loads the puzzle scheduled for the given Argentina date', () => {
    const result = loadTodaysPuzzle(new Date('2026-07-10T12:00:00Z'))
    expect(result.puzzle?.id).toBe('atenea')
    expect(result.puzzle?.answer).toBe('Atenea')
    expect(result.puzzle?.hints).toHaveLength(5)
  })

  it('loads a different puzzle for a different scheduled date', () => {
    const result = loadTodaysPuzzle(new Date('2026-07-11T12:00:00Z'))
    expect(result.puzzle?.id).toBe('amaterasu')
  })

  it('returns no puzzle when nothing is scheduled for that date', () => {
    const result = loadTodaysPuzzle(new Date('2099-01-01T12:00:00Z'))
    expect(result.puzzle).toBeUndefined()
    expect(result.error).toBe('no-puzzle-scheduled')
  })
})
