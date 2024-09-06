import { Outlet } from 'react-router-dom'

import { useMeQuery } from '../../features/auth/authApi'
import { Container } from './container/contaiter'
import { Header } from './header/header'

export const Layout = () => {
  const { data: me } = useMeQuery()

  return (
    <>
      <Header personalInfo={me} />
      <Container>
        <Outlet />
      </Container>
    </>
  )
}
