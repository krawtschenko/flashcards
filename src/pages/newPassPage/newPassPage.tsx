import style from './newPassPage.module.scss'

import { NewPassForm } from '../../components/auth/newPassForm/newPassForm'
import { useResetPasswordMutation } from '../../features/auth/authApi'
import { path } from '../../routes/path'
import { router } from '../../routes/router'

export const NewPassPage = () => {
  const [resetPassword] = useResetPasswordMutation()

  const resetPasswordHandler = async (value: { password: string; token: string }) => {
    try {
      await resetPassword(value)
      await router.navigate(path.login)
    } catch (error) {
      /* empty */
    }
  }

  return <NewPassForm className={style.newPassPage} onReset={resetPasswordHandler} />
}