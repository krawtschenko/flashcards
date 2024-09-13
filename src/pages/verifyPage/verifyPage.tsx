import { toast } from 'react-toastify'

import style from './verifyPage.module.scss'

import { VerifyForm, VerifyFormValue } from '../../components/layout/verify/verifyForm'
import { useConfirmEmailMutation, useMeQuery } from '../../features/auth/authApi'
import { path } from '../../routes/path'
import { router } from '../../routes/router'

export const VerifyPage = () => {
  const { data: me } = useMeQuery()
  const [confirmEmail] = useConfirmEmailMutation()

  const confirmEmailHandler = async (value: VerifyFormValue) => {
    try {
      await confirmEmail(value).unwrap()
      toast.success('Email successfully confirmed')
      await router.navigate(path.profile)
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  return (
    <VerifyForm className={style.verifyPage} confirmEmail={confirmEmailHandler} email={me?.email} />
  )
}
