import { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { FiArrowLeft, FiEdit3, FiLogOut, FiTrash2 } from 'react-icons/fi'
import { MdVerified } from 'react-icons/md'
import { z } from 'zod'

import style from './profile.module.scss'

import { UpdateUser } from '../../../features/auth/authTypes'
import { Avatar } from '../../ui/avatar/avatar'
import { Button } from '../../ui/button/button'
import { Card } from '../../ui/card/card'
import { ControlledTextField } from '../../ui/textField/controlledTextField'
import { Typography } from '../../ui/typography/typography'

type ProfileProps = {
  avatar?: string
  className?: string
  email?: string
  isEmailVerified?: boolean
  logout: () => void
  name?: string
  update: (data: UpdateUser) => void
  verify: () => void
}

export const Profile = (props: ProfileProps) => {
  const { avatar, className, email, isEmailVerified, logout, name, update, verify } = props
  const [editable, setEditable] = useState(false)

  const onUpdateHandler = (data: UpdateUser) => {
    update(data)
    setEditable(!editable)
  }

  const [image, setImage] = useState<File | null>(null)

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      setImage(file)
    }
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
        <Avatar avatar={avatar} className={style.avatar} fontSize={36} name={name} />

        {editable && (
          <>
            {avatar && (
              <Button className={style.deleteAvatar} variant={'secondary'}>
                <FiTrash2 />
              </Button>
            )}

            <Button as={'label'} className={style.newAvatar} variant={'secondary'}>
              <FiEdit3 />
              <input accept={'image/*'} onChange={uploadHandler} type={'file'} />
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
      {editable && <Editable image={image} name={name} update={onUpdateHandler} />}
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
            <MdVerified />
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

const profileSchema = z.object({
  name: z.string().min(1, 'Required').optional(),
})

type ProfileValue = z.infer<typeof profileSchema>

type EditableProps = {
  image?: File | null
  name?: string
  update: (data: UpdateUser) => void
}

const Editable = ({ image, update, ...rest }: EditableProps) => {
  const { control, handleSubmit, watch } = useForm<ProfileValue>({
    defaultValues: { name: rest.name },
    resolver: zodResolver(profileSchema),
  })

  const handleSubmitHandler = handleSubmit(({ name }) => {
    return update({
      avatar: !image ? undefined : image,
      name: name === rest.name ? undefined : name,
    })
  })

  const isDisabledBtn = rest.name === watch().name && !image

  return (
    <form className={style.form} onSubmit={handleSubmitHandler}>
      <ControlledTextField control={control} label={'Nickname'} name={'name'} />

      <Button disabled={isDisabledBtn} fullWidth>
        Save Changes
      </Button>
    </form>
  )
}
