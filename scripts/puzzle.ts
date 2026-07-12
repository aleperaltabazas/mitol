import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import JSON5 from 'json5'
import type { Puzzle } from '../src/game/types'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const PUZZLES_DIR = join(ROOT, 'puzzles')
const SCHEDULE_PATH = join(ROOT, 'schedule.json5')

function loadSchedule(): Record<string, string> {
  return JSON5.parse(readFileSync(SCHEDULE_PATH, 'utf-8'))
}

function puzzleFiles(): string[] {
  return readdirSync(PUZZLES_DIR).filter((f) => f.endsWith('.json5'))
}

function validatePuzzleShape(id: string, data: unknown): string[] {
  const errors: string[] = []
  if (typeof data !== 'object' || data === null) {
    return [`${id}: no es un objeto JSON5 válido`]
  }
  const puzzle = data as Partial<Puzzle>
  if (typeof puzzle.id !== 'string' || puzzle.id.length === 0) {
    errors.push(`${id}: falta el campo "id" o está vacío`)
  } else if (puzzle.id !== id) {
    errors.push(`${id}: el campo "id" ("${puzzle.id}") no coincide con el nombre de archivo`)
  }
  if (typeof puzzle.answer !== 'string' || puzzle.answer.trim().length === 0) {
    errors.push(`${id}: falta el campo "answer" o está vacío`)
  }
  if (!Array.isArray(puzzle.hints) || puzzle.hints.length !== 5) {
    errors.push(`${id}: "hints" debe ser un array de exactamente 5 elementos`)
  } else if (puzzle.hints.some((h) => typeof h !== 'string' || h.trim().length === 0)) {
    errors.push(`${id}: todas las "hints" deben ser strings no vacíos`)
  }
  if (typeof puzzle.description !== 'string' || puzzle.description.trim().length === 0) {
    errors.push(`${id}: falta el campo "description" o está vacío`)
  }
  if (
    typeof puzzle.difficulty !== 'number' ||
    !Number.isInteger(puzzle.difficulty) ||
    puzzle.difficulty < 1 ||
    puzzle.difficulty > 5
  ) {
    errors.push(`${id}: "difficulty" debe ser un entero entre 1 y 5`)
  }
  if (puzzle.imageUrl !== undefined && (typeof puzzle.imageUrl !== 'string' || puzzle.imageUrl.trim().length === 0)) {
    errors.push(`${id}: "imageUrl", si está presente, debe ser un string no vacío`)
  }
  return errors
}

function cmdNew(id: string): void {
  if (!id) {
    console.error('Uso: puzzle new <id>')
    process.exit(1)
  }
  if (!existsSync(PUZZLES_DIR)) {
    mkdirSync(PUZZLES_DIR, { recursive: true })
  }
  const path = join(PUZZLES_DIR, `${id}.json5`)
  if (existsSync(path)) {
    console.error(`Ya existe puzzles/${id}.json5`)
    process.exit(1)
  }
  const stub: Puzzle = { id, answer: '', hints: ['', '', '', '', ''], description: '', difficulty: 3 }
  writeFileSync(path, JSON5.stringify(stub, null, 2) + '\n')
  console.log(`Creado puzzles/${id}.json5`)
  console.log(`Recordá agregar "${id}" a schedule.json5`)
}

function cmdValidate(onlyId?: string): void {
  const files = onlyId ? [`${onlyId}.json5`] : puzzleFiles()
  const errors: string[] = []
  const warnings: string[] = []
  const validIds = new Set<string>()

  for (const file of files) {
    const id = file.replace(/\.json5$/, '')
    const path = join(PUZZLES_DIR, file)
    if (!existsSync(path)) {
      errors.push(`${id}: puzzles/${file} no existe`)
      continue
    }
    let data: unknown
    try {
      data = JSON5.parse(readFileSync(path, 'utf-8'))
    } catch (e) {
      errors.push(`${id}: JSON5 inválido (${(e as Error).message})`)
      continue
    }
    const shapeErrors = validatePuzzleShape(id, data)
    if (shapeErrors.length === 0) {
      validIds.add(id)
    }
    errors.push(...shapeErrors)
  }

  const schedule = loadSchedule()
  const scheduledIds = new Set(Object.values(schedule))

  for (const [date, id] of Object.entries(schedule)) {
    if (!existsSync(join(PUZZLES_DIR, `${id}.json5`))) {
      errors.push(`schedule.json5: "${date}" apunta a "${id}", pero puzzles/${id}.json5 no existe`)
    }
  }

  if (!onlyId) {
    for (const id of validIds) {
      if (!scheduledIds.has(id)) {
        warnings.push(`${id}: no está referenciado en schedule.json5`)
      }
    }
    const seen = new Map<string, string[]>()
    for (const [date, id] of Object.entries(schedule)) {
      seen.set(id, [...(seen.get(id) ?? []), date])
    }
    for (const [id, dates] of seen) {
      if (dates.length > 1) {
        warnings.push(`${id}: programado en múltiples fechas (${dates.join(', ')})`)
      }
    }
  }

  for (const w of warnings) {
    console.warn(`⚠ ${w}`)
  }
  for (const e of errors) {
    console.error(`✗ ${e}`)
  }

  if (errors.length > 0) {
    process.exit(1)
  }
  console.log(`OK — ${files.length} acertijo(s) validado(s), ${warnings.length} advertencia(s)`)
}

const [, , command, arg] = process.argv

switch (command) {
  case 'new':
    cmdNew(arg)
    break
  case 'validate':
    cmdValidate(arg)
    break
  default:
    console.error('Uso: puzzle <new|validate> [id]')
    process.exit(1)
}
