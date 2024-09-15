import { ComponentPropsWithoutRef, ElementType, forwardRef } from 'react'

import clsx from 'clsx'

import style from './button.module.scss'

type PolymorphicRef<T extends ElementType> = ComponentPropsWithoutRef<T>['ref']

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  fullWidth?: boolean
  variant?: 'primary' | 'secondary'
} & ComponentPropsWithoutRef<T>

export const Button = forwardRef(
  <T extends ElementType = 'button'>(props: ButtonProps<T>, ref: PolymorphicRef<T>) => {
    const { as: Component = 'button', className, fullWidth, variant = 'primary', ...rest } = props

    return (
      <Component
        className={clsx(style[variant], fullWidth && style.fullWidth, className)}
        ref={ref}
        {...rest}
      />
    )
  }
)
