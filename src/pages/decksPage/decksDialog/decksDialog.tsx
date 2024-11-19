import { ChangeEvent, ReactNode, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { SlCloudUpload, SlTrash } from 'react-icons/sl'
import { z } from 'zod'

import style from './decksDialog.module.scss'

import { Dialog, DialogPortal, DialogTrigger } from '../../../components/layout/dialog/dialog'
import { Button } from '../../../components/ui/button/button'
import { ControlledCheckbox } from '../../../components/ui/checkbox/controlledCheckbox'
import { ControlledTextField } from '../../../components/ui/textField/controlledTextField'
import { Typography } from '../../../components/ui/typography/typography'
import { DeckBody } from '../../../features/decks/decksTypes'

const decksDialogSchema = z.object({
  cover: z.string().optional(),
  isPrivate: z.boolean().optional(),
  name: z.string().min(1, 'Required').min(3).max(30),
})

type DecksDialogValue = z.infer<typeof decksDialogSchema>

type DecksDialogProps = {
  children: ReactNode
  cover?: string
  isPrivate?: boolean
  name?: string
  onSubmit: (value: DeckBody) => void
  title: string
}

export const DecksDialog = (props: DecksDialogProps) => {
  const { children, cover, isPrivate, name, onSubmit, title } = props

  const { control, handleSubmit, reset } = useForm<DecksDialogValue>({
    defaultValues: { isPrivate: isPrivate ?? false, name: name ?? '' },
    resolver: zodResolver(decksDialogSchema),
  })

  const [isOpen, setIsOpen] = useState(false)

  const [image, setImage] = useState<File | null | undefined>(undefined)
  const [preview, setPreview] = useState<null | string>(null)

  useEffect(() => {
    if (cover) {
      setPreview(cover)
    }
  }, [cover])

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

  const onUploadCoverHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      setImage(file)
    }
  }

  const onRemoveCoverHandler = () => {
    setImage(null)
    setPreview(null)
  }

  const onOpenChangeHandler = () => {
    setIsOpen(!isOpen)

    if (cover) {
      setPreview(cover)
    } else {
      setPreview(null)
    }

    if (!name) {
      reset()
    }
  }

  const onSubmitHandler = (value: DeckBody) => {
    onSubmit(value)
    onOpenChangeHandler()
    setImage(undefined)
  }

  const onHandleSubmitHandler = handleSubmit(value => {
    return onSubmitHandler({
      cover: image ?? (image === null ? null : undefined),
      isPrivate: value.isPrivate === isPrivate ? undefined : value.isPrivate,
      name: value.name === name ? undefined : value.name,
    })
  })

  return (
    <Dialog onOpenChange={onOpenChangeHandler} open={isOpen}>
      <DialogTrigger>{children}</DialogTrigger>

      <DialogPortal className={style.portal} title={title}>
        <div onClick={e => e.stopPropagation()}>
          <form className={style.form} onSubmit={onHandleSubmitHandler}>
            {preview && <img alt={'preview'} src={preview} />}

            <ControlledTextField
              className={style.textField}
              control={control}
              label={'Name Pack'}
              name={'name'}
              placeholder={'Name'}
            />

            <div className={style.buttons}>
              {preview && (
                <Button className={style.removeButton} fullWidth onClick={onRemoveCoverHandler}>
                  <SlTrash /> Remove Image
                </Button>
              )}

              <Button as={'label'} className={style.uploadButton} fullWidth variant={'secondary'}>
                <SlCloudUpload /> Upload Image
                <input accept={'image/*'} onChange={onUploadCoverHandler} type={'file'} />
              </Button>
            </div>

            <ControlledCheckbox
              className={style.checkbox}
              control={control}
              label={'Private pack'}
              name={'isPrivate'}
            />

            <div className={style.buttonsWrap}>
              <Button onClick={onOpenChangeHandler} variant={'secondary'}>
                Cancel
              </Button>

              <Button>{title}</Button>
            </div>
          </form>
        </div>
      </DialogPortal>
    </Dialog>
  )
}

type DeleteDeckDialogProps = {
  children: ReactNode
  name?: string
  onDelete: () => void
}

export const DeleteDeckDialog = ({ children, name, onDelete }: DeleteDeckDialogProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const onDeleteHandler = () => {
    onDelete()
    setIsOpen(false)
  }

  return (
    <Dialog onOpenChange={() => setIsOpen(!isOpen)} open={isOpen}>
      <DialogTrigger>{children}</DialogTrigger>

      <DialogPortal className={style.portal} title={'Delete Deck'}>
        <Typography variant={'body1'}>
          Do you want to remove <b>{`Deck (${name})`}</b>?<br />
          All cards will be deleted
        </Typography>

        <div className={style.buttonsWrap}>
          <Button onClick={() => setIsOpen(false)} variant={'secondary'}>
            Cancel
          </Button>

          <Button className={style.delete} onClick={onDeleteHandler}>
            Delete Deck
          </Button>
        </div>
      </DialogPortal>
    </Dialog>
  )
}
