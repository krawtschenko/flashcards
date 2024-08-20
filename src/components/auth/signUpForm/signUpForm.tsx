import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import style from './signUpForm.module.scss'

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

export const SignUpForm = ({ onSubmit }: { onSubmit: () => void }) => {
  const { control, handleSubmit } = useForm<z.infer<typeof signUpSchema>>({
    defaultValues: { confirmPassword: '', email: '', password: '' },
    resolver: zodResolver(signUpSchema),
  })

  return (
    <Card className={style.card}>
      <Typography className={style.title} position={'center'} variant={'h1'}>
        Sign Up
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

      <Typography as={'a'} className={style.link} position={'center'} variant={'subtitle1'}>
        Sign Up
      </Typography>
    </Card>
  )
}
