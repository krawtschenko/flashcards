import style from './checkEmailForm.module.scss'

import { CheckEmail } from '../../../assets/icons/checkEmail'
import { Button } from '../../ui/button/button'
import { Card } from '../../ui/card/card'
import { Typography } from '../../ui/typography/typography'

export const CheckEmailForm = () => {
  return (
    <Card className={style.card}>
      <Typography position={'center'} variant={'h1'}>
        Check Email
      </Typography>

      <CheckEmail className={style.icon} />

      <Typography className={style.info} position={'center'} variant={'body2'}>
        We’ve sent an Email with instructions to example@mail.com
      </Typography>

      <Button className={style.buttonSubmit} fullWidth>
        Back to Sign In
      </Button>
    </Card>
  )
}
