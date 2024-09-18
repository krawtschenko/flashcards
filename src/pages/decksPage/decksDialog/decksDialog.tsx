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
  name: z.string().min(1, 'Required'),
  private: z.boolean().optional(),
})

type DecksDialogValue = z.infer<typeof decksDialogSchema>

type DecksDialogProps = {
  createDeck: (value: { name: string }) => void
}

export const DecksDialog = ({ createDeck }: DecksDialogProps) => {
  const { control, handleSubmit } = useForm<DecksDialogValue>({
    defaultValues: { name: '', private: false },
    resolver: zodResolver(decksDialogSchema),
  })

  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen}>
      <DialogTrigger onClick={() => setIsOpen(!isOpen)}>
        <Button className={style.button}>Add New Deck</Button>
      </DialogTrigger>

      <DialogPortal title={'Dialog'}>
        <form onSubmit={handleSubmit(console.log)}>
          <ControlledTextField
            control={control}
            label={'Name Pack'}
            name={'name'}
            placeholder={'Name'}
          />

          <Button fullWidth variant={'secondary'}>
            <SlPicture /> Upload Image
          </Button>

          <ControlledCheckbox control={control} label={'Private pack'} name={'private'} />

          <div>
            <Button onClick={() => setIsOpen(!isOpen)} variant={'secondary'}>
              Cancel
            </Button>

            <Button>Add</Button>
          </div>
        </form>
      </DialogPortal>
    </Dialog>
  )
}
