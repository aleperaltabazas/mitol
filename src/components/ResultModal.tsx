import type { GameStatus } from '../game/types'
import { CopyButton } from './CopyButton'
import { ResultDetails } from './ResultDetails'

interface ResultModalProps {
  shareText: string
  answer: string
  description: string
  imageUrl?: string
  status: Exclude<GameStatus, 'playing'>
  onClose: () => void
}

const TITLE_BY_STATUS: Record<Exclude<GameStatus, 'playing'>, string> = {
  won: '¡Lo lograste!',
  lost: 'No lo lograste',
  gaveup: 'Te rendiste',
}

export function ResultModal({ shareText, answer, description, imageUrl, status, onClose }: ResultModalProps) {
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal">
        <h2>{TITLE_BY_STATUS[status]}</h2>
        <ResultDetails shareText={shareText} answer={answer} description={description} imageUrl={imageUrl} />
        <div className="actions-row">
          <CopyButton shareText={shareText} />
          <button type="button" className="modal-close" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}
