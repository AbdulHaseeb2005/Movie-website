// Firebase Authentication service.
// Add your config values to .env (VITE_FIREBASE_*) and restart the dev server.

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  type User,
  type UserCredential,
} from 'firebase/auth'
import { auth } from './firebaseService'

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) {
    const code = (err as { code?: string }).code
    switch (code) {
      case 'auth/email-already-in-use':
        return 'This email is already registered.'
      case 'auth/invalid-email':
        return 'The email address is not valid.'
      case 'auth/weak-password':
        return 'The password is too weak. Use at least 6 characters.'
      case 'auth/user-not-found':
        return 'No account found with this email.'
      case 'auth/wrong-password':
        return 'Incorrect password.'
      case 'auth/invalid-credential':
        return 'Invalid email or password.'
      case 'auth/requires-recent-login':
        return 'Please sign in again before making this change.'
      case 'auth/operation-not-allowed':
        return 'This action is not allowed. Contact support.'
      default:
        return err.message
    }
  }
  return 'Something went wrong.'
}

export async function registerUser(
  email: string,
  password: string,
): Promise<User> {
  try {
    const credential: UserCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    )
    return credential.user
  } catch (err) {
    throw new Error(getErrorMessage(err))
  }
}

export async function loginUser(
  email: string,
  password: string,
): Promise<User> {
  try {
    const credential: UserCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    )
    return credential.user
  } catch (err) {
    throw new Error(getErrorMessage(err))
  }
}

export async function logoutUser(): Promise<void> {
  try {
    await signOut(auth)
  } catch (err) {
    throw new Error(getErrorMessage(err))
  }
}

export function subscribeToAuthChanges(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback)
}

export async function updateUserEmail(newEmail: string): Promise<void> {
  const user = auth.currentUser

  if (!user) {
    throw new Error('You must be signed in to update your email.')
  }

  try {
    await updateEmail(user, newEmail)
  } catch (err) {
    throw new Error(getErrorMessage(err))
  }
}

export async function updateUserPassword(
  currentPassword: string,
  newPassword: string,
): Promise<void> {
  const user = auth.currentUser

  if (!user) {
    throw new Error('You must be signed in to update your password.')
  }

  try {
    if (!user.email) {
      throw new Error('Unable to verify your identity: no email on this account.')
    }

    const credential = EmailAuthProvider.credential(user.email, currentPassword)
    await reauthenticateWithCredential(user, credential)
    await updatePassword(user, newPassword)
  } catch (err) {
    throw new Error(getErrorMessage(err))
  }
}
