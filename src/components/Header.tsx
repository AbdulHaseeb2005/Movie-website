import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Header.css'

interface HeaderProps {
  query: string
  setQuery: (query: string) => void
  handleSearch: () => void
  onHomeClick: () => void
}

function Header({ query, setQuery, handleSearch, onHomeClick }: HeaderProps) {
  const { user, logout } = useAuth()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    handleSearch()
  }

  return (
    <header className="header">
      <span className="header__brand">
        <Link to="/" className="header__brand-link" onClick={onHomeClick}>MovieApp</Link>
      </span>
      <nav className="header__nav">
        <Link to="/" className="header__link" onClick={onHomeClick}>Home</Link>
        <Link to="/favourites" className="header__link">Favourites</Link>
        {user && <Link to="/profile" className="header__link">Profile</Link>}
      </nav>
      <form className="header__search" onSubmit={handleSubmit}>
        <input
          type="text"
          className="header__search-input"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="header__search-btn">
          Search
        </button>
      </form>
      {user && (
        <button type="button" className="header__logout" onClick={logout}>
          Logout
        </button>
      )}
    </header>
  )
}

export default Header
