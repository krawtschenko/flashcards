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

export type ProfileValue = z.infer<typeof profileSchema>

type ProfileProps = {
  avatar?: string
  email: string
  name: string
  onSubmit: (e: ProfileValue) => void
}

export const Profile = ({ avatar, email, name, onSubmit }: ProfileProps) => {
  const [editable, setEditable] = useState(false)

  const onSaveHandler = (e: ProfileValue) => {
    onSubmit(e)
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
        <NotEditable email={email} name={name} onClick={() => setEditable(!editable)} />
      )}

      {/*While editable*/}
      {editable && <Editable name={name} onSave={onSaveHandler} />}
    </Card>
  )
}

type NotEditableProps = {
  email: string
  name: string
  onClick: () => void
}

const NotEditable = ({ email, name, onClick }: NotEditableProps) => {
  return (
    <>
      <div className={style.nameWrap}>
        <Typography variant={'h2'}>{name}</Typography>

        <Button onClick={onClick}>
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
  )
}

type EditableProps = {
  name: string
  onSave: (e: ProfileValue) => void
}

const Editable = ({ name, onSave }: EditableProps) => {
  const { control, handleSubmit } = useForm<ProfileValue>({
    defaultValues: { name },
    resolver: zodResolver(profileSchema),
  })

  return (
    <form className={style.form} onSubmit={handleSubmit(onSave)}>
      <ControlledTextField control={control} label={'Nickname'} name={'name'} />

      <Button fullWidth>Save Changes</Button>
    </form>
  )
}
