import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import HomeView from './pages/Home/HomeView'
import FavouritesView from './pages/Favourites/FavouritesView'
import AuthView from './pages/Auth/AuthView'
import ProfileView from './pages/Profile/ProfileView'
import { useHomeViewModel } from './pages/Home/useHomeViewModel'
import { useAuth } from './context/AuthContext'

function App() {
  const { query, setQuery, movies, loading, error, handleSearch, loadInitialMovies, handleAddFavourite } =
    useHomeViewModel()
  const { user, authLoading } = useAuth()

  useEffect(() => {
    loadInitialMovies()
  }, [])

  if (authLoading) {
    return <div className="app-loading">Loading...</div>
  }

  return (
    <>
      <Header
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
        onHomeClick={loadInitialMovies}
      />
      <Routes>
        <Route
          path="/"
          element={
            <HomeView
              movies={movies}
              loading={loading}
              error={error}
              onAddFavourite={handleAddFavourite}
            />
          }
        />
        <Route
          path="/favourites"
          element={user ? <FavouritesView /> : <Navigate to="/auth" replace />}
        />
        <Route
          path="/profile"
          element={user ? <ProfileView /> : <Navigate to="/auth" replace />}
        />
        <Route
          path="/auth"
          element={user ? <Navigate to="/" replace /> : <AuthView />}
        />
      </Routes>
    </>
  )
}

export default App
