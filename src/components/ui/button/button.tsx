import { ComponentPropsWithoutRef, ElementType } from 'react'

import clsx from 'clsx'

import style from './button.module.scss'

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  fullWidth?: boolean
  variant?: 'primary' | 'secondary'
} & ComponentPropsWithoutRef<T>

export const Button = <T extends ElementType = 'button'>(props: ButtonProps<T>) => {
  const { as: Component = 'button', className, fullWidth, variant = 'primary', ...rest } = props

  return (
    <Component
      className={clsx(style[variant], fullWidth ? style.fullWidth : '', className)}
      {...rest}
    />
  )
}
