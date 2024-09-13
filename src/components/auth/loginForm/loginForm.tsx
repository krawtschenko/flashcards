import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { z } from 'zod'

import style from './loginForm.module.scss'

import { path } from '../../../routes/path'
import { Button } from '../../ui/button/button'
import { Card } from '../../ui/card/card'
import { ControlledCheckbox } from '../../ui/checkbox/controlledCheckbox'
import { ControlledTextField } from '../../ui/textField/controlledTextField'
import { Typography } from '../../ui/typography/typography'

const loginSchema = z.object({
  email: z.string().min(1, 'Required').email(),
  password: z.string().min(1, 'Required'),
  rememberMe: z.boolean().optional(),
})

export type LoginFormValues = z.infer<typeof loginSchema>

type LoginFormProps = {
  className?: string
  login: (value: LoginFormValues) => void
}

export const LoginForm = ({ className, login }: LoginFormProps) => {
  const { control, handleSubmit } = useForm<LoginFormValues>({
    defaultValues: {
      email: 'kravchenko.eugene@outlook.com',
      password: '12345',
      rememberMe: true,
    },
    resolver: zodResolver(loginSchema),
  })

  return (
    <Card className={clsx(style.card, className)}>
      <Typography position={'center'} variant={'h1'}>
        Sign In
      </Typography>

      <form className={style.form} onSubmit={handleSubmit(login)}>
        <ControlledTextField control={control} label={'Email'} name={'email'} />

        <ControlledTextField
          className={style.password}
          control={control}
          label={'Password'}
          name={'password'}
          type={'password'}
        />

        <ControlledCheckbox
          className={style.checkbox}
          control={control}
          label={'Remember me'}
          name={'rememberMe'}
        />

        <Typography
          as={Link}
          className={style.forgotLink}
          position={'end'}
          to={path.recovery}
          variant={'body2'}
        >
          Forgot Password?
        </Typography>

        <Button className={style.buttonSubmit} fullWidth>
          Sign In
        </Button>
      </form>

      <Typography className={style.text} position={'center'} variant={'body2'}>
        Do not have an account?
      </Typography>

      <Typography
        as={Link}
        className={style.link}
        position={'center'}
        to={path.registration}
        variant={'subtitle1'}
      >
        Sign Up
      </Typography>
    </Card>
  )
}
