import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import style from './loginForm.module.scss'

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
type LoginFormProps = { onSubmit: () => void }

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const { control, handleSubmit } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    resolver: zodResolver(loginSchema),
  })

  return (
    <Card className={style.card}>
      <Typography className={style.title} position={'center'} variant={'h1'}>
        Sign In
      </Typography>

      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
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

        <Typography as={'a'} className={style.forgotLink} position={'end'} variant={'body2'}>
          Forgot Password?
        </Typography>

        <Button className={style.buttonSubmit} fullWidth>
          Sign In
        </Button>
      </form>

      <Typography className={style.text} position={'center'} variant={'body2'}>
        Do not have an account?
      </Typography>

      <Typography as={'a'} className={style.link} position={'center'} variant={'subtitle1'}>
        Sign Up
      </Typography>
    </Card>
  )
}
