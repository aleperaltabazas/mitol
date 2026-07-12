import { formatLongDate } from '../game/schedule'

interface PastPuzzleBannerProps {
  isoDate: string
  onBackToToday: () => void
}

export function PastPuzzleBanner({ isoDate, onBackToToday }: PastPuzzleBannerProps) {
  return (
    <p className="past-puzzle-banner">
      Jugando el acertijo del {formatLongDate(isoDate)} ·{' '}
      <button type="button" className="past-puzzle-banner-link" onClick={onBackToToday}>
        Volver a hoy
      </button>
    </p>
  )
}
