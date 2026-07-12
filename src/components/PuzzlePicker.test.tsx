import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { saveGameState } from '../game/storage'
import { PuzzlePicker } from './PuzzlePicker'

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
    expect(screen.getByText('"Nació de la cabeza de su padre"')).toBeInTheDocument()
  })

  it('shows the first hint, quoted, for an unplayed puzzle', () => {
    render(
      <PuzzlePicker todayISO="2026-07-12" selectedIsoDate="2026-07-12" mode="progressive" onSelect={() => {}} />,
    )
    fireEvent.click(screen.getByRole('button', { name: /días anteriores/i }))
    const preview = screen.getByText('"Diosa del sol"')
    expect(preview).toBeInTheDocument()
    expect(preview).toHaveAttribute('data-variant', 'hint')
  })

  it('shows the last hint reached, quoted, for a puzzle still in progress', () => {
    saveGameState({
      puzzleId: 'amaterasu',
      mode: 'progressive',
      status: 'playing',
      outcomes: ['wrong', 'wrong'],
      guesses: ['zeus', 'hera'],
    })
    render(
      <PuzzlePicker todayISO="2026-07-12" selectedIsoDate="2026-07-12" mode="progressive" onSelect={() => {}} />,
    )
    fireEvent.click(screen.getByRole('button', { name: /días anteriores/i }))
    expect(
      screen.getByText('"Según la leyenda, se encerró en una cueva, sumiendo al mundo en oscuridad"'),
    ).toBeInTheDocument()
  })

  it('shows the answer in green for a puzzle the player won', () => {
    saveGameState({
      puzzleId: 'amaterasu',
      mode: 'progressive',
      status: 'won',
      outcomes: ['correct'],
      guesses: ['Amaterasu'],
    })
    render(
      <PuzzlePicker todayISO="2026-07-12" selectedIsoDate="2026-07-12" mode="progressive" onSelect={() => {}} />,
    )
    fireEvent.click(screen.getByRole('button', { name: /días anteriores/i }))
    const preview = screen.getByText('Amaterasu')
    expect(preview).toHaveAttribute('data-variant', 'won')
  })

  it('shows the answer in red for a puzzle the player lost', () => {
    saveGameState({
      puzzleId: 'amaterasu',
      mode: 'progressive',
      status: 'lost',
      outcomes: ['wrong', 'wrong', 'wrong', 'wrong', 'wrong'],
      guesses: ['a', 'b', 'c', 'd', 'e'],
    })
    render(
      <PuzzlePicker todayISO="2026-07-12" selectedIsoDate="2026-07-12" mode="progressive" onSelect={() => {}} />,
    )
    fireEvent.click(screen.getByRole('button', { name: /días anteriores/i }))
    const preview = screen.getByText('Amaterasu')
    expect(preview).toHaveAttribute('data-variant', 'lost')
  })
})
