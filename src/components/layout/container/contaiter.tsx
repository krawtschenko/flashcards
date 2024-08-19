import { ComponentPropsWithoutRef } from 'react'

import clsx from 'clsx'

import style from './container.module.scss'

export const Container = ({ className, ...rest }: ComponentPropsWithoutRef<'div'>) => {
  return <div className={clsx(style.container, className)} {...rest} />
}
