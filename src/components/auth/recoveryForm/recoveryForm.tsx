import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import style from './recoveryForm.module.scss'

import { Button } from '../../ui/button/button'
import { Card } from '../../ui/card/card'
import { ControlledTextField } from '../../ui/textField/controlledTextField'
import { Typography } from '../../ui/typography/typography'

const recoverySchema = z.object({
  email: z.string().min(1, 'Required').email(),
})

export type RecoveryFormValues = z.infer<typeof recoverySchema>

type RecoveryFormProps = {
  onSubmit: () => void
}

export const RecoveryForm = ({ onSubmit }: RecoveryFormProps) => {
  const { control, handleSubmit } = useForm<RecoveryFormValues>({
    defaultValues: { email: '' },
    resolver: zodResolver(recoverySchema),
  })

  return (
    <Card className={style.card}>
      <Typography className={style.title} position={'center'} variant={'h1'}>
        Forgot your password?
      </Typography>

      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
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

      <Typography as={'a'} className={style.link} position={'center'} variant={'subtitle1'}>
        Try logging in
      </Typography>
    </Card>
  )
}
