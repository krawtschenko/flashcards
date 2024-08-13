import { ComponentPropsWithoutRef } from 'react'

import clsx from 'clsx'

import style from './card.module.scss'

export const Card = ({ className, ...rest }: ComponentPropsWithoutRef<'div'>) => {
  return <div className={clsx(style.card, className)} {...rest}></div>
}
