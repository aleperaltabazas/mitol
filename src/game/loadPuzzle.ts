import JSON5 from 'json5'
import scheduleRaw from '../../schedule.json5?raw'
import { argentinaTodayISO, pastScheduledDates, resolvePuzzleId, resolvePuzzleNumber } from './schedule'
import type { Puzzle } from './types'

const puzzleModules = import.meta.glob('../../puzzles/*.json5', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

const puzzlesById: Record<string, Puzzle> = {}
for (const path in puzzleModules) {
  const puzzle = JSON5.parse(puzzleModules[path]) as Puzzle
  puzzlesById[puzzle.id] = { ...puzzle, answers: puzzle.answers.map(capitalize) as [string, ...string[]] }
}

const schedule = JSON5.parse(scheduleRaw) as Record<string, string>

export interface LoadPuzzleResult {
  puzzle?: Puzzle
  puzzleNumber?: number
  isoDate?: string
  error?: 'no-puzzle-scheduled'
}

export function resolvePuzzleForDate(
  schedule: Record<string, string>,
  puzzlesById: Record<string, Puzzle>,
  isoDate: string,
): LoadPuzzleResult {
  const puzzleId = resolvePuzzleId(schedule, isoDate)
  const puzzle = puzzleId ? puzzlesById[puzzleId] : undefined
  if (!puzzle) {
    return { error: 'no-puzzle-scheduled' }
  }
  return { puzzle, puzzleNumber: resolvePuzzleNumber(schedule, isoDate), isoDate }
}

export function loadPuzzleForDate(isoDate: string): LoadPuzzleResult {
  return resolvePuzzleForDate(schedule, puzzlesById, isoDate)
}

export function loadTodaysPuzzle(now: Date = new Date()): LoadPuzzleResult {
  return loadPuzzleForDate(argentinaTodayISO(now))
}

export interface PastPuzzleOption {
  isoDate: string
  puzzle: Puzzle
}

export function resolvePastPuzzleOptions(
  schedule: Record<string, string>,
  puzzlesById: Record<string, Puzzle>,
  todayISO: string,
  limit = 6,
): PastPuzzleOption[] {
  return pastScheduledDates(schedule, todayISO, limit)
    .map((isoDate) => {
      const puzzle = puzzlesById[schedule[isoDate]]
      return puzzle ? { isoDate, puzzle } : undefined
    })
    .filter((option): option is PastPuzzleOption => option !== undefined)
}

export function pastPuzzleOptions(todayISO: string, limit = 6): PastPuzzleOption[] {
  return resolvePastPuzzleOptions(schedule, puzzlesById, todayISO, limit)
}

export interface MissingScheduledPuzzle {
  isoDate: string
  puzzleId: string
}

export function findMissingScheduledPuzzles(
  schedule: Record<string, string>,
  puzzlesById: Record<string, Puzzle>,
): MissingScheduledPuzzle[] {
  return Object.entries(schedule)
    .filter(([, puzzleId]) => !puzzlesById[puzzleId])
    .map(([isoDate, puzzleId]) => ({ isoDate, puzzleId }))
}

export function scheduleIntegrityErrors(): MissingScheduledPuzzle[] {
  return findMissingScheduledPuzzles(schedule, puzzlesById)
}
