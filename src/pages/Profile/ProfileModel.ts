// Profile-specific data types and business logic will be defined here.

import { updateUserEmail, updateUserPassword } from '../../services/authService'

export async function changeEmail(newEmail: string): Promise<void> {
  return updateUserEmail(newEmail)
}

export async function changePassword(
  currentPassword: string,
  newPassword: string,
): Promise<void> {
  return updateUserPassword(currentPassword, newPassword)
}
