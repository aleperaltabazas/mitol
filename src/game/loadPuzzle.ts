import JSON5 from 'json5'
import scheduleRaw from '../../schedule.json5?raw'
import { argentinaTodayISO, resolvePuzzleId } from './schedule'
import type { Puzzle } from './types'

const puzzleModules = import.meta.glob('../../puzzles/*.json5', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const puzzlesById: Record<string, Puzzle> = {}
for (const path in puzzleModules) {
  const puzzle = JSON5.parse(puzzleModules[path]) as Puzzle
  puzzlesById[puzzle.id] = puzzle
}

const schedule = JSON5.parse(scheduleRaw) as Record<string, string>

export interface LoadPuzzleResult {
  puzzle?: Puzzle
  error?: 'no-puzzle-scheduled'
}

export function loadTodaysPuzzle(now: Date = new Date()): LoadPuzzleResult {
  const isoDate = argentinaTodayISO(now)
  const puzzleId = resolvePuzzleId(schedule, isoDate)
  const puzzle = puzzleId ? puzzlesById[puzzleId] : undefined
  if (!puzzle) {
    return { error: 'no-puzzle-scheduled' }
  }
  return { puzzle }
}
