export type Difficulty = 1 | 2 | 3 | 4 | 5

export interface Puzzle {
  id: string
  answer: string
  hints: [string, string, string, string, string]
  description: string
  difficulty: Difficulty
  imageUrl?: string
}

export type GameMode = 'progressive' | 'unlimited'

export type GuessOutcome = 'correct' | 'wrong' | 'skip'

export type GameStatus = 'playing' | 'won' | 'lost' | 'gaveup'

interface BaseGameState {
  puzzleId: string
  status: GameStatus
}

export interface ProgressiveState extends BaseGameState {
  mode: 'progressive'
  outcomes: GuessOutcome[]
}

export interface UnlimitedState extends BaseGameState {
  mode: 'unlimited'
  revealedHints: number
  wrongGuesses: number
}

export type GameState = ProgressiveState | UnlimitedState
