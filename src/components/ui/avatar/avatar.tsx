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
  const fallback = name
    ?.split(' ')
    .slice(0, 2)
    .map(word => word[0])
    .join('')

  return (
    <AvatarRadix.Root className={clsx(style.avatarRoot, className)} {...rest}>
      <AvatarRadix.Image alt={name} className={style.avatarImage} src={avatar} />

      <AvatarRadix.Fallback
        className={style.avatarFallback}
        delayMs={0}
        style={{ fontSize: fallbackSize }}
      >
        {fallback}
      </AvatarRadix.Fallback>
    </AvatarRadix.Root>
  )
}
