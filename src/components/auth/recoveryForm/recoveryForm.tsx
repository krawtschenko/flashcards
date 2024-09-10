import { useState } from 'react'
import { Control, UseFormHandleSubmit, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { z } from 'zod'

import style from './recoveryForm.module.scss'

import { CheckEmail } from '../../../assets/icons/checkEmail'
import { path } from '../../../routes/path'
import { Button } from '../../ui/button/button'
import { Card } from '../../ui/card/card'
import { ControlledTextField } from '../../ui/textField/controlledTextField'
import { Typography } from '../../ui/typography/typography'

const recoverySchema = z.object({
  email: z.string().min(1, 'Required').email(),
})

type RecoveryFormValue = z.infer<typeof recoverySchema>

type RecoveryFormProps = {
  className?: string
  onRecovery: (value: RecoveryFormValue) => void
}

export const RecoveryForm = ({ className, onRecovery }: RecoveryFormProps) => {
  const { control, getValues, handleSubmit } = useForm<RecoveryFormValue>({
    defaultValues: { email: '' },
    resolver: zodResolver(recoverySchema),
  })

  const [success, setSuccess] = useState(false)

  const recoveryHandler = (value: RecoveryFormValue) => {
    onRecovery(value)
    setSuccess(true)
  }

  return (
    <Card className={clsx(style.card, className)}>
      {!success && (
        <EmailCheck control={control} handleSubmit={handleSubmit} onRecovery={recoveryHandler} />
      )}

      {success && <Success email={getValues('email')} />}
    </Card>
  )
}

type EmailCheckProps = {
  control: Control<RecoveryFormValue>
  handleSubmit: UseFormHandleSubmit<RecoveryFormValue>
  onRecovery: (value: RecoveryFormValue) => void
}

const EmailCheck = ({ control, handleSubmit, onRecovery }: EmailCheckProps) => {
  return (
    <>
      <Typography position={'center'} variant={'h1'}>
        Forgot your password?
      </Typography>

      <form className={style.form} onSubmit={handleSubmit(onRecovery)}>
        <ControlledTextField control={control} label={'Email'} name={'email'} />

        <Typography className={style.instructions} position={'start'} variant={'body2'}>
          Enter your email address and we will send you further instructions
        </Typography>

        <Button className={style.buttonSubmit} fullWidth>
          Send Instructions
        </Button>
      </form>

      <Typography className={style.text} position={'center'} variant={'body2'}>
        Did you remember your password?
      </Typography>

      <Typography
        as={Link}
        className={style.link}
        position={'center'}
        to={path.login}
        variant={'subtitle1'}
      >
        Try logging in
      </Typography>
    </>
  )
}

type SuccessProps = {
  email: string
}

const Success = ({ email }: SuccessProps) => {
  return (
    <>
      <Typography position={'center'} variant={'h1'}>
        Check Email
      </Typography>

      <CheckEmail className={style.icon} />

      <Typography className={style.info} position={'center'} variant={'body2'}>
        {`We’ve sent an Email with instructions to ${email}`}
      </Typography>

      <Button as={Link} className={style.buttonSubmitSuc} fullWidth to={path.login}>
        Back to Sign In
      </Button>
    </>
  )
}
