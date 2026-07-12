import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { PastPuzzleBanner } from './PastPuzzleBanner'

describe('PastPuzzleBanner', () => {
  it('shows the formatted date being played', () => {
    render(<PastPuzzleBanner isoDate="2026-07-10" onBackToToday={() => {}} />)
    expect(screen.getByText(/10 de julio de 2026/)).toBeInTheDocument()
  })

  it('calls onBackToToday when the link is clicked', () => {
    const onBackToToday = vi.fn()
    render(<PastPuzzleBanner isoDate="2026-07-10" onBackToToday={onBackToToday} />)
    fireEvent.click(screen.getByRole('button', { name: /volver a hoy/i }))
    expect(onBackToToday).toHaveBeenCalled()
  })
})
