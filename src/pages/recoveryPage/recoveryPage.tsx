import style from './recoveryPage.module.scss'

import { RecoveryForm } from '../../components/auth/recoveryForm/recoveryForm'

export const RecoveryPage = () => {
  return <RecoveryForm className={style.recoveryPage} onCheckEmail={console.log} />
}
