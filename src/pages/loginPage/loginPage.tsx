import { toast } from 'react-toastify'

import style from './loginPage.module.scss'

import { LoginForm, LoginFormValues } from '../../components/auth/loginForm/loginForm'
import { useLoginMutation } from '../../features/auth/authApi'
import { useGenerateColor } from '../../hooks/useGenerateColor'
import { path } from '../../routes/path'
import { router } from '../../routes/router'

export const LoginPage = () => {
  const [login] = useLoginMutation()
  const { lightBackground, textColor } = useGenerateColor()

  const loginHandler = async (value: LoginFormValues) => {
    try {
      await login(value).unwrap()
      await router.navigate(path.decks)

      localStorage.setItem('lightBackground', lightBackground)
      localStorage.setItem('textColor', textColor)
    } catch (error: any) {
      toast.error(error?.data?.message ?? 'Could not sign in')
    }
  }

  return <LoginForm className={style.loginPage} login={loginHandler} />
}
