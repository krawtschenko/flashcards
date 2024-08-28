import { ComponentProps } from 'react'

import * as TabsRadix from '@radix-ui/react-tabs'
import clsx from 'clsx'

import style from './tabs.module.scss'

import { Typography } from '../typography/typography'

type TabsProps = {
  options: Options[]
  title?: string
} & ComponentProps<typeof TabsRadix.Root>

type Options = { disabled?: boolean; name: string; value: string }

export const Tabs = ({ className, defaultValue, options, title, ...rest }: TabsProps) => {
  return (
    <TabsRadix.Root
      {...rest}
      className={clsx(style.tabsRoot, className)}
      defaultValue={defaultValue}
    >
      {title && (
        <Typography className={style.title} variant={'body2'}>
          {title}
        </Typography>
      )}

      <TabsRadix.List className={style.tabsList}>
        {options.map(({ disabled, name, value }, index) => (
          <TabsRadix.Trigger
            className={style.tabsTrigger}
            disabled={disabled}
            key={index}
            value={value}
          >
            {name}
          </TabsRadix.Trigger>
        ))}
      </TabsRadix.List>
    </TabsRadix.Root>
  )
}
