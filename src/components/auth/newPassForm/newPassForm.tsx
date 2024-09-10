import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import style from './newPassForm.module.scss'

import { Button } from '../../ui/button/button'
import { Card } from '../../ui/card/card'
import { ControlledTextField } from '../../ui/textField/controlledTextField'
import { Typography } from '../../ui/typography/typography'

const passSchema = z.object({
  password: z.string().min(1, 'Required').min(3),
})

export const NewPassForm = ({ onSubmit }: { onSubmit: () => void }) => {
  const { control, handleSubmit } = useForm<z.infer<typeof passSchema>>({
    defaultValues: { password: '' },
    resolver: zodResolver(passSchema),
  })

  return (
    <Card className={style.card}>
      <Typography position={'center'} variant={'h1'}>
        Create new password
      </Typography>

      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
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
