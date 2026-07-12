import { useState } from 'react'
import { loadPuzzleForDate, pastPuzzleOptions } from '../game/loadPuzzle'
import { formatLongDate } from '../game/schedule'
import { loadGameState } from '../game/storage'
import type { GameMode, GameState, Puzzle } from '../game/types'
import './PuzzlePicker.css'

interface PuzzlePickerProps {
  todayISO: string
  selectedIsoDate: string
  mode: GameMode
  onSelect: (isoDate: string | undefined) => void
}

interface EntryPreview {
  text: string
  variant: 'hint' | 'won' | 'lost'
}

function lastRevealedHintCount(state: GameState | undefined): number {
  if (!state) return 1
  return state.mode === 'progressive' ? Math.min(state.outcomes.length + 1, 5) : state.revealedHints
}

function entryPreview(puzzle: Puzzle, mode: GameMode): EntryPreview {
  const state = loadGameState(puzzle.id, mode)
  if (state?.status === 'won') {
    return { text: puzzle.answers[0], variant: 'won' }
  }
  if (state?.status === 'lost' || state?.status === 'gaveup') {
    return { text: puzzle.answers[0], variant: 'lost' }
  }
  return { text: puzzle.hints[lastRevealedHintCount(state) - 1], variant: 'hint' }
}

export function PuzzlePicker({ todayISO, selectedIsoDate, mode, onSelect }: PuzzlePickerProps) {
  const [open, setOpen] = useState(false)
  const todaysPuzzle = loadPuzzleForDate(todayISO).puzzle

  function handleSelect(isoDate: string | undefined) {
    onSelect(isoDate)
    setOpen(false)
  }

  return (
    <>
      <button type="button" className="puzzle-picker-trigger" onClick={() => setOpen(true)}>
        Días anteriores
      </button>
      {open && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal puzzle-picker-modal">
            <h2>Elegí un acertijo</h2>
            <ul className="puzzle-picker-list">
              <li>
                <button
                  type="button"
                  className="puzzle-picker-option"
                  data-active={selectedIsoDate === todayISO}
                  onClick={() => handleSelect(undefined)}
                >
                  <span className="puzzle-picker-date">Hoy</span>
                  {todaysPuzzle && (
                    <PreviewText preview={entryPreview(todaysPuzzle, mode)} />
                  )}
                </button>
              </li>
              {pastPuzzleOptions(todayISO).map(({ isoDate, puzzle }) => (
                <li key={isoDate}>
                  <button
                    type="button"
                    className="puzzle-picker-option"
                    data-active={selectedIsoDate === isoDate}
                    onClick={() => handleSelect(isoDate)}
                  >
                    <span className="puzzle-picker-date">{formatLongDate(isoDate)}</span>
                    <PreviewText preview={entryPreview(puzzle, mode)} />
                  </button>
                </li>
              ))}
            </ul>
            <button type="button" className="modal-close" onClick={() => setOpen(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  )
}

function PreviewText({ preview }: { preview: EntryPreview }) {
  return (
    <span className="puzzle-picker-preview" data-variant={preview.variant}>
      {preview.variant === 'hint' ? `"${preview.text}"` : preview.text}
    </span>
  )
}
