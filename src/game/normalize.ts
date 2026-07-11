const COMBINING_MARKS = /[̀-ͯ]/g

const TRANSLITERATIONS: Record<string, string> = {
  ð: 'd',
  þ: 'th',
  æ: 'ae',
  ø: 'o',
}

function transliterate(s: string): string {
  return s.replace(/[ðþæø]/g, (char) => TRANSLITERATIONS[char] ?? char)
}

export function normalizeAnswer(s: string): string {
  return transliterate(s.normalize('NFD').replace(COMBINING_MARKS, '').toLowerCase())
    .trim()
    .replace(/\s+/g, ' ')
}

export function isCorrectGuess(guess: string, answer: string): boolean {
  return normalizeAnswer(guess) === normalizeAnswer(answer)
}
