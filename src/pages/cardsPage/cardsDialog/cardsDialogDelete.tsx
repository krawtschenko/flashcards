import style from './cardsDialog.module.scss'

import { Dialog, DialogPortal } from '../../../components/layout/dialog/dialog'
import { Button } from '../../../components/ui/button/button'
import { Typography } from '../../../components/ui/typography/typography'

type CardDialogDeleteProps = {
  onOpenChange: () => void
  onSubmit: () => void
  open: boolean
}

export const CardDialogDelete = (props: CardDialogDeleteProps) => {
  const { onOpenChange, onSubmit, open } = props

  const onDeleteHandler = () => {
    onSubmit()
    onOpenChange()
  }

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogPortal className={style.portal} title={'Delete Deck'}>
        <Typography variant={'body1'}>Do you want to remove Card?</Typography>

        <div className={style.buttonsWrap}>
          <Button onClick={onOpenChange} variant={'secondary'}>
            Cancel
          </Button>

          <Button className={style.delete} onClick={onDeleteHandler}>
            Delete
          </Button>
        </div>
      </DialogPortal>
    </Dialog>
  )
}
