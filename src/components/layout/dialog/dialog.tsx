import { ComponentPropsWithoutRef } from 'react'

import * as DialogRadix from '@radix-ui/react-dialog'
import clsx from 'clsx'
import { FiX } from 'react-icons/fi'

import style from './dialog.module.scss'

import { Button } from '../../ui/button/button'
import { Card } from '../../ui/card/card'
import { Typography } from '../../ui/typography/typography'
import { ScrollArea } from '../../ui/scrollArea/scrollArea'

export const Dialog = (props: ComponentPropsWithoutRef<typeof DialogRadix.Root>) => {
  return <DialogRadix.Root {...props} />
}

export const DialogTrigger = (props: ComponentPropsWithoutRef<typeof DialogRadix.Trigger>) => {
  return <DialogRadix.Trigger asChild {...props} />
}

type DialogPortalProps = {
  className?: string
  title?: string
} & ComponentPropsWithoutRef<typeof DialogRadix.Portal>

export const DialogPortal = ({ children, className, title, ...rest }: DialogPortalProps) => {
  return (
    <DialogRadix.Portal {...rest}>
      <DialogRadix.Overlay className={style.dialogOverlay} />

      <DialogRadix.Content aria-describedby={undefined} className={style.dialogContent}>
        <DialogRadix.Title />

        <Card className={clsx(style.card, className)}>
          <div className={style.header}>
            <Typography variant={'h3'}>{title}</Typography>

            <DialogRadix.Close asChild>
              <Button className={style.closeButton}>
                <FiX />
              </Button>
            </DialogRadix.Close>
          </div>

          <ScrollArea className={style.scrollArea}>
            <div className={style.content}>{children}</div>
          </ScrollArea>
        </Card>
      </DialogRadix.Content>
    </DialogRadix.Portal>
  )
}
