import style from './decksDialog.module.scss'

import { Dialog, DialogPortal } from '../../../components/layout/dialog/dialog'
import { Button } from '../../../components/ui/button/button'
import { Typography } from '../../../components/ui/typography/typography'

type DeleteDeckDialogProps = {
  name?: string
  onOpenChange: (open: boolean) => void
  onSubmit: () => void
  open: boolean
}

export const DeleteDeckDialog = (props: DeleteDeckDialogProps) => {
  const { name, onOpenChange, onSubmit, open } = props

  const onDeleteHandler = () => {
    onSubmit()
    onOpenChange(false)
  }

  return (
    <Dialog onOpenChange={() => onOpenChange(!open)} open={open}>
      <DialogPortal className={style.portal} title={'Delete Deck'}>
        <Typography variant={'body1'}>
          Do you want to remove <b>{`Deck (${name})`}</b>?<br />
          All cards will be deleted
        </Typography>

        <div className={style.buttonsWrap}>
          <Button onClick={() => onOpenChange(false)} variant={'secondary'}>
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
