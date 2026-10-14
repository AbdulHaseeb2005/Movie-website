// Profile screen UI will be rendered here.

import { useProfileViewModel } from './useProfileViewModel'
import './ProfileView.css'

function ProfileView() {
  const {
    user,
    email,
    setEmail,
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    loading,
    message,
    error,
    handleUpdateEmail,
    handleUpdatePassword,
  } = useProfileViewModel()

  function onSubmitEmail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    handleUpdateEmail()
  }

  function onSubmitPassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    handleUpdatePassword()
  }

  return (
    <div className="profile">
      <h1 className="profile__title">Profile</h1>

      <div className="profile__section">
        <h2 className="profile__subtitle">Account</h2>
        <p className="profile__email">
          Signed in as: <span>{user?.email}</span>
        </p>
      </div>

      <form className="profile__form" onSubmit={onSubmitEmail}>
        <h2 className="profile__subtitle">Change Email</h2>
        <input
          type="email"
          className="profile__input"
          placeholder="New email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="profile__submit"
          disabled={loading === 'email'}
        >
          {loading === 'email' ? 'Updating...' : 'Update Email'}
        </button>
      </form>

      <form className="profile__form" onSubmit={onSubmitPassword}>
        <h2 className="profile__subtitle">Change Password</h2>
        <input
          type="password"
          className="profile__input"
          placeholder="Current password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <input
          type="password"
          className="profile__input"
          placeholder="New password (min 6 characters)"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button
          type="submit"
          className="profile__submit"
          disabled={loading === 'password'}
        >
          {loading === 'password' ? 'Updating...' : 'Update Password'}
        </button>
      </form>

      {message && <p className="profile__message">{message}</p>}
      {error && <p className="profile__error">{error}</p>}
    </div>
  )
}

export default ProfileView
