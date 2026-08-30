---
name: puzzle-creation
description: Use when writing, completing, or reviewing puzzle files for the Mitol mythology trivia game
---

# Puzzle Creation

## Overview

Five hints, Spanish, broad/obscure → specific/well-known. Calibrate the opening hint to how famous the figure is: famous figures need obscure openers; niche figures can lead with their core identity.

## Difficulty Calibration

| Difficulty | Figure type | Opening hint strategy |
|---|---|---|
| 1–2 | Very niche / regional | Lead with defining trait ("diosa del sol") |
| 3 | Moderately known | Start with a niche fact, reveal role by hint 3 |
| 4 | Known in mythology circles | Start with mythology role, save pop-culture for end |
| 5 | Obscure even to enthusiasts | Open with a secondary trait or obscure connection |

For well-known figures (Zeus, Thor, Medusa): **never open with their defining attribute** — it's an instant giveaway. Start with a secondary role, a niche detail, or a less obvious connection.

## Hint Arc

1. **Broad or niche** — secondary attribute, obscure connection, or cultural niche
2. **Narrative** — most important myth or story role
3. **Physical or structural** — iconic appearance, family, domain
4. **Pop-culture anchor** — book, game, film, or show they appear in
5. **Most identifying** — canonical trait, etymology, or clearest giveaway

Pop-culture references work best at hint 4–5. Prefer references the audience will recognise (Spanish-speaking, Argentina): Rick Riordan, Studio Ghibli, Hades/Hades II, Shakespeare plays taught in school, major Netflix shows.

Legendary and literary figures are valid puzzles alongside mythological ones (Zorro, Robin Hood, Musketeers, etc.) — apply the same hint arc.

## Format Conventions

- Language: **Spanish throughout** — hints and description
- `**bold**` for key concepts within hints
- `*italics*` for titles, foreign words, and original-language proper nouns
- `answers`: first entry is canonical (shown on reveal); include common alternate spellings and accent variants
- `description`: rich prose in Spanish with markdown formatting; can include an *Nota del autor* for personal asides

## Checklist

1. Research the figure — confirm myths, family, domain, pop-culture appearances
2. Pick difficulty using the calibration table
3. Draft hint arc; verify hint 1 is not an instant giveaway at the chosen difficulty
4. Include at least one pop-culture reference (hint 4 or 5)
5. Write `description` in Spanish with markdown
6. Run `npm run puzzle validate <id>` — must pass clean
