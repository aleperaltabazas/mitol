import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { Puzzle } from '../game/types'
import { Game } from './Game'

const puzzle: Puzzle = {
  id: 'atenea',
  answer: 'Atenea',
  hints: ['h1', 'h2', 'h3', 'h4', 'h5'],
}

describe('Game', () => {
  it('renders hint 1 initially', () => {
    render(<Game puzzle={puzzle} mode="progressive" isoDate="2026-07-10" />)
    expect(screen.getByText('h1')).toBeInTheDocument()
    expect(screen.queryByText('h2')).not.toBeInTheDocument()
  })

  it('reaches the share result on a correct guess', () => {
    render(<Game puzzle={puzzle} mode="progressive" isoDate="2026-07-10" />)
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Atenea' } })
    fireEvent.click(screen.getByRole('button', { name: /adivinar/i }))
    expect(screen.getByText('Atenea', { selector: 'strong' })).toBeInTheDocument()
  })

  it('shows the skip button in progressive mode and reveal-hint in unlimited mode', () => {
    const { rerender } = render(<Game puzzle={puzzle} mode="progressive" isoDate="2026-07-10" />)
    expect(screen.getByRole('button', { name: /saltear/i })).toBeInTheDocument()

    rerender(<Game puzzle={puzzle} mode="unlimited" isoDate="2026-07-10" />)
    expect(screen.getByRole('button', { name: /pista siguiente/i })).toBeInTheDocument()
  })
})
