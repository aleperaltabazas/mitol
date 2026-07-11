import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ResultModal } from './ResultModal'

describe('ResultModal', () => {
  beforeEach(() => {
    Object.assign(navigator, { clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } })
  })

  it('shows a win title, the answer, description and share text', () => {
    render(
      <ResultModal
        shareText={'Mitol 2026-07-10 — ¡Resuelto!\n✅'}
        answer="Atenea"
        description="Diosa de la sabiduría."
        status="won"
        onClose={() => {}}
      />,
    )
    expect(screen.getByText('¡Lo lograste!')).toBeInTheDocument()
    expect(screen.getByText('Atenea')).toBeInTheDocument()
    expect(screen.getByText(/Diosa de la sabiduría/)).toBeInTheDocument()
  })

  it('shows a loss title when the game was lost', () => {
    render(
      <ResultModal
        shareText={'Mitol 2026-07-10 — No lo logré\n❌❌❌❌❌'}
        answer="Atenea"
        description="Diosa de la sabiduría."
        status="lost"
        onClose={() => {}}
      />,
    )
    expect(screen.getByText('No lo lograste')).toBeInTheDocument()
  })

  it('shows a give-up title when the player gave up', () => {
    render(
      <ResultModal
        shareText={'Mitol 2026-07-10 — Me rendí'}
        answer="Atenea"
        description="Diosa de la sabiduría."
        status="gaveup"
        onClose={() => {}}
      />,
    )
    expect(screen.getByText('Te rendiste')).toBeInTheDocument()
  })

  it('calls onClose when the close button is clicked', () => {
    const onClose = vi.fn()
    render(
      <ResultModal
        shareText={'Mitol 2026-07-10 — ¡Resuelto!\n✅'}
        answer="Atenea"
        description="Diosa de la sabiduría."
        status="won"
        onClose={onClose}
      />,
    )
    fireEvent.click(screen.getByRole('button', { name: /cerrar/i }))
    expect(onClose).toHaveBeenCalled()
  })
})
