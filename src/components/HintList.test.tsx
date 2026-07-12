import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { HintList } from './HintList'

describe('HintList', () => {
  it('renders the revealed hints as text', () => {
    render(<HintList hints={['h1', 'h2', 'h3', 'h4', 'h5']} revealedCount={2} />)
    expect(screen.getByText('h1')).toBeInTheDocument()
    expect(screen.getByText('h2')).toBeInTheDocument()
    expect(screen.queryByText('h3')).not.toBeInTheDocument()
  })

  it('always renders all 5 hint slots, even unrevealed ones', () => {
    render(<HintList hints={['h1', 'h2', 'h3', 'h4', 'h5']} revealedCount={2} />)
    expect(screen.getAllByRole('listitem')).toHaveLength(5)
  })

  it('marks unrevealed hint slots so they are not shown', () => {
    render(<HintList hints={['h1', 'h2', 'h3', 'h4', 'h5']} revealedCount={2} />)
    const items = screen.getAllByRole('listitem')
    expect(items[2]).toHaveAttribute('data-revealed', 'false')
    expect(items[0]).toHaveAttribute('data-revealed', 'true')
  })

  it('renders markdown italics and bold in revealed hints', () => {
    render(
      <HintList
        hints={['*italic* and **bold**', 'h2', 'h3', 'h4', 'h5']}
        revealedCount={1}
      />,
    )
    const item = screen.getAllByRole('listitem')[0]
    expect(item.querySelector('em')).toHaveTextContent('italic')
    expect(item.querySelector('strong')).toHaveTextContent('bold')
  })
})
