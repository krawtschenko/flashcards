import style from './registrationPage.module.scss'

import { RegistrationForm } from '../../components/auth/registrationForm/registrationForm'
import { useRegistrationMutation } from '../../features/auth/authApi'
import { Registration } from '../../features/auth/authTypes'
import { path } from '../../routes/path'
import { router } from '../../routes/router'

export const RegistrationPage = () => {
  const [registration] = useRegistrationMutation()

  const registrationHandler = async (value: Registration) => {
    try {
      await registration(value)
      await router.navigate(path.login)
    } catch (error) {
      alert(error)
    }
  }

  return <RegistrationForm className={style.registrationPage} registration={registrationHandler} />
}
