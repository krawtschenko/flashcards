import style from './verifyPage.module.scss'

import { VerifyForm, VerifyFormValue } from '../../components/layout/verify/verifyForm'
import { useConfirmEmailMutation, useMeQuery } from '../../features/auth/authApi'
import { path } from '../../routes/path'
import { router } from '../../routes/router'

export const VerifyPage = () => {
  const { data: me } = useMeQuery()
  const [confirmEmail, { isSuccess }] = useConfirmEmailMutation()

  const confirmEmailHandler = async (value: VerifyFormValue) => {
    try {
      await confirmEmail(value)

      if (isSuccess) {
        await router.navigate(path.profile)
      } else {
        alert('Error')
      }
    } catch (error) {
      alert(error)
    }
  }

  return <VerifyForm className={style.verifyPage} email={me?.email} verify={confirmEmailHandler} />
}
