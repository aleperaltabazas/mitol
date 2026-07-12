import { Fragment, useState } from 'react'
import './Game.css'
import { getEngine } from '../game/modes/engine'
import { progressiveShareText, unlimitedShareText } from '../game/share'
import { loadGameState, saveGameState } from '../game/storage'
import type { GameMode, GameState, Puzzle } from '../game/types'
import { GuessHistory } from './GuessHistory'
import { GuessInput } from './GuessInput'
import { HintList } from './HintList'
import { ResultModal } from './ResultModal'
import { ShareResult } from './ShareResult'

interface GameProps {
  puzzle: Puzzle
  mode: GameMode
  puzzleNumber: number
}

function initState(puzzle: Puzzle, mode: GameMode): GameState {
  const saved = loadGameState(puzzle.id, mode)
  if (saved) {
    return saved
  }
  return mode === 'progressive'
    ? getEngine('progressive').init(puzzle)
    : getEngine('unlimited').init(puzzle)
}

function revealedCount(state: GameState): number {
  if (state.status !== 'playing') {
    return 5
  }
  return state.mode === 'progressive' ? Math.min(state.outcomes.length + 1, 5) : state.revealedHints
}

export function Game({ puzzle, mode, puzzleNumber }: GameProps) {
  const [state, setState] = useState<GameState>(() => initState(puzzle, mode))
  const [modalOpen, setModalOpen] = useState(false)

  function applyState(next: GameState) {
    if (state.status === 'playing' && next.status !== 'playing') {
      setModalOpen(true)
    }
    setState(next)
    saveGameState(next)
  }

  function handleGuess(rawGuess: string) {
    if (state.mode === 'progressive') {
      applyState(getEngine('progressive').guess(state, puzzle, rawGuess))
    } else {
      applyState(getEngine('unlimited').guess(state, puzzle, rawGuess))
    }
  }

  function handleSkip() {
    if (state.mode === 'progressive') {
      applyState(getEngine('progressive').skip(state, puzzle))
    }
  }

  function handleRevealHint() {
    if (state.mode === 'unlimited') {
      applyState(getEngine('unlimited').revealNextHint(state))
    }
  }

  function handleGiveUp() {
    if (state.mode === 'unlimited') {
      applyState(getEngine('unlimited').giveUp(state))
    }
  }

  const gameOver = state.status !== 'playing'
  const shareText =
    state.mode === 'progressive'
      ? progressiveShareText(state, puzzleNumber, puzzle.hints[0], window.location.href)
      : unlimitedShareText(state, puzzleNumber, puzzle.hints[0], window.location.href)

  return (
    <Fragment>
      {state.mode === 'progressive' && (
        <GuessHistory outcomes={state.outcomes} guesses={state.guesses} />
      )}
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
        {gameOver && modalOpen && (
          <ResultModal
            shareText={shareText}
            answer={puzzle.answers[0]}
            description={puzzle.description}
            imageUrl={puzzle.imageUrl}
            status={state.status as Exclude<typeof state.status, 'playing'>}
            onClose={() => setModalOpen(false)}
          />
        )}
        {gameOver && !modalOpen && (
          <ShareResult
            shareText={shareText}
            answer={puzzle.answers[0]}
            description={puzzle.description}
            imageUrl={puzzle.imageUrl}
          />
        )}
      </div>
    </Fragment>
  )
}
