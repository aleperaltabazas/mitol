import { describe, expect, it } from 'vitest'
import { isCorrectGuess, normalizeAnswer } from './normalize'

describe('normalizeAnswer', () => {
  it('lowercases', () => {
    expect(normalizeAnswer('Zeus')).toBe(normalizeAnswer('zeus'))
  })

  it('strips standard accents', () => {
    expect(normalizeAnswer('nahüel')).toBe(normalizeAnswer('Nahuel'))
  })

  it('transliterates eth and thorn (Norse letters)', () => {
    expect(normalizeAnswer('Óðinn')).toBe(normalizeAnswer('Odinn'))
  })

  it('trims and collapses internal whitespace', () => {
    expect(normalizeAnswer('  Zeus   Olímpico  ')).toBe(normalizeAnswer('zeus olimpico'))
  })
})

describe('isCorrectGuess', () => {
  it('matches case/diacritic-insensitively', () => {
    expect(isCorrectGuess('odinn', ['Óðinn'])).toBe(true)
  })

  it('rejects a genuinely different answer', () => {
    expect(isCorrectGuess('Jupiter', ['Zeus'])).toBe(false)
  })

  it('matches any of several accepted answers', () => {
    expect(isCorrectGuess('susano', ['Susanoo', 'Susano'])).toBe(true)
    expect(isCorrectGuess('susanoo', ['Susanoo', 'Susano'])).toBe(true)
  })

  it('rejects a guess that matches none of several accepted answers', () => {
    expect(isCorrectGuess('amaterasu', ['Susanoo', 'Susano'])).toBe(false)
  })
})
