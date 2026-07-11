import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ShareResult } from './ShareResult'

describe('ShareResult', () => {
  beforeEach(() => {
    Object.assign(navigator, { clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } })
  })

  it('renders the share text and the answer', () => {
    render(<ShareResult shareText={'Mitol 2026-07-10 — ¡Resuelto!\n✅'} answer="Atenea" />)
    expect(screen.getByText(/¡Resuelto!/)).toBeInTheDocument()
    expect(screen.getByText('Atenea')).toBeInTheDocument()
  })

  it('copies the share text to the clipboard when the copy button is clicked', () => {
    render(<ShareResult shareText={'Mitol 2026-07-10 — ¡Resuelto!\n✅'} answer="Atenea" />)
    fireEvent.click(screen.getByRole('button', { name: /copiar/i }))
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      'Mitol 2026-07-10 — ¡Resuelto!\n✅',
    )
  })
})
