import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { GuessInput } from './GuessInput'

describe('GuessInput', () => {
  it('progressive mode: submits a guess and shows a skip button', () => {
    const onGuess = vi.fn()
    const onSkip = vi.fn()
    render(<GuessInput mode="progressive" onGuess={onGuess} onSkip={onSkip} />)

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Atenea' } })
    fireEvent.click(screen.getByRole('button', { name: /adivinar/i }))
    expect(onGuess).toHaveBeenCalledWith('Atenea')

    fireEvent.click(screen.getByRole('button', { name: /saltear/i }))
    expect(onSkip).toHaveBeenCalled()

    expect(screen.queryByRole('button', { name: /pista siguiente/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /rendirse/i })).not.toBeInTheDocument()
  })

  it('unlimited mode with hints remaining: shows a reveal-hint button, not give-up', () => {
    const onRevealHint = vi.fn()
    render(
      <GuessInput
        mode="unlimited"
        onGuess={vi.fn()}
        onRevealHint={onRevealHint}
        onGiveUp={vi.fn()}
        hintsExhausted={false}
      />,
    )
    fireEvent.click(screen.getByRole('button', { name: /pista siguiente/i }))
    expect(onRevealHint).toHaveBeenCalled()
    expect(screen.queryByRole('button', { name: /rendirse/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /saltear/i })).not.toBeInTheDocument()
  })

  it('unlimited mode with hints exhausted: shows a give-up button instead of reveal-hint', () => {
    const onGiveUp = vi.fn()
    render(
      <GuessInput
        mode="unlimited"
        onGuess={vi.fn()}
        onRevealHint={vi.fn()}
        onGiveUp={onGiveUp}
        hintsExhausted={true}
      />,
    )
    fireEvent.click(screen.getByRole('button', { name: /rendirse/i }))
    expect(onGiveUp).toHaveBeenCalled()
    expect(screen.queryByRole('button', { name: /pista siguiente/i })).not.toBeInTheDocument()
  })
})
