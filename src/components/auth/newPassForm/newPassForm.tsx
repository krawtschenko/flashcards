import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { z } from 'zod'

import style from './newPassForm.module.scss'

import { Button } from '../../ui/button/button'
import { Card } from '../../ui/card/card'
import { ControlledTextField } from '../../ui/textField/controlledTextField'
import { Typography } from '../../ui/typography/typography'

const passSchema = z.object({
  password: z.string().min(1, 'Required').min(3),
})

type NewPassFormValue = z.infer<typeof passSchema>

type NewPassFormProps = {
  className?: string
  onReset: (value: { password: string; token: string }) => void
}

export const NewPassForm = ({ className, onReset }: NewPassFormProps) => {
  const { control, handleSubmit } = useForm<NewPassFormValue>({
    defaultValues: { password: '' },
    resolver: zodResolver(passSchema),
  })

  const { token } = useParams()

  return (
    <Card className={clsx(style.card, className)}>
      <Typography position={'center'} variant={'h1'}>
        Create new password
      </Typography>

      <form
        className={style.form}
        onSubmit={handleSubmit(({ password }) => onReset({ password, token: token ? token : '' }))}
      >
        <ControlledTextField
          control={control}
          label={'Password'}
          name={'password'}
          type={'password'}
        />

        <Typography className={style.instructions} position={'start'} variant={'body2'}>
          Create new password and we will send you further instructions to email
        </Typography>

        <Button className={style.buttonSubmit} fullWidth>
          Create New Password
        </Button>
      </form>
    </Card>
  )
}
