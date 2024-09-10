import { Navigate, Outlet, RouteObject, createBrowserRouter } from 'react-router-dom'

import { Root } from '../components/layout/root/root'
import { DecksPage } from '../pages/decksPage/decksPage'
import { ErrorPage } from '../pages/errorPage/errorPage'
import { LoginPage } from '../pages/loginPage/loginPage'
import { ProfilePage } from '../pages/profilePage/profilePage'
import { RecoveryPage } from '../pages/recoveryPage/recoveryPage'
import { RegistrationPage } from '../pages/registrationPage/registrationPage'
import { path } from './path'

const publicRoutes: RouteObject[] = [
  { element: <LoginPage />, path: path.login },
  { element: <RegistrationPage />, path: path.registration },
  { element: <RecoveryPage />, path: path.recovery },
]

const privateRoutes: RouteObject[] = [
  { element: <DecksPage />, path: path.decks },
  { element: <ProfilePage />, path: path.profile },
]

export const router = createBrowserRouter([
  { element: <Navigate to={path.decks} />, path: '/' },
  {
    children: [
      { children: privateRoutes, element: <PrivateRoutes /> },
      { children: publicRoutes, element: <PublicRoutes /> },
      { element: <ErrorPage />, path: '*' },
    ],
    element: <Root />,
  },
])

function PrivateRoutes() {
  const accessToken = localStorage.getItem('accessToken')

  return accessToken ? <Outlet /> : <Navigate to={path.login} />
}

function PublicRoutes() {
  const accessToken = localStorage.getItem('accessToken')

  return !accessToken ? <Outlet /> : <Navigate to={path.decks} />
}
