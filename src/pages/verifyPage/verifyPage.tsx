import style from './verifyPage.module.scss'

import { VerifyForm } from '../../components/layout/verify/verifyForm'
import { useMeQuery } from '../../features/auth/authApi'

export const VerifyPage = () => {
  const { data: me } = useMeQuery()

  return <VerifyForm className={style.verifyPage} email={me?.email} verify={console.log} />
}
