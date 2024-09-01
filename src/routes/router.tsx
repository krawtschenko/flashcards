import { Navigate, Outlet, RouteObject, createBrowserRouter } from 'react-router-dom'

import { App } from '../app/App'
import { DecksPage } from '../pages/decksPage/decksPage'
import { path } from './path'

const publicRoutes: RouteObject[] = [
  {
    element: <div>login</div>,
    path: path.login,
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <DecksPage />,
    path: path.decks,
  },
]

export const router = createBrowserRouter([
  { element: <Navigate to={path.decks} />, path: '/' },
  {
    children: [
      {
        children: privateRoutes,
        element: <PrivateRoutes />,
      },
      {
        children: publicRoutes,
        element: <PublicRoutes />,
      },
    ],
    element: <App />,
  },
])

const isAuthenticated = true

function PrivateRoutes() {
  return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />
}

function PublicRoutes() {
  return !isAuthenticated ? <Outlet /> : <Navigate to={path.decks} />
}
