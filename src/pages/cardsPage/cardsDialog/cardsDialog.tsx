import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import style from './cardsDialog.module.scss'

import { Dialog, DialogPortal } from '../../../components/layout/dialog/dialog'
import { Button } from '../../../components/ui/button/button'
import { ControlledTextField } from '../../../components/ui/textField/controlledTextField'
import { CardBody } from '../../../features/cards/cardsTypes'

const cardsDialogSchema = z.object({
  answer: z.string().min(1, 'Required').min(3).max(500),
  question: z.string().min(1, 'Required').min(3).max(500),
})

type CardsDialogValue = z.infer<typeof cardsDialogSchema>

type CardsDialogProps = {
  onOpenChange: (open: boolean) => void
  onSubmit: (value: CardBody) => void
  open: boolean
  title?: string
}

export const CardsDialog = (props: CardsDialogProps) => {
  const { onOpenChange, onSubmit, open, title } = props

  const { control, handleSubmit, reset } = useForm<CardsDialogValue>({
    defaultValues: { answer: '', question: '' },
    resolver: zodResolver(cardsDialogSchema),
  })

  const onSubmitHandler = (value: CardBody) => {
    onSubmit(value)
    onOpenChange(!open)
  }

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogPortal className={style.portal} title={title}>
        <form className={style.form} onSubmit={handleSubmit(onSubmitHandler)}>
          <ControlledTextField
            control={control}
            label={'Question'}
            name={'question'}
            placeholder={'Question'}
          />

          <ControlledTextField
            className={style.textField}
            control={control}
            label={'Answer'}
            name={'answer'}
            placeholder={'Answer'}
          />

          <div className={style.buttonsWrap}>
            <Button onClick={() => onOpenChange(false)} variant={'secondary'}>
              Cancel
            </Button>

            <Button>{title}</Button>
          </div>
        </form>
      </DialogPortal>
    </Dialog>
  )
}
