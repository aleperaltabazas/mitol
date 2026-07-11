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

export function resolvePuzzleId(
  schedule: Record<string, string>,
  isoDate: string,
): string | undefined {
  return schedule[isoDate]
}
