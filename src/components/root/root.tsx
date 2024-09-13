import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import style from './root.module.scss'

import { useLogoutMutation, useMeQuery } from '../../features/auth/authApi'
import { path } from '../../routes/path'
import { router } from '../../routes/router'
import { Container } from '../layout/container/contaiter'
import { Header } from '../layout/header/header'
import { Loader } from '../ui/loader/loader'

export const Root = () => {
  const { data: meData, isError, isLoading } = useMeQuery()
  const [logout] = useLogoutMutation()

  const logoutHandler = async () => {
    await logout()
    await router.navigate(path.login)
  }

  if (isLoading) {
    return (
      <div className={style.loaderWrapper}>
        <Loader />
      </div>
    )
  }

  return (
    <>
      <Header isAuthenticated={!isError} logout={logoutHandler} personalInfo={meData} />
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
