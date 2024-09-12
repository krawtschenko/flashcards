import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { FiArrowLeft, FiEdit3, FiLogOut, FiTrash2 } from 'react-icons/fi'
import { z } from 'zod'

import style from './profile.module.scss'

import noAvatar from '../../../assets/images/no-photo.svg'
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
  className?: string
  email?: string
  logout: () => void
  name?: string
  update: (e: ProfileValue) => void
}

export const Profile = ({ avatar, className, email, logout, name, update }: ProfileProps) => {
  const [editable, setEditable] = useState(false)

  const onUpdateHandler = (e: ProfileValue) => {
    update(e)
    setEditable(!editable)
  }

  return (
    <Card className={clsx(style.card, className)}>
      {editable && (
        <Button className={style.back} onClick={() => setEditable(false)}>
          <FiArrowLeft />
        </Button>
      )}

      <Typography position={'center'} variant={'h1'}>
        Personal Information
      </Typography>

      <div className={style.avatarWrap}>
        <img alt={'avatar'} src={avatar ?? noAvatar} />

        {editable && (
          <>
            {avatar && (
              <Button className={style.deleteAvatar} variant={'secondary'}>
                <FiTrash2 />
              </Button>
            )}

            <Button className={style.newAvatar} variant={'secondary'}>
              <FiEdit3 />
            </Button>
          </>
        )}
      </div>

      {/*While not editable*/}
      {!editable && (
        <NotEditable
          email={email}
          logout={logout}
          name={name}
          onEdit={() => setEditable(!editable)}
        />
      )}

      {/*While editable*/}
      {editable && <Editable name={name} update={onUpdateHandler} />}
    </Card>
  )
}

type NotEditableProps = {
  email?: string
  logout: () => void
  name?: string
  onEdit: () => void
}

const NotEditable = ({ email, logout, name, onEdit }: NotEditableProps) => {
  return (
    <>
      <div className={style.nameWrap}>
        <Typography variant={'h2'}>{name}</Typography>

        <Button onClick={onEdit}>
          <FiEdit3 />
        </Button>
      </div>

      <Typography className={style.email} position={'center'} variant={'body2'}>
        {email}
      </Typography>

      <Button className={style.logout} onClick={logout} variant={'secondary'}>
        <FiLogOut />
        Logout
      </Button>
    </>
  )
}

type EditableProps = {
  name?: string
  update: (e: ProfileValue) => void
}

const Editable = ({ name, update }: EditableProps) => {
  const { control, handleSubmit } = useForm<ProfileValue>({
    defaultValues: { name },
    resolver: zodResolver(profileSchema),
  })

  return (
    <form className={style.form} onSubmit={handleSubmit(update)}>
      <ControlledTextField control={control} label={'Nickname'} name={'name'} />

      <Button fullWidth>Save Changes</Button>
    </form>
  )
}
