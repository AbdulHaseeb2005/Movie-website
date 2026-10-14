// React state and actions for the Favourites screen will be defined here.

import { useCallback, useEffect, useState } from 'react'
import { deleteFavourite, loadFavourites } from './FavouritesModel'
import type { Movie } from '../../types/movie'
import { useAuth } from '../../context/AuthContext'

export function useFavouritesViewModel() {
  const [favourites, setFavourites] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  const loadMovies = useCallback(async () => {
    if (!user) {
      return
    }

    setLoading(true)
    setError(null)

    try {
      const results = await loadFavourites(user.uid)
      setFavourites(results)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    loadMovies()
  }, [loadMovies])

  async function removeMovie(imdbID: string) {
    if (!user) {
      return
    }

    try {
      await deleteFavourite(user.uid, imdbID)
      setFavourites((current) => current.filter((movie) => movie.imdbID !== imdbID))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  return {
    favourites,
    loading,
    error,
    loadMovies,
    removeMovie,
  }
}
