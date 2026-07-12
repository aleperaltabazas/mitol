import { describe, expect, it } from 'vitest'
import { loadPuzzleForDate, loadTodaysPuzzle, pastPuzzleOptions } from './loadPuzzle'

describe('loadTodaysPuzzle', () => {
  it('loads the puzzle scheduled for the given Argentina date', () => {
    const result = loadTodaysPuzzle(new Date('2026-07-12T12:00:00Z'))
    expect(result.puzzle?.id).toBe('athena')
    expect(result.puzzle?.answer).toBe('Atenea')
    expect(result.puzzle?.hints).toHaveLength(5)
    expect(result.puzzleNumber).toBe(3)
  })

  it('loads a different puzzle for a different scheduled date', () => {
    const result = loadTodaysPuzzle(new Date('2026-07-11T12:00:00Z'))
    expect(result.puzzle?.id).toBe('achilles')
    expect(result.puzzleNumber).toBe(2)
  })

  it('capitalizes the answer even when authored in lowercase', () => {
    const result = loadTodaysPuzzle(new Date('2026-07-11T12:00:00Z'))
    expect(result.puzzle?.answer).toBe('Aquiles')
  })

  it('returns no puzzle when nothing is scheduled for that date', () => {
    const result = loadTodaysPuzzle(new Date('2099-01-01T12:00:00Z'))
    expect(result.puzzle).toBeUndefined()
    expect(result.error).toBe('no-puzzle-scheduled')
  })
})

describe('loadPuzzleForDate', () => {
  it('loads the puzzle scheduled for an arbitrary past date', () => {
    const result = loadPuzzleForDate('2026-07-12')
    expect(result.puzzle?.id).toBe('athena')
    expect(result.puzzleNumber).toBe(3)
  })

  it('returns no puzzle for an unscheduled date', () => {
    const result = loadPuzzleForDate('2099-01-01')
    expect(result.puzzle).toBeUndefined()
    expect(result.error).toBe('no-puzzle-scheduled')
  })
})

describe('pastPuzzleOptions', () => {
  it('lists scheduled dates before the given date with their puzzles', () => {
    const result = pastPuzzleOptions('2026-07-12')
    expect(result.map((option) => [option.isoDate, option.puzzle.id])).toEqual([
      ['2026-07-11', 'achilles'],
      ['2026-07-10', 'amaterasu'],
    ])
  })

  it('excludes the given date itself', () => {
    const result = pastPuzzleOptions('2026-07-12')
    expect(result.find((option) => option.isoDate === '2026-07-12')).toBeUndefined()
  })
})
