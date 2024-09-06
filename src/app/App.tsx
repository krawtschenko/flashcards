import { Outlet } from 'react-router-dom'

import { Container } from '../components/layout/container/contaiter'
import { Header } from '../components/layout/header/header'
import { useMeQuery } from '../features/auth/authApi'

export function App() {
  const { data: me, isLoading } = useMeQuery()

  if (isLoading) {
    return <div>Loading</div>
  }

  return (
    <>
      <Header personalInfo={me} />
      <Container>
        <Outlet />
      </Container>
    </>
  )
}
