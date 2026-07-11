import { useState } from 'react'
import type { GameMode } from '../game/types'

interface GuessInputProps {
  mode: GameMode
  onGuess: (value: string) => void
  onSkip?: () => void
  onRevealHint?: () => void
  onGiveUp?: () => void
  hintsExhausted?: boolean
}

export function GuessInput({
  mode,
  onGuess,
  onSkip,
  onRevealHint,
  onGiveUp,
  hintsExhausted,
}: GuessInputProps) {
  const [value, setValue] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onGuess(value)
    setValue('')
  }

  return (
    <form className="guess-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="¿Quién es?"
      />
      <button type="submit">Adivinar</button>
      {mode === 'progressive' && (
        <button type="button" onClick={onSkip}>
          Saltear
        </button>
      )}
      {mode === 'unlimited' &&
        (hintsExhausted ? (
          <button type="button" onClick={onGiveUp}>
            Rendirse
          </button>
        ) : (
          <button type="button" onClick={onRevealHint}>
            Pista siguiente
          </button>
        ))}
    </form>
  )
}
