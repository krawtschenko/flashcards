import { ComponentProps } from 'react'

import * as TabsRadix from '@radix-ui/react-tabs'
import clsx from 'clsx'

import style from './tabs.module.scss'

import { Typography } from '../typography/typography'

export const Tabs = (props: ComponentProps<typeof TabsRadix.Root>) => {
  const { children, className, title, ...rest } = props

  return (
    <TabsRadix.Root className={clsx(style.tabsRoot, className)} {...rest}>
      {title && (
        <Typography className={style.title} variant={'body2'}>
          {title}
        </Typography>
      )}

      <TabsRadix.List className={style.tabsList}>{children}</TabsRadix.List>
    </TabsRadix.Root>
  )
}

export const TabsTrigger = ({ ...rest }: ComponentProps<typeof TabsRadix.Trigger>) => {
  return <TabsRadix.Trigger className={style.tabsTrigger} {...rest} />
}
