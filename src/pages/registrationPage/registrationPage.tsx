import style from './registrationPage.module.scss'

import { RegistrationForm } from '../../components/auth/registrationForm/registrationForm'
import { useRegistrationMutation } from '../../features/auth/authApi'
import { Registration } from '../../features/auth/authTypes'
import { path } from '../../routes/path'
import { router } from '../../routes/router'

export const RegistrationPage = () => {
  const [registration, { isSuccess }] = useRegistrationMutation()

  const registrationHandler = async (value: Registration) => {
    try {
      await registration(value)

      if (isSuccess) {
        await router.navigate(path.login)
      } else {
        alert('Error')
      }
    } catch (error) {
      alert(error)
    }
  }

  return <RegistrationForm className={style.registrationPage} registration={registrationHandler} />
}
