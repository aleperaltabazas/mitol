import { describe, expect, it } from 'vitest'
import { loadPuzzleForDate, loadTodaysPuzzle, pastPuzzleOptions } from './loadPuzzle'

describe('loadTodaysPuzzle', () => {
  it('loads the puzzle scheduled for the given Argentina date', () => {
    const result = loadTodaysPuzzle(new Date('2026-07-12T12:00:00Z'))
    expect(result.puzzle?.id).toBe('athena')
    expect(result.puzzle?.answers).toEqual(['Atenea'])
    expect(result.puzzle?.hints).toHaveLength(5)
    expect(result.puzzleNumber).toBe(1)
  })

  it('loads a different puzzle for a different scheduled date', () => {
    const result = loadTodaysPuzzle(new Date('2026-07-14T12:00:00Z'))
    expect(result.puzzle?.id).toBe('achilles')
    expect(result.puzzleNumber).toBe(3)
  })

  it('capitalizes all accepted answers even when authored in lowercase', () => {
    const result = loadTodaysPuzzle(new Date('2026-07-14T12:00:00Z'))
    expect(result.puzzle?.answers).toEqual(['Aquiles'])
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
    expect(result.puzzleNumber).toBe(1)
  })

  it('returns no puzzle for an unscheduled date', () => {
    const result = loadPuzzleForDate('2099-01-01')
    expect(result.puzzle).toBeUndefined()
    expect(result.error).toBe('no-puzzle-scheduled')
  })
})

describe('pastPuzzleOptions', () => {
  it('lists scheduled dates before the given date with their puzzles', () => {
    const result = pastPuzzleOptions('2026-07-14')
    expect(result.map((option) => [option.isoDate, option.puzzle.id])).toEqual([
      ['2026-07-13', 'amaterasu'],
      ['2026-07-12', 'athena'],
    ])
  })

  it('excludes the given date itself', () => {
    const result = pastPuzzleOptions('2026-07-14')
    expect(result.find((option) => option.isoDate === '2026-07-14')).toBeUndefined()
  })
})
