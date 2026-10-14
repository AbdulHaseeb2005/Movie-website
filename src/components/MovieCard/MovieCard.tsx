import { useState } from 'react'
import type { Movie } from '../../types/movie'
import './MovieCard.css'

interface MovieCardProps {
  movie: Movie
  onFavourite?: (movie: Movie) => void
  onRemove?: (imdbID: string) => void
}

function MovieCard({ movie, onFavourite, onRemove }: MovieCardProps) {
  const [posterLoaded, setPosterLoaded] = useState(false)

  return (
    <div className="movie-card">
      <div className="movie-card__poster-wrap">
        {!posterLoaded && <div className="movie-card__poster-skeleton" />}
        <img
          src={movie.Poster}
          alt={`${movie.Title} poster`}
          className="movie-card__poster"
          loading="lazy"
          decoding="async"
          width="300"
          height="450"
          onLoad={() => setPosterLoaded(true)}
        />
      </div>
      <div className="movie-card__info">
        <h3 className="movie-card__title">{movie.Title}</h3>
        <p className="movie-card__meta">
          {movie.Year} · {movie.Type}
        </p>
        {onFavourite && (
          <button
            type="button"
            className="movie-card__fav-btn"
            onClick={() => onFavourite(movie)}
          >
            Favourite
          </button>
        )}
        {onRemove && (
          <button
            type="button"
            className="movie-card__fav-btn movie-card__fav-btn--remove"
            onClick={() => onRemove(movie.imdbID)}
          >
            Remove
          </button>
        )}
      </div>
    </div>
  )
}

export default MovieCard
