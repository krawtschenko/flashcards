import style from './deckDialog.module.scss'

import { Dialog, DialogPortal } from '../../../components/layout/dialog/dialog'
import { Button } from '../../../components/ui/button/button'
import { Typography } from '../../../components/ui/typography/typography'

type DeckDialogDeleteProps = {
  name?: string
  onOpenChange: () => void
  onSubmit: () => void
  open: boolean
}

export const DeckDialogDelete = (props: DeckDialogDeleteProps) => {
  const { name, onOpenChange, onSubmit, open } = props

  const onDeleteHandler = () => {
    onSubmit()
    onOpenChange()
  }

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogPortal className={style.portal} title={'Delete Deck'}>
        <Typography variant={'body1'}>
          Do you want to remove Deck <b>{`«${name}»`}</b>?<br />
          All cards will be deleted
        </Typography>

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
