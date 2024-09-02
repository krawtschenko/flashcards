import { Navigate, Outlet, RouteObject, createBrowserRouter } from 'react-router-dom'

import { App } from '../app/App'
import { DecksPage } from '../pages/decksPage/decksPage'
import { LoginPage } from '../pages/loginPage/loginPage'
import { RegistrationPage } from '../pages/registrationPage/registrationPage'
import { path } from './path'

const publicRoutes: RouteObject[] = [
  {
    element: <LoginPage />,
    path: path.login,
  },
  {
    element: <RegistrationPage />,
    path: path.registration,
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

const isAuthenticated = false

function PrivateRoutes() {
  return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />
}

function PublicRoutes() {
  return !isAuthenticated ? <Outlet /> : <Navigate to={path.decks} />
}
