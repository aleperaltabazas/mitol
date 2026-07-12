import { useState } from 'react'
import './App.css'
import { getGameMode } from './config/mode'
import { Game } from './components/Game'
import { LaurelSprig } from './components/LaurelSprig'
import { Pediment } from './components/Pediment'
import { PastPuzzleBanner } from './components/PastPuzzleBanner'
import { Column } from './components/Column'
import { PuzzlePicker } from './components/PuzzlePicker'
import { Staircase } from './components/Staircase'
import { difficultyLabel } from './game/difficulty'
import { loadPuzzleForDate, loadTodaysPuzzle } from './game/loadPuzzle'
import { argentinaTodayISO, formatLongDate } from './game/schedule'
import type { Difficulty, GameMode } from './game/types'

interface HeaderProps {
  isoDate?: string
  difficulty?: Difficulty
  todayISO: string
  selectedIsoDate: string
  mode: GameMode
  onSelectDate: (isoDate: string | undefined) => void
}

function Header({ isoDate, difficulty, todayISO, selectedIsoDate, mode, onSelectDate }: HeaderProps) {
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
      <PuzzlePicker todayISO={todayISO} selectedIsoDate={selectedIsoDate} mode={mode} onSelect={onSelectDate} />
      <div className="flourish">
        <LaurelSprig className="laurel" flip />
        <LaurelSprig className="laurel" />
      </div>
    </header>
  )
}

function readDateParam(): string | undefined {
  return new URLSearchParams(window.location.search).get('date') ?? undefined
}

function setDateParam(isoDate: string | undefined) {
  const url = new URL(window.location.href)
  if (isoDate) {
    url.searchParams.set('date', isoDate)
  } else {
    url.searchParams.delete('date')
  }
  window.history.pushState({}, '', url)
}

function App() {
  const [selectedDate, setSelectedDate] = useState<string | undefined>(() => readDateParam())
  const todayISO = argentinaTodayISO()
  const mode = getGameMode()
  const { puzzle, puzzleNumber, isoDate } = selectedDate
    ? loadPuzzleForDate(selectedDate)
    : loadTodaysPuzzle()

  function handleSelectDate(nextDate: string | undefined) {
    setSelectedDate(nextDate)
    setDateParam(nextDate)
  }

  if (!puzzle) {
    return (
      <main>
        <Header
          todayISO={todayISO}
          selectedIsoDate={selectedDate ?? todayISO}
          mode={mode}
          onSelectDate={handleSelectDate}
        />
        <p className="empty-state">No hay mitología hoy, volvé mañana.</p>
      </main>
    )
  }

  return (
    <main>
      <Header
        isoDate={isoDate}
        difficulty={puzzle.difficulty}
        todayISO={todayISO}
        selectedIsoDate={isoDate ?? todayISO}
        mode={mode}
        onSelectDate={handleSelectDate}
      />
      {isoDate && isoDate !== todayISO && (
        <PastPuzzleBanner isoDate={isoDate} onBackToToday={() => handleSelectDate(undefined)} />
      )}
      <Game key={puzzle.id} puzzle={puzzle} mode={mode} puzzleNumber={puzzleNumber ?? 0} />
    </main>
  )
}

export default App
