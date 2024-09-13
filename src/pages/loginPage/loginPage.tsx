import style from './loginPage.module.scss'

import { LoginForm, LoginFormValues } from '../../components/auth/loginForm/loginForm'
import { useLoginMutation } from '../../features/auth/authApi'
import { path } from '../../routes/path'
import { router } from '../../routes/router'

export const LoginPage = () => {
  const [login] = useLoginMutation()

  const loginHandler = async (value: LoginFormValues) => {
    try {
      await login(value)
      await router.navigate(path.decks)
    } catch (error) {
      /* empty */
    }
  }

  return <LoginForm className={style.loginPage} login={loginHandler} />
}
