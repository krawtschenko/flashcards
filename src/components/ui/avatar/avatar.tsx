import { ComponentPropsWithoutRef, useMemo } from 'react'

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

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF'
    let color = '#'

    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)]
    }

    return color
  }

  const shouldUseWhiteText = (color: string) => {
    return color.includes('0') || color.includes('1') || color.includes('2')
  }

  const backgroundColor = useMemo(() => getRandomColor(), [])
  const color = useMemo(
    () => (shouldUseWhiteText(backgroundColor) ? '#f4f2fa' : '#000'),
    [backgroundColor]
  )

  return (
    <AvatarRadix.Root className={clsx(style.avatarRoot, className)} {...rest}>
      <AvatarRadix.Image alt={name} className={style.avatarImage} src={avatar} />

      <AvatarRadix.Fallback
        className={style.avatarFallback}
        delayMs={0}
        style={{ backgroundColor, color, fontSize: fallbackSize }}
      >
        {fallback}
      </AvatarRadix.Fallback>
    </AvatarRadix.Root>
  )
}
