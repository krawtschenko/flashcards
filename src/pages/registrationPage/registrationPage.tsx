import style from './registrationPage.module.scss'

import { RegistrationForm } from '../../components/auth/registrationForm/registrationForm'
export const RegistrationPage = () => {
  return <RegistrationForm className={style.registrationPage} onSubmit={console.log} />
}
