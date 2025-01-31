import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { z } from 'zod'

import style from './verifyForm.module.scss'

import { CheckEmail } from '../../../assets/icons/checkEmail'
import { Button } from '../../ui/button/button'
import { Card } from '../../ui/card/card'
import { ControlledTextField } from '../../ui/textField/controlledTextField'
import { Typography } from '../../ui/typography/typography'

const verifySchema = z.object({
  code: z.string().uuid(),
})

export type VerifyFormValue = z.infer<typeof verifySchema>

type VerifyProps = {
  className?: string
  confirmEmail: (value: VerifyFormValue) => void
  email?: string
}
export const VerifyForm = ({ className, confirmEmail, email }: VerifyProps) => {
  const { control, handleSubmit } = useForm<VerifyFormValue>({
    defaultValues: { code: '' },
    resolver: zodResolver(verifySchema),
  })

  return (
    <Card className={clsx(style.card, className)}>
      <Typography position={'center'} variant={'h1'}>
        Verify Email
      </Typography>

      <CheckEmail className={style.icon} />

      <Typography className={style.info} position={'center'} variant={'body2'}>
        {`We’ve sent an Email with instructions to ${email}`}
      </Typography>

      <form className={style.form} onSubmit={handleSubmit(confirmEmail)}>
        <ControlledTextField
          className={style.code}
          control={control}
          label={'Enter code'}
          name={'code'}
        />

        <Button className={style.buttonSubmit} fullWidth>
          Confirm
        </Button>
      </form>

      <Typography className={style.text} position={'center'} variant={'body2'}>
        Did not get your email?
      </Typography>

      <Button className={style.resend} onClick={() => alert('Resend')}>
        Resend the code
      </Button>
    </Card>
  )
}
