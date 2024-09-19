import { useState } from 'react'
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
  createDeck: (value: { cover?: string; isPrivate?: boolean; name: string }) => void
}

export const DecksDialog = ({ createDeck }: DecksDialogProps) => {
  const { control, handleSubmit, reset } = useForm<DecksDialogValue>({
    defaultValues: { isPrivate: false, name: '' },
    resolver: zodResolver(decksDialogSchema),
  })

  const [isOpen, setIsOpen] = useState(false)

  const onOpenChangeHandler = () => {
    setIsOpen(!isOpen)
    reset()
  }

  const createDeckHandler = (value: { cover?: string; isPrivate?: boolean; name: string }) => {
    createDeck(value)
    reset()
    setIsOpen(false)
  }

  return (
    <Dialog onOpenChange={onOpenChangeHandler} open={isOpen}>
      <DialogTrigger>
        <Button className={style.button}>Add New Deck</Button>
      </DialogTrigger>

      <DialogPortal className={style.portal} title={'Add New Deck'}>
        <form className={style.form} onSubmit={handleSubmit(createDeckHandler)}>
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

            <Button>Add New Deck</Button>
          </div>
        </form>
      </DialogPortal>
    </Dialog>
  )
}
