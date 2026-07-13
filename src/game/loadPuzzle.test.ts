import { describe, expect, it } from 'vitest'
import {
  findMissingScheduledPuzzles,
  loadPuzzleForDate,
  loadTodaysPuzzle,
  pastPuzzleOptions,
  resolvePastPuzzleOptions,
  resolvePuzzleForDate,
  scheduleIntegrityErrors,
} from './loadPuzzle'
import type { Puzzle } from './types'

const puzzleA: Puzzle = {
  id: 'puzzle-a',
  answers: ['Answer A'],
  hints: ['a1', 'a2', 'a3', 'a4', 'a5'],
  description: 'description a',
  difficulty: 1,
}

const puzzleB: Puzzle = {
  id: 'puzzle-b',
  answers: ['Answer B'],
  hints: ['b1', 'b2', 'b3', 'b4', 'b5'],
  description: 'description b',
  difficulty: 1,
}

const puzzlesById: Record<string, Puzzle> = {
  'puzzle-a': puzzleA,
  'puzzle-b': puzzleB,
}

const schedule: Record<string, string> = {
  '2026-07-10': 'puzzle-a',
  '2026-07-11': 'puzzle-b',
}

describe('resolvePuzzleForDate', () => {
  it('resolves the puzzle and puzzle number scheduled for a given date', () => {
    const result = resolvePuzzleForDate(schedule, puzzlesById, '2026-07-11')
    expect(result.puzzle?.id).toBe('puzzle-b')
    expect(result.puzzleNumber).toBe(2)
    expect(result.isoDate).toBe('2026-07-11')
  })

  it('returns a no-puzzle-scheduled error when nothing is scheduled for that date', () => {
    const result = resolvePuzzleForDate(schedule, puzzlesById, '2099-01-01')
    expect(result.puzzle).toBeUndefined()
    expect(result.error).toBe('no-puzzle-scheduled')
  })
})

describe('findMissingScheduledPuzzles', () => {
  it('returns an empty array when every scheduled id has a matching puzzle', () => {
    expect(findMissingScheduledPuzzles(schedule, puzzlesById)).toEqual([])
  })

  it('reports scheduled ids that have no matching puzzle', () => {
    const brokenSchedule = { ...schedule, '2026-07-12': 'puzzle-typo' }
    expect(findMissingScheduledPuzzles(brokenSchedule, puzzlesById)).toEqual([
      { isoDate: '2026-07-12', puzzleId: 'puzzle-typo' },
    ])
  })
})

describe('resolvePastPuzzleOptions', () => {
  it('lists scheduled dates before the given date with their puzzles, most recent first', () => {
    const result = resolvePastPuzzleOptions(schedule, puzzlesById, '2026-07-12')
    expect(result.map((option) => [option.isoDate, option.puzzle.id])).toEqual([
      ['2026-07-11', 'puzzle-b'],
      ['2026-07-10', 'puzzle-a'],
    ])
  })

  it('excludes the given date itself', () => {
    const result = resolvePastPuzzleOptions(schedule, puzzlesById, '2026-07-11')
    expect(result.find((option) => option.isoDate === '2026-07-11')).toBeUndefined()
  })
})

// Thin smoke tests over the real schedule.json5 / puzzles/*.json5 data — deliberately don't
// assert on specific ids, dates or answer text, since those change as puzzles are authored.
describe('real puzzle data wiring', () => {
  it('resolves a puzzle for today with 5 hints and at least one capitalized answer', () => {
    const result = loadTodaysPuzzle()
    if (result.error) {
      expect(result.error).toBe('no-puzzle-scheduled')
      return
    }
    expect(result.puzzle?.hints).toHaveLength(5)
    expect(result.puzzle?.answers.length).toBeGreaterThan(0)
    for (const answer of result.puzzle?.answers ?? []) {
      expect(answer[0]).toBe(answer[0].toUpperCase())
    }
  })

  it('returns no puzzle for a date far in the future', () => {
    const result = loadPuzzleForDate('2099-01-01')
    expect(result.puzzle).toBeUndefined()
    expect(result.error).toBe('no-puzzle-scheduled')
  })

  it('never includes today in its own past options', () => {
    const todayISO = new Date().toISOString().slice(0, 10)
    const result = pastPuzzleOptions(todayISO)
    expect(result.find((option) => option.isoDate === todayISO)).toBeUndefined()
  })

  it('every puzzle id referenced in schedule.json5 has a matching puzzles/*.json5 file', () => {
    expect(scheduleIntegrityErrors()).toEqual([])
  })
})
