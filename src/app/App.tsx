import { Outlet } from 'react-router-dom'

import { Container } from '../components/layout/container/contaiter'
import { Header } from '../components/layout/header/header'

export function App() {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
  )
}
