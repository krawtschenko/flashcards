import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import style from './root.module.scss'

import { useLogoutMutation, useMeQuery } from '../../features/auth/authApi'
import { Container } from '../layout/container/contaiter'
import { Header } from '../layout/header/header'
import { Loader } from '../ui/loader/loader'

export const Root = () => {
  const { data: me, isError, isLoading } = useMeQuery()
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
      <div id={'side-panel'}></div>

      <Header
        avatar={me?.avatar}
        email={me?.email}
        isAuthenticated={!isError}
        logout={logout}
        name={me?.name}
      />

      <div id={'loader-root'} />

      <div className={style.scrollArea}>
        <Container>
          <Outlet />
        </Container>
      </div>

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
