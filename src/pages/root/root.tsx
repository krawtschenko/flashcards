import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import style from './root.module.scss'

import { Container } from '../../components/layout/container/contaiter'
import { Header } from '../../components/layout/header/header'
import { Loader } from '../../components/ui/loader/loader'
import { useLogoutMutation, useMeQuery } from '../../features/auth/authApi'

export const Root = () => {
  const { data: meData, isError, isLoading } = useMeQuery()
  const [logout] = useLogoutMutation()

  if (isLoading) {
    return (
      <div className={style.loaderWrapper}>
        <Loader />
      </div>
    )
  }

  return (
    <>
      <Header isAuthenticated={!isError} logout={logout} personalInfo={meData} />
      <Container>
        <Outlet />
      </Container>
      <ToastContainer
        autoClose={5000}
        closeOnClick
        hideProgressBar={false}
        newestOnTop={false}
        pauseOnHover
        position={'bottom-left'}
        rtl={false}
        theme={'dark'}
      />
    </>
  )
}
