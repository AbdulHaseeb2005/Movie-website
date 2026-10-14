// Home screen UI will be rendered here.

import type { Movie } from '../../types/movie'
import MovieCard from '../../components/MovieCard/MovieCard'
import './HomeView.css'

interface HomeViewProps {
  movies: Movie[]
  loading: boolean
  error: string | null
  onAddFavourite: (movie: Movie) => void
}

function HomeView({ movies, loading, error, onAddFavourite }: HomeViewProps) {
  return (
    <div className="home">
      {loading && <p className="home__loading">Loading...</p>}

      {error && <p className="home__error">{error}</p>}

      {!loading && !error && movies.length === 0 && (
        <p className="home__empty">Search for movies to see results.</p>
      )}

      {!loading && !error && movies.length > 0 && (
        <ul className="home__movie-list">
          {movies.map((movie) => (
            <li key={movie.imdbID}>
              <MovieCard movie={movie} onFavourite={onAddFavourite} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default HomeView
