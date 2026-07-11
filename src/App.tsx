import './App.css'
import { getGameMode } from './config/mode'
import { Game } from './components/Game'
import { LaurelSprig } from './components/LaurelSprig'
import { TempleGraphic } from './components/TempleGraphic'
import { argentinaTodayISO } from './game/schedule'
import { loadTodaysPuzzle } from './game/loadPuzzle'

function Header() {
  return (
    <header className="header">
      <TempleGraphic className="temple-graphic" />
      <h1 className="title">Mitol</h1>
      <div className="flourish">
        <LaurelSprig className="laurel" flip />
        <LaurelSprig className="laurel" />
      </div>
    </header>
  )
}

function App() {
  const { puzzle } = loadTodaysPuzzle()

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
      <Header />
      <Game puzzle={puzzle} mode={getGameMode()} isoDate={argentinaTodayISO()} />
    </main>
  )
}

export default App
