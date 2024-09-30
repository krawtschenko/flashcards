import { ComponentPropsWithoutRef } from 'react'

import * as AvatarRadix from '@radix-ui/react-avatar'
import clsx from 'clsx'

import style from './avatar.module.scss'

type AvatarProps = {
  avatar?: string
  fontSize?: number
  name?: string
} & ComponentPropsWithoutRef<typeof AvatarRadix.Root>

export const Avatar = ({ avatar, className, fontSize, name, ...rest }: AvatarProps) => {
  // Create a fallback using the first letters of the name
  const fallback = name
    ?.split(' ')
    .slice(0, 2)
    .map(word => word[0].toUpperCase())
    .join('')

  const lightBackground = localStorage.getItem('lightBackground') || 'red'
  const textColor = localStorage.getItem('textColor') || 'black'

  return (
    <AvatarRadix.Root className={clsx(style.avatarRoot, className)} {...rest}>
      <AvatarRadix.Image alt={name} className={style.avatarImage} src={avatar} />

      <AvatarRadix.Fallback
        className={style.avatarFallback}
        delayMs={0}
        style={{ background: lightBackground, color: textColor, fontSize }}
      >
        {fallback}
      </AvatarRadix.Fallback>
    </AvatarRadix.Root>
  )
}
