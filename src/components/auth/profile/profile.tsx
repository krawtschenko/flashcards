import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { FiEdit3, FiLogOut } from 'react-icons/fi'
import { z } from 'zod'

import style from './profile.module.scss'

import altAvatar from '../../../assets/images/avatar.png'
import { Button } from '../../ui/button/button'
import { Card } from '../../ui/card/card'
import { ControlledTextField } from '../../ui/textField/controlledTextField'
import { Typography } from '../../ui/typography/typography'

const profileSchema = z.object({
  name: z.string().min(1, 'Required'),
})

type ProfileProps = { avatar?: string; email: string; name: string; onSubmit: () => void }

export const Profile = ({ avatar, email, name, onSubmit }: ProfileProps) => {
  const [editable, setEditable] = useState(true)

  const { control, handleSubmit } = useForm<z.infer<typeof profileSchema>>({
    defaultValues: { name: '' },
    resolver: zodResolver(profileSchema),
  })

  const saveChangesHandler = () => {
    onSubmit()
    setEditable(!editable)
  }

  return (
    <Card className={style.card}>
      <Typography position={'center'} variant={'h1'}>
        Personal Information
      </Typography>

      <div className={style.avatarWrap}>
        <img alt={'avatar'} src={avatar ?? altAvatar} />

        {editable && (
          <Button variant={'secondary'}>
            <FiEdit3 />
          </Button>
        )}
      </div>

      {/*While not editable*/}
      {!editable && (
        <>
          <div className={style.nameWrap}>
            <Typography variant={'h2'}>{name}</Typography>

            <Button onClick={() => setEditable(!editable)}>
              <FiEdit3 />
            </Button>
          </div>

          <Typography className={style.email} position={'center'} variant={'body2'}>
            {email}
          </Typography>

          <Button className={style.logout} variant={'secondary'}>
            <FiLogOut />
            Logout
          </Button>
        </>
      )}

      {/*While editable*/}
      {editable && (
        <form className={style.form} onSubmit={handleSubmit(saveChangesHandler)}>
          <ControlledTextField control={control} label={'Nickname'} name={'name'} />

          <Button fullWidth>Save Changes</Button>
        </form>
      )}
    </Card>
  )
}
