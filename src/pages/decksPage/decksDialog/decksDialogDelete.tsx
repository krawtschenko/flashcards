import { ReactNode, useState } from 'react'

import style from './decksDialog.module.scss'

import { Dialog, DialogPortal, DialogTrigger } from '../../../components/layout/dialog/dialog'
import { Button } from '../../../components/ui/button/button'
import { Typography } from '../../../components/ui/typography/typography'

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
