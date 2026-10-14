// React state and actions for the Profile screen will be defined here.

import { useState } from 'react'
import { changeEmail, changePassword } from './ProfileModel'
import { useAuth } from '../../context/AuthContext'

export function useProfileViewModel() {
  const { user } = useAuth()

  const [email, setEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [loading, setLoading] = useState<'email' | 'password' | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleUpdateEmail() {
    if (!email) {
      setError('Please enter a new email address.')
      return
    }

    setLoading('email')
    setMessage(null)
    setError(null)

    try {
      await changeEmail(email.trim())
      setMessage('Email updated successfully.')
      setEmail('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update email.')
    } finally {
      setLoading(null)
    }
  }

  async function handleUpdatePassword() {
    if (!currentPassword || !newPassword) {
      setError('Please fill in both password fields.')
      return
    }

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters.')
      return
    }

    setLoading('password')
    setMessage(null)
    setError(null)

    try {
      await changePassword(currentPassword, newPassword)
      setMessage('Password updated successfully.')
      setCurrentPassword('')
      setNewPassword('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update password.')
    } finally {
      setLoading(null)
    }
  }

  return {
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
  }
}
