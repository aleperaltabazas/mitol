import './App.css'
import { getGameMode } from './config/mode'
import { Game } from './components/Game'
import { LaurelSprig } from './components/LaurelSprig'
import { Pediment } from './components/Pediment'
import { Column } from './components/Column'
import { Staircase } from './components/Staircase'
import { difficultyLabel } from './game/difficulty'
import { loadTodaysPuzzle } from './game/loadPuzzle'
import { formatLongDate } from './game/schedule'
import type { Difficulty } from './game/types'

interface HeaderProps {
  isoDate?: string
  difficulty?: Difficulty
}

function Header({ isoDate, difficulty }: HeaderProps) {
  return (
    <header className="header">
      <div className="temple">
        <Pediment className="temple-pediment" />
        <div className="temple-columns">
          <Column className="temple-column" />
          <h1 className="title">Mitol</h1>
          <Column className="temple-column temple-column--right" />
        </div>
        <Staircase className="temple-staircase" />
      </div>
      <p className="subtitle">Adiviná la figura mitológica según las pistas</p>
      {isoDate && difficulty && (
        <p className="meta">
          {formatLongDate(isoDate)} | Dificultad: {difficultyLabel(difficulty)}
        </p>
      )}
      <div className="flourish">
        <LaurelSprig className="laurel" flip />
        <LaurelSprig className="laurel" />
      </div>
    </header>
  )
}

function App() {
  const { puzzle, puzzleNumber, isoDate } = loadTodaysPuzzle()

  if (!puzzle) {
    return (
      <main>
        <Header />
        <p className="empty-state">No hay mitología hoy, volvé mañana.</p>
      </main>
    )
  }

  return (
    <main>
      <Header isoDate={isoDate} difficulty={puzzle.difficulty} />
      <Game puzzle={puzzle} mode={getGameMode()} puzzleNumber={puzzleNumber ?? 0} />
    </main>
  )
}

export default App
