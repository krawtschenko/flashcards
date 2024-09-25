import { ReactNode, useState } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { SlPicture } from 'react-icons/sl'
import { z } from 'zod'

import style from './decksDialog.module.scss'

import { Dialog, DialogPortal, DialogTrigger } from '../../../components/layout/dialog/dialog'
import { Button } from '../../../components/ui/button/button'
import { ControlledCheckbox } from '../../../components/ui/checkbox/controlledCheckbox'
import { ControlledTextField } from '../../../components/ui/textField/controlledTextField'

const decksDialogSchema = z.object({
  cover: z.string().optional(),
  isPrivate: z.boolean().optional(),
  name: z.string().min(1, 'Required').min(3).max(30),
})

type DecksDialogValue = z.infer<typeof decksDialogSchema>

type DecksDialogProps = {
  children: ReactNode
  isPrivate?: boolean
  name?: string
  onSubmit: (value: { cover?: string; isPrivate?: boolean; name: string }) => void
  title: string
}

export const DecksDialog = ({ children, isPrivate, name, onSubmit, title }: DecksDialogProps) => {
  const { control, handleSubmit, reset, watch } = useForm<DecksDialogValue>({
    defaultValues: { isPrivate: isPrivate ?? false, name: name ?? '' },
    resolver: zodResolver(decksDialogSchema),
  })

  const [isOpen, setIsOpen] = useState(false)

  const onOpenChangeHandler = () => {
    setIsOpen(!isOpen)
    name ?? reset()
  }

  const onSubmitHandler = (value: { cover?: string; isPrivate?: boolean; name: string }) => {
    onSubmit(value)
    setIsOpen(false)
    name ?? reset()
  }

  const isDisabledBtn = name === watch().name && isPrivate === watch().isPrivate

  return (
    <Dialog onOpenChange={onOpenChangeHandler} open={isOpen}>
      <DialogTrigger>{children}</DialogTrigger>

      <DialogPortal className={style.portal} title={title}>
        <form className={style.form} onSubmit={handleSubmit(onSubmitHandler)}>
          <ControlledTextField
            control={control}
            label={'Name Pack'}
            name={'name'}
            placeholder={'Name'}
          />

          <Button className={style.uploadButton} fullWidth variant={'secondary'}>
            <SlPicture /> Upload Image
          </Button>

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

            <Button disabled={isDisabledBtn}>{title}</Button>
          </div>
        </form>
      </DialogPortal>
    </Dialog>
  )
}
