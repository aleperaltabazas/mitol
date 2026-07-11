import { describe, expect, it } from 'vitest'
import { argentinaTodayISO, resolvePuzzleId } from './schedule'

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
