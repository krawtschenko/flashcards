import { ComponentPropsWithoutRef } from 'react'

import * as DialogRadix from '@radix-ui/react-dialog'
import clsx from 'clsx'
import { FiX } from 'react-icons/fi'

import style from './dialog.module.scss'

import { Button } from '../../ui/button/button'
import { Card } from '../../ui/card/card'
import { Typography } from '../../ui/typography/typography'

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

export const DialogPortal = (props: DialogPortalProps) => {
  const { children, className, title, ...rest } = props

  return (
    <DialogRadix.Portal {...rest}>
      <DialogRadix.Overlay className={style.dialogOverlay} />

      <DialogRadix.Content className={style.dialogContent}>
        <DialogRadix.Title />
        <DialogRadix.Description />

        <Card className={clsx(style.card, className)}>
          <div className={style.header}>
            {title && <Typography variant={'h3'}>{title}</Typography>}

            <DialogRadix.Close asChild>
              <Button className={style.closeButton}>
                <FiX />
              </Button>
            </DialogRadix.Close>
          </div>

          <div className={style.content}>{children}</div>
        </Card>
      </DialogRadix.Content>
    </DialogRadix.Portal>
  )
}
