import { Outlet } from 'react-router-dom'

import { useLogoutMutation, useMeQuery } from '../../features/auth/authApi'
import { Container } from './container/contaiter'
import { Header } from './header/header'

export const Layout = () => {
  const { data: me, isLoading } = useMeQuery()
  const [logout] = useLogoutMutation()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Header logout={logout} personalInfo={me} />
      <Container>
        <Outlet />
      </Container>
    </>
  )
}
