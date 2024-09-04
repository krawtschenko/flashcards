import style from './registrationPage.module.scss'

import { RegistrationForm } from '../../components/auth/registrationForm/registrationForm'
import { useRegistrationMutation } from '../../features/auth/authApi'
export const RegistrationPage = () => {
  const [registration] = useRegistrationMutation()

  return <RegistrationForm className={style.registrationPage} onSubmit={registration} />
}
