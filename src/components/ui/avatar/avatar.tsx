import { ComponentPropsWithoutRef } from 'react'

import * as AvatarRadix from '@radix-ui/react-avatar'
import clsx from 'clsx'

import style from './avatar.module.scss'

type AvatarProps = {
  avatar?: string
  fallbackSize?: number
  name?: string
} & ComponentPropsWithoutRef<typeof AvatarRadix.Root>

export const Avatar = ({ avatar, className, fallbackSize, name, ...rest }: AvatarProps) => {
  return (
    <AvatarRadix.Root className={clsx(style.avatarRoot, className)} {...rest}>
      {avatar && <AvatarRadix.Image alt={name} className={style.avatarImage} src={avatar} />}

      <AvatarRadix.Fallback
        className={style.avatarFallback}
        delayMs={600}
        style={{ fontSize: fallbackSize }}
      >
        {name && name[0]}
      </AvatarRadix.Fallback>
    </AvatarRadix.Root>
  )
}
