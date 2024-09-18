import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import style from './decksDialog.module.scss'

import { Dialog, DialogPortal, DialogTrigger } from '../../../components/layout/dialog/dialog'
import { Button } from '../../../components/ui/button/button'
import { ControlledTextField } from '../../../components/ui/textField/controlledTextField'

const decksDialogSchema = z.object({
  name: z.string().min(1, 'Required'),
})

type DecksDialogValue = z.infer<typeof decksDialogSchema>

type DecksDialogProps = {
  createDeck: (value: { name: string }) => void
}

export const DecksDialog = ({ createDeck }: DecksDialogProps) => {
  const { control, handleSubmit } = useForm<DecksDialogValue>({
    defaultValues: { name: '' },
    resolver: zodResolver(decksDialogSchema),
  })

  return (
    <Dialog>
      <DialogTrigger>
        <Button className={style.button}>Add New Deck</Button>
      </DialogTrigger>

      <DialogPortal title={'Dialog'}>
        <ControlledTextField
          control={control}
          label={'Name Pack'}
          name={'name'}
          placeholder={'Name'}
        />

        <Button onClick={() => createDeck({ name: 'New deck' })}>Add</Button>
      </DialogPortal>
    </Dialog>
  )
}
