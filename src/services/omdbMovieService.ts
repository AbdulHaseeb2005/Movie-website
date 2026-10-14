// This file contains all communication with the OMDb API.

import type { Movie, OmdbSearchResponse } from '../types/movie'

const API_URL = 'https://www.omdbapi.com/'
const API_KEY = import.meta.env.VITE_OMDB_API_KEY as string
console.log('[omdbMovieService] API key loaded:', API_KEY ? `"${API_KEY}"` : 'MISSING')

export async function searchMovies(query: string): Promise<Movie[]> {
  const url = `${API_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}`
  console.log('[omdbMovieService] Fetching:', url)

  const response = await fetch(url)
  console.log('[omdbMovieService] Response status:', response.status)

  if (!response.ok) {
    console.error('[omdbMovieService] HTTP error:', response.status, response.statusText)
    throw new Error(`HTTP error: ${response.status} ${response.statusText}`)
  }

  const data: OmdbSearchResponse = await response.json()
  console.log('[omdbMovieService] Raw response:', data)

  if (data.Response === 'False') {
    console.error('[omdbMovieService] OMDb error:', data.Error)
    throw new Error(data.Error ?? 'No results found.')
  }

  console.log('[omdbMovieService] Movies found:', data.Search?.length ?? 0)
  return data.Search ?? []
}
