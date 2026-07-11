import './App.css'
import { getGameMode } from './config/mode'
import { Game } from './components/Game'
import { LaurelSprig } from './components/LaurelSprig'
import { Pediment } from './components/Pediment'
import { Column } from './components/Column'
import { Staircase } from './components/Staircase'
import { argentinaTodayISO } from './game/schedule'
import { loadTodaysPuzzle } from './game/loadPuzzle'

function Header() {
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
