import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { FiArrowLeft, FiEdit3, FiLogOut, FiTrash2 } from 'react-icons/fi'
import { MdVerifiedUser } from 'react-icons/md'
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
  isEmailVerified?: boolean
  logout: () => void
  name?: string
  update: (e: ProfileValue) => void
  verify: () => void
}

export const Profile = (props: ProfileProps) => {
  const { avatar, className, email, isEmailVerified, logout, name, update, verify } = props
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
          isEmailVerified={isEmailVerified}
          logout={logout}
          name={name}
          onEdit={() => setEditable(!editable)}
          verify={verify}
        />
      )}

      {/*While editable*/}
      {editable && <Editable name={name} update={onUpdateHandler} />}
    </Card>
  )
}

type NotEditableProps = {
  email?: string
  isEmailVerified?: boolean
  logout: () => void
  name?: string
  onEdit: () => void
  verify: () => void
}

const NotEditable = ({
  email,
  isEmailVerified,
  logout,
  name,
  onEdit,
  verify,
}: NotEditableProps) => {
  return (
    <>
      <div className={style.nameWrap}>
        <Typography variant={'h2'}>{name}</Typography>

        <Button onClick={onEdit}>
          <FiEdit3 />
        </Button>
      </div>

      <div className={style.emailWrap}>
        <Typography className={style.email} position={'center'} variant={'body2'}>
          {email}
        </Typography>

        {isEmailVerified ? (
          <div className={style.verified} title={'Email is verified'}>
            <MdVerifiedUser />
          </div>
        ) : (
          <Button className={style.unverified} onClick={verify} title={'Email is not verified'}>
            Confirm
          </Button>
        )}
      </div>

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
