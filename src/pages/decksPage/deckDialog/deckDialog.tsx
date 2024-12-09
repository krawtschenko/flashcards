import { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { SlCloudUpload, SlTrash } from 'react-icons/sl'
import { z } from 'zod'

import style from './deckDialog.module.scss'

import { Dialog, DialogPortal } from '../../../components/layout/dialog/dialog'
import { Button } from '../../../components/ui/button/button'
import { ControlledCheckbox } from '../../../components/ui/checkbox/controlledCheckbox'
import { ControlledTextField } from '../../../components/ui/textField/controlledTextField'
import { DeckBody } from '../../../features/decks/decksTypes'

const decksDialogSchema = z.object({
  cover: z.string().optional(),
  isPrivate: z.boolean().optional(),
  name: z.string().min(1, 'Required').min(3).max(30),
})

type DecksDialogValue = z.infer<typeof decksDialogSchema>

type DecksDialogProps = {
  cover?: string
  isPrivate?: boolean
  name?: string
  onOpenChange: () => void
  onSubmit: (value: DeckBody) => void
  open: boolean
  title?: string
}

export const DecksDialog = (props: DecksDialogProps) => {
  const { cover, isPrivate, name, onOpenChange, onSubmit, open, title } = props

  const { control, handleSubmit, reset } = useForm<DecksDialogValue>({
    defaultValues: { isPrivate: isPrivate ?? false, name: name ?? '' },
    resolver: zodResolver(decksDialogSchema),
  })

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
    onOpenChange()

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

  const onHandleSubmit = handleSubmit(value => {
    return onSubmitHandler({
      cover: image ?? (image === null ? null : undefined),
      isPrivate: value.isPrivate === isPrivate ? undefined : value.isPrivate,
      name: value.name === name ? undefined : value.name,
    })
  })

  return (
    <Dialog onOpenChange={onOpenChangeHandler} open={open}>
      <DialogPortal className={style.portal} title={title}>
        <form className={style.form} onSubmit={onHandleSubmit}>
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
      </DialogPortal>
    </Dialog>
  )
}
