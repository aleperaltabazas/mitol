import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ShareResult } from './ShareResult'

describe('ShareResult', () => {
  beforeEach(() => {
    Object.assign(navigator, { clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } })
  })

  it('renders the answer but not the raw share text', () => {
    render(
      <ShareResult
        shareText={'Mitol 2026-07-10 — ¡Resuelto!\n✅'}
        answer="Atenea"
        description="Diosa de la sabiduría."
      />,
    )
    expect(screen.getByText('Atenea')).toBeInTheDocument()
    expect(screen.queryByText(/¡Resuelto!/)).not.toBeInTheDocument()
  })

  it('renders the description as markdown', () => {
    render(
      <ShareResult
        shareText={'Mitol 2026-07-10 — ¡Resuelto!\n✅'}
        answer="Atenea"
        description="Diosa de la **sabiduría**."
      />,
    )
    expect(screen.getByText('sabiduría', { selector: 'strong' })).toBeInTheDocument()
  })

  it('renders an image when imageUrl is provided', () => {
    render(
      <ShareResult
        shareText={'Mitol 2026-07-10 — ¡Resuelto!\n✅'}
        answer="Atenea"
        description="Diosa de la sabiduría."
        imageUrl="https://example.com/atenea.png"
      />,
    )
    expect(screen.getByRole('img', { name: 'Atenea' })).toHaveAttribute(
      'src',
      'https://example.com/atenea.png',
    )
  })

  it('does not render an image when imageUrl is absent', () => {
    render(
      <ShareResult
        shareText={'Mitol 2026-07-10 — ¡Resuelto!\n✅'}
        answer="Atenea"
        description="Diosa de la sabiduría."
      />,
    )
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('copies the share text to the clipboard when the copy button is clicked', () => {
    render(
      <ShareResult
        shareText={'Mitol 2026-07-10 — ¡Resuelto!\n✅'}
        answer="Atenea"
        description="Diosa de la sabiduría."
      />,
    )
    fireEvent.click(screen.getByRole('button', { name: /copiar/i }))
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      'Mitol 2026-07-10 — ¡Resuelto!\n✅',
    )
  })
})
