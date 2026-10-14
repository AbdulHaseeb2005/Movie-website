# MovieApp — Internship React Session

A movie discovery app built with **React + TypeScript + Vite**, following an MVVM structure. Searches movies via the **OMDb API**, stores per-user favourites in **Firebase (Cloud Firestore)**, and handles **Firebase Auth** (email/password).

## Stack

- Vite (React 19 + TypeScript)
- react-router-dom (Routing)
- Firebase (Auth + Cloud Firestore)
- OMDb API (Movie data)

## Scripts

```bash
npm run dev       # start dev server
npm run build     # typecheck + production build
npm run lint      # oxlint
npm run preview   # preview production build
```

## Folder structure

```
src/
├── components/        # Reusable UI (Header, MovieCard)
├── context/           # AuthContext (user, authLoading, logout)
├── pages/             # MVVM feature folders (Model / ViewModel / View)
│   ├── Home/
│   ├── Favourites/
│   └── Auth/
├── services/          # Firebase, Auth, OMDb service layer
├── types/             # Shared types (Movie, OmdbSearchResponse)
├── App.tsx            # Routes + auth-protected routing
└── main.tsx           # Entry (StrictMode > BrowserRouter > AuthProvider)
```

## Environment variables

Copy `.env.example` to `.env` and fill in your Firebase config and OMDb API key:

```
VITE_OMDB_API_KEY=
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

## Routes

| Route         | Access   | Description                                  |
| ------------- | -------- | -------------------------------------------- |
| `/`           | Public   | Home page with movie search + grid           |
| `/favourites` | Protected| Signed-in user's saved favourites            |
| `/auth`       | Guest    | Login / Register (redirects to `/` if signed in) |

Favourites are stored per user at: `users/{userId}/favourites/{imdbID}`.

## Firestore security

Make sure to set Firestore rules so users can only read/write their own favourites, e.g.:

```text
match /users/{userId}/favourites/{imdbID} {
  allow read, write: if request.auth.uid == userId;
}
```

---

## Prompts used to build this app

1. Scaffold a React + TypeScript project with Vite.
2. Clean up the template boilerplate and set up the project structure.
3. Add the OMDb API integration in a service that searches movies by title.
4. Build the Home screen (Model / ViewModel / View) with a search box and a grid of movie cards.
5. Show a set of initial movies on the Home screen from a few seeded search keywords.
6. Create a reusable `MovieCard` component for displaying a movie.
7. Build the Favourites screen with Model / ViewModel / View.
8. Add a "favourite" action on each movie card.
9. Set up Firebase in the project (config via `.env`).
10. Initialize Cloud Firestore and create `firebaseService` with favourite add / remove / get functions.
11. Create `authService` with register, login, logout, and auth-state subscription.
12. Build the Auth screen (login / register) with Model / ViewModel / View.
13. Create an `AuthContext` (with `AuthProvider` + `useAuth`) exposing `user`, `authLoading`, and `logout`.
14. Move shared types (`Movie`, `OmdbSearchResponse`) into `src/types/movie.ts`.
15. Extract `AuthProviderProps` into a named interface in `AuthContext.tsx`.
16. Update the application routing:
    - add an `/auth` route that displays `AuthView`
    - keep HomeView public
    - protect the `/favourites` route
    - redirect unauthenticated users from `/favourites` to `/auth`
    - redirect authenticated users from `/auth` to `/`
    - preserve the Header on every page
    - use `user` and `authLoading` from `AuthContext`
17. If unauthenticated and the user clicks the favourite button on Home, redirect them to the favourites page.
18. Move that redirect logic into the Home `useHomeViewModel`.
19. Update the favourites service so favourites are stored under the signed-in user's profile:
    - structure: `users/{userId}/favourites/{imdbID}`
    - `addFavourite(userId, movie)`, `removeFavourite(userId, imdbID)`, `getFavourites(userId)`
    - use `userId` as the parent user document ID and `imdbID` as the favourite document ID
    - throw a readable error when `userId` is missing.
20. Add a logout button in the Header and connect it to the `logout` function.
21. Create a README listing all the prompts used for this app.
