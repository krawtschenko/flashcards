import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { z } from 'zod'

import style from './registrationForm.module.scss'

import { Registration } from '../../../features/auth/authTypes'
import { path } from '../../../routes/path'
import { Button } from '../../ui/button/button'
import { Card } from '../../ui/card/card'
import { ControlledTextField } from '../../ui/textField/controlledTextField'
import { Typography } from '../../ui/typography/typography'

const signUpSchema = z
  .object({
    confirmPassword: z.string().min(1, 'Required').min(3).max(30),
    email: z.string().min(1, 'Required').email(),
    password: z.string().min(1, 'Required').min(3).max(30),
  })
  .refine(
    values => {
      return values.password === values.confirmPassword
    },
    {
      message: 'Passwords must match!',
      path: ['confirmPassword'],
    }
  )

type RegistrationProps = {
  className?: string
  registration: (value: Registration) => void
}
type RegistrationValues = z.infer<typeof signUpSchema>

export const RegistrationForm = ({ className, registration }: RegistrationProps) => {
  const { control, handleSubmit } = useForm<RegistrationValues>({
    defaultValues: { confirmPassword: '', email: '', password: '' },
    resolver: zodResolver(signUpSchema),
  })

  return (
    <Card className={clsx(style.card, className)}>
      <Typography position={'center'} variant={'h1'}>
        Sign Up
      </Typography>

      <form
        className={style.form}
        onSubmit={handleSubmit(({ email, password }) => registration({ email, password }))}
      >
        <ControlledTextField control={control} label={'Email'} name={'email'} />

        <ControlledTextField
          className={style.password}
          control={control}
          label={'Password'}
          name={'password'}
          type={'password'}
        />

        <ControlledTextField
          className={style.password}
          control={control}
          label={'Confirm Password'}
          name={'confirmPassword'}
          type={'password'}
        />

        <Button className={style.buttonSubmit} fullWidth>
          Sign Up
        </Button>
      </form>

      <Typography className={style.text} position={'center'} variant={'body2'}>
        Already have an account?
      </Typography>

      <Typography
        as={Link}
        className={style.link}
        position={'center'}
        to={path.login}
        variant={'subtitle1'}
      >
        Sign In
      </Typography>
    </Card>
  )
}
