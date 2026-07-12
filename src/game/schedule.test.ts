import { describe, expect, it } from 'vitest'
import {
  argentinaTodayISO,
  formatLongDate,
  pastScheduledDates,
  resolvePuzzleId,
  resolvePuzzleNumber,
} from './schedule'

describe('argentinaTodayISO', () => {
  it('resolves a UTC midday timestamp to the same calendar day in Argentina (UTC-3)', () => {
    // 2026-07-10T12:00:00Z is 2026-07-10T09:00:00 in Argentina, still the same day
    expect(argentinaTodayISO(new Date('2026-07-10T12:00:00Z'))).toBe('2026-07-10')
  })

  it('resolves a UTC timestamp that has crossed into the next UTC day but not yet in Argentina', () => {
    // 2026-07-11T02:00:00Z is 2026-07-10T23:00:00 in Argentina (UTC-3) — still July 10 there
    expect(argentinaTodayISO(new Date('2026-07-11T02:00:00Z'))).toBe('2026-07-10')
  })

  it('resolves a UTC timestamp where Argentina has already rolled over to the next day', () => {
    // 2026-07-10T03:30:00Z is 2026-07-10T00:30:00 in Argentina — already July 10 there
    expect(argentinaTodayISO(new Date('2026-07-10T03:30:00Z'))).toBe('2026-07-10')
  })
})

describe('resolvePuzzleId', () => {
  it('returns the puzzle id scheduled for a given date', () => {
    const schedule = { '2026-07-10': 'athena', '2026-07-11': 'amaterasu' }
    expect(resolvePuzzleId(schedule, '2026-07-10')).toBe('athena')
  })

  it('returns undefined when no puzzle is scheduled for that date', () => {
    const schedule = { '2026-07-10': 'athena' }
    expect(resolvePuzzleId(schedule, '2026-07-12')).toBeUndefined()
  })
})

describe('resolvePuzzleNumber', () => {
  it('returns the 1-based position of the date among the sorted schedule keys', () => {
    const schedule = { '2026-07-10': 'athena', '2026-07-11': 'amaterasu', '2026-07-12': 'anansi' }
    expect(resolvePuzzleNumber(schedule, '2026-07-10')).toBe(1)
    expect(resolvePuzzleNumber(schedule, '2026-07-11')).toBe(2)
    expect(resolvePuzzleNumber(schedule, '2026-07-12')).toBe(3)
  })

  it('is unaffected by key insertion order, since it sorts the dates', () => {
    const schedule = { '2026-07-12': 'anansi', '2026-07-10': 'athena' }
    expect(resolvePuzzleNumber(schedule, '2026-07-10')).toBe(1)
    expect(resolvePuzzleNumber(schedule, '2026-07-12')).toBe(2)
  })
})

describe('formatLongDate', () => {
  it('formats an ISO date as a long Spanish date', () => {
    expect(formatLongDate('2026-07-12')).toBe('12 de julio de 2026')
  })
})

describe('pastScheduledDates', () => {
  const schedule = {
    '2026-07-08': 'zeus',
    '2026-07-09': 'hera',
    '2026-07-10': 'athena',
    '2026-07-11': 'amaterasu',
    '2026-07-12': 'anansi',
    '2026-07-13': 'thor',
  }

  it('returns scheduled dates before today, most recent first', () => {
    expect(pastScheduledDates(schedule, '2026-07-12')).toEqual([
      '2026-07-11',
      '2026-07-10',
      '2026-07-09',
      '2026-07-08',
    ])
  })

  it('excludes today and future dates', () => {
    const result = pastScheduledDates(schedule, '2026-07-12')
    expect(result).not.toContain('2026-07-12')
    expect(result).not.toContain('2026-07-13')
  })

  it('caps the result at the given limit', () => {
    expect(pastScheduledDates(schedule, '2026-07-13', 2)).toEqual(['2026-07-12', '2026-07-11'])
  })

  it('returns fewer entries when the schedule has less history than the limit', () => {
    const shortSchedule = { '2026-07-09': 'hera', '2026-07-10': 'athena' }
    expect(pastScheduledDates(shortSchedule, '2026-07-10')).toEqual(['2026-07-09'])
  })

  it('returns an empty array when there is no past schedule history', () => {
    expect(pastScheduledDates(schedule, '2026-07-08')).toEqual([])
  })
})
