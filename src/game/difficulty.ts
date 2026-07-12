import type { Difficulty } from './types'

const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  1: 'muy fácil',
  2: 'fácil',
  3: 'media',
  4: 'difícil',
  5: 'muy difícil',
}

export function difficultyLabel(difficulty: Difficulty): string {
  return DIFFICULTY_LABEL[difficulty]
}
