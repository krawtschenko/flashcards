import { ChangeEvent, useEffect, useState } from 'react'
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

  const [image, setImage] = useState<File | null | undefined>(undefined)
  const [preview, setPreview] = useState<null | string>(null)

  useEffect(() => {
    if (avatar) {
      setPreview(avatar)
    }
  }, [avatar])

  useEffect(() => {
    if (image) {
      const newPreview = URL.createObjectURL(image)

      if (preview) {
        URL.revokeObjectURL(preview)
      }
      setPreview(newPreview)

      return () => URL.revokeObjectURL(newPreview)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image])

  const onUpdateHandler = (data: UpdateUser) => {
    update(data)
    setEditable(!editable)
    setImage(undefined)
  }

  const uploadAvatarHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      setImage(file)
    }
  }

  const removeAvatarHandler = () => {
    setImage(null)
    setPreview(null)
  }

  const backHandler = () => {
    if (avatar) {
      setPreview(avatar)
    } else {
      setPreview(null)
    }

    setEditable(false)
  }

  return (
    <Card className={clsx(style.card, className)}>
      {editable && (
        <Button className={style.back} onClick={backHandler}>
          <FiArrowLeft />
        </Button>
      )}

      <Typography position={'center'} variant={'h1'}>
        Personal Information
      </Typography>

      <div className={style.avatarWrap}>
        <Avatar avatar={preview ?? undefined} className={style.avatar} fontSize={36} name={name} />

        {editable && (
          <>
            {preview && (
              <Button
                className={style.deleteAvatar}
                onClick={removeAvatarHandler}
                variant={'secondary'}
              >
                <FiTrash2 />
              </Button>
            )}

            <Button as={'label'} className={style.newAvatar} variant={'secondary'}>
              <FiEdit3 />
              <input accept={'image/*'} onChange={uploadAvatarHandler} type={'file'} />
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
  name: z.string().min(1),
})

type ProfileValue = z.infer<typeof profileSchema>

type EditableProps = {
  image?: File | null
  name?: string
  update: (data: UpdateUser) => void
}

const Editable = ({ image, name, update }: EditableProps) => {
  const { control, handleSubmit } = useForm<ProfileValue>({
    defaultValues: { name },
    resolver: zodResolver(profileSchema),
  })

  const handleSubmitHandler = handleSubmit(value => {
    return update({
      avatar: image ?? (image === null ? null : undefined),
      name: value.name === name ? undefined : value.name,
    })
  })

  return (
    <form className={style.form} onSubmit={handleSubmitHandler}>
      <ControlledTextField control={control} label={'Nickname'} name={'name'} />

      <Button fullWidth>Save Changes</Button>
    </form>
  )
}
