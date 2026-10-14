// Auth screen UI will be rendered here.

import { useAuthViewModel } from './useAuthViewModel'
import './AuthView.css'

function AuthView() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    mode,
    loading,
    error,
    handleSubmit,
    toggleMode,
  } = useAuthViewModel()

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    handleSubmit()
  }

  return (
    <div className="auth">
      <h1 className="auth__title">
        {mode === 'login' ? 'Login' : 'Create Account'}
      </h1>

      <form className="auth__form" onSubmit={onSubmit}>
        <input
          type="email"
          className="auth__input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="auth__input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="auth__error">{error}</p>}

        <button type="submit" className="auth__submit" disabled={loading}>
          {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Create Account'}
        </button>
      </form>

      <button type="button" className="auth__toggle" onClick={toggleMode}>
        {mode === 'login'
          ? "Don't have an account? Register"
          : 'Already have an account? Login'}
      </button>
    </div>
  )
}

export default AuthView
