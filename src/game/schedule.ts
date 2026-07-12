const ARGENTINA_TIME_ZONE = 'America/Argentina/Buenos_Aires'

const argentinaDateFormatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: ARGENTINA_TIME_ZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

export function argentinaTodayISO(now: Date = new Date()): string {
  return argentinaDateFormatter.format(now)
}

const longDateFormatter = new Intl.DateTimeFormat('es-AR', {
  timeZone: 'UTC',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

export function formatLongDate(isoDate: string): string {
  return longDateFormatter.format(new Date(`${isoDate}T00:00:00Z`))
}

export function resolvePuzzleId(
  schedule: Record<string, string>,
  isoDate: string,
): string | undefined {
  return schedule[isoDate]
}

export function resolvePuzzleNumber(schedule: Record<string, string>, isoDate: string): number {
  const dates = Object.keys(schedule).sort()
  return dates.indexOf(isoDate) + 1
}

export function pastScheduledDates(
  schedule: Record<string, string>,
  todayISO: string,
  limit = 6,
): string[] {
  return Object.keys(schedule)
    .filter((date) => date < todayISO)
    .sort()
    .reverse()
    .slice(0, limit)
}
