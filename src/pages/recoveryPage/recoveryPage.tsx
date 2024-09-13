import style from './recoveryPage.module.scss'

import { RecoveryForm } from '../../components/auth/recoveryForm/recoveryForm'
import { useRecoveryMutation } from '../../features/auth/authApi'

export const RecoveryPage = () => {
  const [recovery] = useRecoveryMutation()

  return <RecoveryForm className={style.recoveryPage} recovery={recovery} />
}
