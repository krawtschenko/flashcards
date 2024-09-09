import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { z } from 'zod'

import style from './recoveryForm.module.scss'

import { path } from '../../../routes/path'
import { Button } from '../../ui/button/button'
import { Card } from '../../ui/card/card'
import { ControlledTextField } from '../../ui/textField/controlledTextField'
import { Typography } from '../../ui/typography/typography'

const recoverySchema = z.object({
  email: z.string().min(1, 'Required').email(),
})

type RecoveryFormProps = {
  className: string
  onSubmit: () => void
}

export const RecoveryForm = ({ className, onSubmit }: RecoveryFormProps) => {
  const { control, handleSubmit } = useForm<z.infer<typeof recoverySchema>>({
    defaultValues: { email: '' },
    resolver: zodResolver(recoverySchema),
  })

  return (
    <Card className={clsx(style.card, className)}>
      <Typography position={'center'} variant={'h1'}>
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

      <Typography
        as={Link}
        className={style.link}
        position={'center'}
        to={path.login}
        variant={'subtitle1'}
      >
        Try logging in
      </Typography>
    </Card>
  )
}
