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
  // Create a fallback using the first letters of the name
  const fallback = name
    ?.split(' ')
    .slice(0, 2)
    .map(word => word[0])
    .join('')

  // Generate two colors for the gradient background
  const color1 = useMemo(() => getRandomColor(), [])
  const color2 = useMemo(() => getRandomColor(), [])

  // Determine text color (white or black) based on the presence of '0' or '1' in the colors
  const textColor = useMemo(
    () => (shouldUseWhiteText(color1) || shouldUseWhiteText(color2) ? '#FFFFFF' : '#000000'),
    [color1, color2]
  )

  // Create the CSS gradient string using the two colors
  const gradientBackground = useMemo(
    () => `linear-gradient(135deg, ${color1}, ${color2})`,
    [color1, color2]
  )

  return (
    <AvatarRadix.Root className={clsx(style.avatarRoot, className)} {...rest}>
      <AvatarRadix.Image alt={name} className={style.avatarImage} src={avatar} />

      <AvatarRadix.Fallback
        className={style.avatarFallback}
        delayMs={0}
        style={{ background: gradientBackground, color: textColor, fontSize: fallbackSize }} // Применяем градиент и цвет текста
      >
        {fallback}
      </AvatarRadix.Fallback>
    </AvatarRadix.Root>
  )
}

// Function to generate a random color in hex format
const getRandomColor = () => {
  const letters = '0123456789ABCDEF'
  let color = '#'

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }

  return color
}

// Function to check if the color contains '0' or '1'
const shouldUseWhiteText = (color: string) => {
  return color.includes('0') || color.includes('1') || color.includes('2')
}
