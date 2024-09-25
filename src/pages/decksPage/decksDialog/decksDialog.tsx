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
import { DeckBody } from '../../../features/decks/decksTypes'

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
  onSubmit: (value: DeckBody) => void
  title: string
}

export const DecksDialog = ({ children, onSubmit, title, ...rest }: DecksDialogProps) => {
  const { control, handleSubmit, reset, watch } = useForm<DecksDialogValue>({
    defaultValues: { isPrivate: rest.isPrivate ?? false, name: rest.name ?? '' },
    resolver: zodResolver(decksDialogSchema),
  })

  const [isOpen, setIsOpen] = useState(false)

  const onOpenChangeHandler = () => {
    setIsOpen(!isOpen)
    rest.name ?? reset()
  }

  const onSubmitHandler = (value: DeckBody) => {
    onSubmit(value)
    setIsOpen(false)
    rest.name ?? reset()
  }

  const handleSubmitHandler = handleSubmit(({ isPrivate, name }) => {
    return onSubmitHandler({
      isPrivate: isPrivate === rest.isPrivate ? undefined : isPrivate,
      name: name === rest.name ? undefined : name,
    })
  })

  const isDisabledBtn = rest.name === watch().name && rest.isPrivate === watch().isPrivate

  return (
    <Dialog onOpenChange={onOpenChangeHandler} open={isOpen}>
      <DialogTrigger>{children}</DialogTrigger>

      <DialogPortal className={style.portal} title={title}>
        <form className={style.form} onSubmit={handleSubmitHandler}>
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
