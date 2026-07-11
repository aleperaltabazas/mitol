interface HintListProps {
  hints: readonly string[]
  revealedCount: number
}

export function HintList({ hints, revealedCount }: HintListProps) {
  return (
    <ol className="hint-list">
      {hints.map((hint, index) => {
        const revealed = index < revealedCount
        return (
          <li key={index} data-revealed={revealed}>
            {revealed ? hint : '· · ·'}
          </li>
        )
      })}
    </ol>
  )
}
