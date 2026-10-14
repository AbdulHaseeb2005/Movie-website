// React state and actions for the Home screen will be defined here.

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMovies, initialMovies } from './HomeModel'
import type { Movie } from '../../types/movie'
import { saveFavourite } from '../Favourites/FavouritesModel'
import { useAuth } from '../../context/AuthContext'

export function useHomeViewModel() {
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()
  const navigate = useNavigate()

  async function handleSearch() {
    setLoading(true)
    setError(null)

    try {
      const results = await getMovies(query)
      setMovies(results)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  async function loadInitialMovies() {
    setLoading(true)
    setError(null)

    try {
      const results = await initialMovies()
      setMovies(results)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  async function handleAddFavourite(movie: Movie) {
    if (!user) {
      navigate('/favourites')
      return
    }

    try {
      await saveFavourite(user.uid, movie)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add favourite.')
    }
  }

  return {
    query,
    setQuery,
    movies,
    loading,
    error,
    handleSearch,
    loadInitialMovies,
    handleAddFavourite,
  }
}
