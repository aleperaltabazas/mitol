import { useState } from 'react'
import './Game.css'
import { getEngine } from '../game/modes/engine'
import { progressiveShareText, unlimitedShareText } from '../game/share'
import type { GameMode, GameState, Puzzle } from '../game/types'
import { GuessInput } from './GuessInput'
import { HintList } from './HintList'
import { ShareResult } from './ShareResult'

interface GameProps {
  puzzle: Puzzle
  mode: GameMode
  isoDate: string
}

function initState(puzzle: Puzzle, mode: GameMode): GameState {
  return mode === 'progressive'
    ? getEngine('progressive').init(puzzle)
    : getEngine('unlimited').init(puzzle)
}

function revealedCount(state: GameState): number {
  return state.mode === 'progressive' ? Math.min(state.outcomes.length + 1, 5) : state.revealedHints
}

export function Game({ puzzle, mode, isoDate }: GameProps) {
  const [state, setState] = useState<GameState>(() => initState(puzzle, mode))

  function handleGuess(rawGuess: string) {
    if (state.mode === 'progressive') {
      setState(getEngine('progressive').guess(state, puzzle, rawGuess))
    } else {
      setState(getEngine('unlimited').guess(state, puzzle, rawGuess))
    }
  }

  function handleSkip() {
    if (state.mode === 'progressive') {
      setState(getEngine('progressive').skip(state, puzzle))
    }
  }

  function handleRevealHint() {
    if (state.mode === 'unlimited') {
      setState(getEngine('unlimited').revealNextHint(state))
    }
  }

  function handleGiveUp() {
    if (state.mode === 'unlimited') {
      setState(getEngine('unlimited').giveUp(state))
    }
  }

  const gameOver = state.status !== 'playing'

  return (
    <div className="game">
      <HintList hints={puzzle.hints} revealedCount={revealedCount(state)} />
      {!gameOver && (
        <GuessInput
          mode={mode}
          onGuess={handleGuess}
          onSkip={handleSkip}
          onRevealHint={handleRevealHint}
          onGiveUp={handleGiveUp}
          hintsExhausted={state.mode === 'unlimited' && state.revealedHints >= 5}
        />
      )}
      {gameOver && (
        <ShareResult
          shareText={
            state.mode === 'progressive'
              ? progressiveShareText(state, isoDate)
              : unlimitedShareText(state, isoDate)
          }
          answer={puzzle.answer}
        />
      )}
    </div>
  )
}
