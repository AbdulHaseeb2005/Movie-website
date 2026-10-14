// Firebase configuration and database instance.
// Add your config values to .env (VITE_FIREBASE_*) and restart the dev server.

import { initializeApp } from 'firebase/app'
import { getAuth, type Auth } from 'firebase/auth'
import { getFirestore, doc, setDoc, deleteDoc, getDocs, collection, type Firestore } from 'firebase/firestore'
import type { Movie } from '../types/movie'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)

export const auth: Auth = getAuth(app)
export const db: Firestore = getFirestore(app)

const USERS_COLLECTION = 'users'
const FAVOURITES_COLLECTION = 'favourites'

function requireUserId(userId: string): void {
  if (!userId) {
    throw new Error('userId is required to access favourites.')
  }
}

export async function addFavourite(userId: string, movie: Movie): Promise<void> {
  requireUserId(userId)

  const path = `${USERS_COLLECTION}/${userId}/${FAVOURITES_COLLECTION}/${movie.imdbID}`
  console.log('[firebaseService] addFavourite path:', path)

  try {
    await setDoc(
      doc(db, USERS_COLLECTION, userId, FAVOURITES_COLLECTION, movie.imdbID),
      movie,
    )
    console.log('[firebaseService] addFavourite success')
  } catch (err) {
    console.error('[firebaseService] addFavourite failed:', err)
    throw new Error(`Failed to add favourite: ${(err as Error).message}`)
  }
}

export async function removeFavourite(userId: string, imdbID: string): Promise<void> {
  requireUserId(userId)

  const path = `${USERS_COLLECTION}/${userId}/${FAVOURITES_COLLECTION}/${imdbID}`
  console.log('[firebaseService] removeFavourite path:', path)

  try {
    await deleteDoc(doc(db, USERS_COLLECTION, userId, FAVOURITES_COLLECTION, imdbID))
    console.log('[firebaseService] removeFavourite success')
  } catch (err) {
    console.error('[firebaseService] removeFavourite failed:', err)
    throw new Error(`Failed to remove favourite: ${(err as Error).message}`)
  }
}

export async function getFavourites(userId: string): Promise<Movie[]> {
  requireUserId(userId)

  const path = `${USERS_COLLECTION}/${userId}/${FAVOURITES_COLLECTION}`
  console.log('[firebaseService] getFavourites path:', path)

  try {
    const snapshot = await getDocs(
      collection(db, USERS_COLLECTION, userId, FAVOURITES_COLLECTION),
    )
    const favourites = snapshot.docs.map((doc) => doc.data() as Movie)
    console.log('[firebaseService] getFavourites count:', favourites.length)
    return favourites
  } catch (err) {
    console.error('[firebaseService] getFavourites failed:', err)
    throw new Error(`Failed to load favourites: ${(err as Error).message}`)
  }
}
