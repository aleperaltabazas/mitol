import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { Puzzle } from '../game/types'
import { Game } from './Game'

const puzzle: Puzzle = {
  id: 'atenea',
  answers: ['Atenea'],
  hints: ['h1', 'h2', 'h3', 'h4', 'h5'],
  description: 'Una descripción de prueba.',
  difficulty: 3,
}

describe('Game', () => {
  beforeEach(() => {
    Object.assign(navigator, { clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } })
    localStorage.clear()
  })

  it('renders hint 1 initially', () => {
    render(<Game puzzle={puzzle} mode="progressive" puzzleNumber={1} />)
    expect(screen.getByText('h1')).toBeInTheDocument()
    expect(screen.queryByText('h2')).not.toBeInTheDocument()
  })

  it('shows the skip button in progressive mode and reveal-hint in unlimited mode', () => {
    const { rerender } = render(<Game puzzle={puzzle} mode="progressive" puzzleNumber={1} />)
    expect(screen.getByRole('button', { name: /saltear/i })).toBeInTheDocument()

    rerender(<Game puzzle={puzzle} mode="unlimited" puzzleNumber={1} />)
    expect(screen.getByRole('button', { name: /pista siguiente/i })).toBeInTheDocument()
  })

  it('opens a result modal on a correct guess, revealing every hint underneath', () => {
    render(<Game puzzle={puzzle} mode="progressive" puzzleNumber={1} />)
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Atenea' } })
    fireEvent.click(screen.getByRole('button', { name: /adivinar/i }))

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('¡Lo lograste!')).toBeInTheDocument()
    expect(screen.getByText('h1')).toBeInTheDocument()
    expect(screen.getByText('h2')).toBeInTheDocument()
    expect(screen.getByText('h5')).toBeInTheDocument()
  })

  it('opens a result modal after exhausting all guesses, revealing every hint', () => {
    render(<Game puzzle={puzzle} mode="progressive" puzzleNumber={1} />)
    for (let i = 0; i < 5; i++) {
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'zeus' } })
      fireEvent.click(screen.getByRole('button', { name: /adivinar/i }))
    }

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('No lo lograste')).toBeInTheDocument()
    expect(screen.getByText('h5')).toBeInTheDocument()
  })

  it('moves the result to the main screen only after the modal is closed', () => {
    render(<Game puzzle={puzzle} mode="progressive" puzzleNumber={1} />)
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Atenea' } })
    fireEvent.click(screen.getByRole('button', { name: /adivinar/i }))

    expect(screen.getByRole('dialog')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /cerrar/i }))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(screen.getByText('Atenea', { selector: 'strong' })).toBeInTheDocument()
  })
})
