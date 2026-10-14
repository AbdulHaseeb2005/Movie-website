// Home-specific data types and business logic will be defined here.

import { searchMovies } from '../../services/omdbMovieService'
import type { Movie } from '../../types/movie'

export type { Movie } from '../../types/movie'

export async function getMovies(query: string): Promise<Movie[]> {
  const trimmedQuery = query.trim()

  if (trimmedQuery.length < 2) {
    throw new Error('Search query must contain at least two characters.')
  }

  return searchMovies(trimmedQuery)
}

const INITIAL_KEYWORDS = [
  'Batman',
  'Avengers',
  'Harry Potter',
  'Star Wars',
  'Spider-Man',
  'Marvel',
  'Disney',
  'Matrix',
  'Lord of the Rings',
  'Fast',
  'Mission Impossible',
  'Pixar',
  'Horror',
  'Comedy',
  'Action',
]

const INITIAL_MOVIES_COUNT = 20

function shuffle<T>(items: T[]): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = result[i]
    result[i] = result[j]
    result[j] = temp
  }
  return result
}

export async function initialMovies(): Promise<Movie[]> {
  const keywords = shuffle(INITIAL_KEYWORDS).slice(0, 8)

  const results = await Promise.all(
    keywords.map((keyword) => searchMovies(keyword).catch(() => [])),
  )

  const merged = results.flat()

  const unique = Array.from(
    new Map(merged.map((movie) => [movie.imdbID, movie])).values(),
  )

  return shuffle(unique).slice(0, INITIAL_MOVIES_COUNT)
}
