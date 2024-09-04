import style from './loginPage.module.scss'

import { LoginForm } from '../../components/auth/loginForm/loginForm'
import { useLoginMutation, useMeQuery } from '../../features/auth/authApi'

export const LoginPage = () => {
  // const me = useMeQuery()
  const [login] = useLoginMutation()

  return <LoginForm className={style.loginPage} onSubmit={login} />
}
