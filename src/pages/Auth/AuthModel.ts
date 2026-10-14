// Auth-specific data types and business logic will be defined here.

import { loginUser, logoutUser, registerUser } from '../../services/authService'
import type { User } from 'firebase/auth'

export interface AuthUser {
  email: string
}

function validateCredentials(email: string, password: string): string {
  const normalizedEmail = email.trim().toLowerCase()

  if (!normalizedEmail || !password) {
    throw new Error('Email and password are required.')
  }

  if (password.length < 6) {
    throw new Error('Password must be at least six characters.')
  }

  return normalizedEmail
}

export async function register(
  email: string,
  password: string,
): Promise<User> {
  const normalizedEmail = validateCredentials(email, password)
  return registerUser(normalizedEmail, password)
}

export async function login(
  email: string,
  password: string,
): Promise<User> {
  const normalizedEmail = validateCredentials(email, password)
  return loginUser(normalizedEmail, password)
}

export async function logout(): Promise<void> {
  await logoutUser()
}
