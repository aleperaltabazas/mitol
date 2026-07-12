import type { GuessOutcome } from '../game/types'

interface GuessHistoryProps {
  outcomes: readonly GuessOutcome[]
  guesses: readonly string[]
}

export function GuessHistory({ outcomes, guesses }: GuessHistoryProps) {
  const attempts = outcomes.filter((outcome) => outcome !== 'skip')
  if (attempts.length === 0) {
    return null
  }
  return (
    <ul className="guess-history">
      {outcomes.map((outcome, index) =>
        outcome === 'skip' ? null : (
          <li key={index} data-outcome={outcome}>
            {guesses[index]}
          </li>
        ),
      )}
    </ul>
  )
}
