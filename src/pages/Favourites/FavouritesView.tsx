// Favourites screen UI will be rendered here.

import { useFavouritesViewModel } from './useFavouritesViewModel'
import MovieCard from '../../components/MovieCard/MovieCard'
import './FavouritesView.css'

function FavouritesView() {
  const { favourites, loading, error, removeMovie } = useFavouritesViewModel()

  return (
    <div className="favourites">
      <h1 className="favourites__title">My Favourites</h1>

      {loading && <p className="favourites__loading">Loading...</p>}

      {error && <p className="favourites__error">{error}</p>}

      {!loading && !error && favourites.length === 0 && (
        <p className="favourites__empty">
          You haven't added any favourite movies yet.
        </p>
      )}

      {!loading && !error && favourites.length > 0 && (
        <ul className="favourites__list">
          {favourites.map((movie) => (
            <li key={movie.imdbID}>
              <MovieCard movie={movie} onRemove={removeMovie} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default FavouritesView
