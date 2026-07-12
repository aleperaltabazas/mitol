# Mitol

Daily mythology-trivia guessing game (Wordle/Connections-style). Players get 5 authored hints
(vague → specific) and try to guess a mythological figure.

## Stack

React 18 + TypeScript + Vite, Vitest + @testing-library/react for tests, `tsx` for scripts,
JSON5 for content files. UI language is Spanish.

## Commands

- `npm run dev` — dev server
- `npm run test` — `vitest run` (not watch mode)
- `npm run build` — `tsc -b && vite build`
- `npm run puzzle new <id>` / `npm run puzzle validate [id]` — author/validate puzzle files

## Architecture

- `src/game/` — framework-agnostic core: types, answer normalization, schedule resolution,
  puzzle loading, the two game-mode engines (`game/modes/`), and share-text generation.
  Fully unit-tested, no React.
- `src/components/` — thin React layer. Components call through `game/modes/engine.ts`'s
  `getEngine(mode)` seam rather than containing game logic themselves.
- `src/config/mode.ts` — reads `VITE_GAME_MODE` (dev-only flag, not yet a public setting).

## Data model

- `schedule.json5` (repo root): ISO date → puzzle id. "Today" is resolved in Argentina time.
- `puzzles/<id>.json5`: one file per puzzle, exactly 5 fixed hints + a canonical `answer`, plus
  a `difficulty` rating (1–5, see `game/difficulty.ts` for the Spanish labels).
- Answer matching is case/whitespace/diacritic-insensitive (see `game/normalize.ts`), but has
  no fuzzy typo tolerance.
- Greek and Roman names for the same figure (e.g. Zeus/Jupiter) are treated as **distinct**
  puzzle answers, not aliases — one can be a hint for the other.

## Game modes

Two interchangeable modes behind the same engine interface, switched via `VITE_GAME_MODE` for
the author's own A/B testing — not yet user-facing:

- **progressive**: 5 guesses, 1:1 locked with the 5 hints. Each guess or skip reveals the next
  hint. Exhausting all 5 without the answer is a loss.
- **unlimited**: unlimited guesses, no loss state (win or give up only). Hint 1 is free; hints
  2–5 require an explicit "reveal next hint" action, not triggered by guessing. After hint 5,
  that button becomes a confirm-required "Rendirse" (give up).

## Conventions

- TDD: game logic changes should have a failing test written first. Component tests are
  smoke-level only — detailed logic belongs in `game/` unit tests, not duplicated in component
  tests.
- No fuzzy/typo-tolerant matching — normalization only (diacritics/case/whitespace).
- Third-party visual assets (the temple/laurel SVGs) are tracked with license info in
  `ATTRIBUTION.md` — check it before adding or modifying those.
- The header temple is deliberately split into `Pediment`/`Column`/`Staircase` (one shared
  source coordinate space, sliced at the seams) instead of one image, so the title can sit
  inscribed between two columns. Placement here is still being iterated — don't assume the
  current layout is final without asking.
