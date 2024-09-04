import style from './loginPage.module.scss'

import { LoginForm } from '../../components/auth/loginForm/loginForm'
import { useLoginMutation } from '../../features/auth/authApi'

export const LoginPage = () => {
  const [login] = useLoginMutation()

  return <LoginForm className={style.loginPage} onSubmit={login} />
}
