import { Outlet } from 'react-router-dom'

import { useLogoutMutation, useMeQuery } from '../../features/auth/authApi'
import { path } from '../../routes/path'
import { router } from '../../routes/router'
import { Container } from './container/contaiter'
import { Header } from './header/header'

export const Layout = () => {
  const { data: meData, isError, isLoading } = useMeQuery()
  const [logout] = useLogoutMutation()

  const logoutHandler = async () => {
    await logout()
    await router.navigate(path.login)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Header isAuthenticated={!isError} logout={logoutHandler} personalInfo={meData} />
      <Container>
        <Outlet />
      </Container>
    </>
  )
}
