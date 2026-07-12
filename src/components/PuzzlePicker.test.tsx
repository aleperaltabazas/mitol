import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { saveGameState } from '../game/storage'
import type { Puzzle } from '../game/types'
import { PuzzlePicker } from './PuzzlePicker'

const puzzleA: Puzzle = {
  id: 'puzzle-a',
  answers: ['Answer A'],
  hints: ['hint a1', 'hint a2', 'hint a3', 'hint a4', 'hint a5'],
  description: 'description a',
  difficulty: 1,
}

const puzzleB: Puzzle = {
  id: 'puzzle-b',
  answers: ['Answer B'],
  hints: ['hint b1', 'hint b2', 'hint b3', 'hint b4', 'hint b5'],
  description: 'description b',
  difficulty: 1,
}

const puzzleC: Puzzle = {
  id: 'puzzle-c',
  answers: ['Answer C'],
  hints: ['hint c1', 'hint c2', 'hint c3', 'hint c4', 'hint c5'],
  description: 'description c',
  difficulty: 1,
}

const puzzlesByDate: Record<string, Puzzle> = {
  '2026-07-12': puzzleA,
  '2026-07-11': puzzleB,
  '2026-07-10': puzzleC,
}

vi.mock('../game/loadPuzzle', () => ({
  loadPuzzleForDate: (isoDate: string) => ({ puzzle: puzzlesByDate[isoDate] }),
  pastPuzzleOptions: (todayISO: string) =>
    Object.entries(puzzlesByDate)
      .filter(([isoDate]) => isoDate < todayISO)
      .sort(([a], [b]) => (a < b ? 1 : -1))
      .map(([isoDate, puzzle]) => ({ isoDate, puzzle })),
}))

describe('PuzzlePicker', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('opens a modal listing today plus past scheduled dates', () => {
    render(
      <PuzzlePicker todayISO="2026-07-12" selectedIsoDate="2026-07-12" mode="progressive" onSelect={() => {}} />,
    )
    fireEvent.click(screen.getByRole('button', { name: /días anteriores/i }))
    expect(screen.getByText('Hoy')).toBeInTheDocument()
    expect(screen.getByText('11 de julio de 2026')).toBeInTheDocument()
    expect(screen.getByText('10 de julio de 2026')).toBeInTheDocument()
  })

  it('calls onSelect with the chosen date and closes the modal', () => {
    const onSelect = vi.fn()
    render(
      <PuzzlePicker todayISO="2026-07-12" selectedIsoDate="2026-07-12" mode="progressive" onSelect={onSelect} />,
    )
    fireEvent.click(screen.getByRole('button', { name: /días anteriores/i }))
    fireEvent.click(screen.getByText('11 de julio de 2026'))
    expect(onSelect).toHaveBeenCalledWith('2026-07-11')
    expect(screen.queryByText('Hoy')).not.toBeInTheDocument()
  })

  it('calls onSelect with undefined when picking today', () => {
    const onSelect = vi.fn()
    render(
      <PuzzlePicker todayISO="2026-07-12" selectedIsoDate="2026-07-11" mode="progressive" onSelect={onSelect} />,
    )
    fireEvent.click(screen.getByRole('button', { name: /días anteriores/i }))
    fireEvent.click(screen.getByText('Hoy'))
    expect(onSelect).toHaveBeenCalledWith(undefined)
  })

  it("shows today's puzzle preview in the today entry too", () => {
    render(
      <PuzzlePicker todayISO="2026-07-12" selectedIsoDate="2026-07-12" mode="progressive" onSelect={() => {}} />,
    )
    fireEvent.click(screen.getByRole('button', { name: /días anteriores/i }))
    expect(screen.getByText('"hint a1"')).toBeInTheDocument()
  })

  it('shows the first hint, quoted, for an unplayed puzzle', () => {
    render(
      <PuzzlePicker todayISO="2026-07-12" selectedIsoDate="2026-07-12" mode="progressive" onSelect={() => {}} />,
    )
    fireEvent.click(screen.getByRole('button', { name: /días anteriores/i }))
    const preview = screen.getByText('"hint c1"')
    expect(preview).toBeInTheDocument()
    expect(preview).toHaveAttribute('data-variant', 'hint')
  })

  it('shows the last hint reached, quoted, for a puzzle still in progress', () => {
    saveGameState({
      puzzleId: 'puzzle-b',
      mode: 'progressive',
      status: 'playing',
      outcomes: ['wrong', 'wrong'],
      guesses: ['zeus', 'hera'],
    })
    render(
      <PuzzlePicker todayISO="2026-07-12" selectedIsoDate="2026-07-12" mode="progressive" onSelect={() => {}} />,
    )
    fireEvent.click(screen.getByRole('button', { name: /días anteriores/i }))
    expect(screen.getByText('"hint b3"')).toBeInTheDocument()
  })

  it('shows the answer in green for a puzzle the player won', () => {
    saveGameState({
      puzzleId: 'puzzle-b',
      mode: 'progressive',
      status: 'won',
      outcomes: ['correct'],
      guesses: ['Answer B'],
    })
    render(
      <PuzzlePicker todayISO="2026-07-12" selectedIsoDate="2026-07-12" mode="progressive" onSelect={() => {}} />,
    )
    fireEvent.click(screen.getByRole('button', { name: /días anteriores/i }))
    const preview = screen.getByText('Answer B')
    expect(preview).toHaveAttribute('data-variant', 'won')
  })

  it('shows the answer in red for a puzzle the player lost', () => {
    saveGameState({
      puzzleId: 'puzzle-b',
      mode: 'progressive',
      status: 'lost',
      outcomes: ['wrong', 'wrong', 'wrong', 'wrong', 'wrong'],
      guesses: ['a', 'b', 'c', 'd', 'e'],
    })
    render(
      <PuzzlePicker todayISO="2026-07-12" selectedIsoDate="2026-07-12" mode="progressive" onSelect={() => {}} />,
    )
    fireEvent.click(screen.getByRole('button', { name: /días anteriores/i }))
    const preview = screen.getByText('Answer B')
    expect(preview).toHaveAttribute('data-variant', 'lost')
  })
})
