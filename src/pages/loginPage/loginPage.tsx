import style from './loginPage.module.scss'

import { LoginForm } from '../../components/auth/loginForm/loginForm'

export const LoginPage = () => {
  return <LoginForm className={style.loginPage} onSubmit={console.log} />
}
