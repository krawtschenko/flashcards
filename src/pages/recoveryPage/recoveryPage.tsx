import { useState } from 'react'
import { toast } from 'react-toastify'

import style from './recoveryPage.module.scss'

import { RecoveryForm, RecoveryFormValue } from '../../components/auth/recoveryForm/recoveryForm'
import { useRecoveryMutation } from '../../features/auth/authApi'

export const RecoveryPage = () => {
  const [recovery] = useRecoveryMutation()
  const [isSuccess, setIsSuccess] = useState(false)

  const recoveryHandler = async (value: RecoveryFormValue) => {
    try {
      await recovery(value).unwrap()
      setIsSuccess(true)
    } catch (error: any) {
      toast.error(error.data.message ?? 'Something went wrong')
    }
  }

  return (
    <RecoveryForm className={style.recoveryPage} isSuccess={isSuccess} recovery={recoveryHandler} />
  )
}
