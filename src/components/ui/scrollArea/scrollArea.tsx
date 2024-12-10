import { ComponentPropsWithoutRef } from 'react'

import * as ScrollAreaRadix from '@radix-ui/react-scroll-area'
import clsx from 'clsx'

import style from './scrollArea.module.scss'

type ScrollAreaProps = {} & ComponentPropsWithoutRef<typeof ScrollAreaRadix.Root>

export const ScrollArea = ({ children, className, ...rest }: ScrollAreaProps) => (
  <ScrollAreaRadix.Root className={clsx(style.scrollAreaRoot, className)} {...rest}>
    <ScrollAreaRadix.Viewport className={style.scrollAreaViewport}>
      <div className={style.content}>{children}</div>
    </ScrollAreaRadix.Viewport>

    <ScrollAreaRadix.Scrollbar className={style.scrollAreaScrollbar} orientation={'vertical'}>
      <ScrollAreaRadix.Thumb className={style.scrollAreaThumb} />
    </ScrollAreaRadix.Scrollbar>

    <ScrollAreaRadix.Scrollbar className={style.scrollAreaScrollbar} orientation={'horizontal'}>
      <ScrollAreaRadix.Thumb className={style.scrollAreaThumb} />
    </ScrollAreaRadix.Scrollbar>

    <ScrollAreaRadix.Corner className={style.scrollAreaCorner} />
  </ScrollAreaRadix.Root>
)
