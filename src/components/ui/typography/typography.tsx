import { ComponentPropsWithoutRef, ElementType } from 'react'

import clsx from 'clsx'

import style from './typography.module.scss'

export type TypographyProps<T extends ElementType = 'span'> = {
  as?: T
  color?: 'black' | 'blue' | 'red' | 'white'
  variant: Variant
} & ComponentPropsWithoutRef<T>

type Variant =
  | 'body1'
  | 'body2'
  | 'caption'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'link1'
  | 'link2'
  | 'overline'
  | 'subtitle1'
  | 'subtitle2'

export const Typography = <T extends ElementType = 'span'>(props: TypographyProps<T>) => {
  const { as: Component = 'span', className, color = 'white', variant, ...rest } = props

  return <Component className={clsx(style[variant], style[color], className)} {...rest} />
}
