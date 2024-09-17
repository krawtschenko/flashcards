import { ComponentPropsWithoutRef } from 'react'

import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu'
import clsx from 'clsx'
import { FiMoreVertical } from 'react-icons/fi'

import style from './dropdownMenu.module.scss'

import { Avatar } from '../avatar/avatar'
import { Typography } from '../typography/typography'

type DropdownMenuProps = {
  avatar?: string
  name?: string
  variant: 'avatar' | 'icon'
} & ComponentPropsWithoutRef<typeof DropdownMenuRadix.Root>

export const DropdownMenu = ({ avatar, children, name, variant, ...rest }: DropdownMenuProps) => {
  return (
    <DropdownMenuRadix.Root {...rest}>
      <DropdownMenuRadix.Trigger asChild>
        <button
          aria-label={'Customise options'}
          className={clsx(variant === 'icon' && style.icon)}
          type={'button'}
        >
          {variant === 'avatar' && (
            <Avatar avatar={avatar} className={style.avatar} fontSize={20} name={name} />
          )}

          {variant === 'icon' && <FiMoreVertical />}
        </button>
      </DropdownMenuRadix.Trigger>

      <DropdownMenuRadix.Portal>
        <DropdownMenuRadix.Content
          align={'end'}
          alignOffset={-8}
          className={style.dropdownMenuContent}
          sideOffset={8}
        >
          <DropdownMenuRadix.Arrow asChild className={style.dropdownMenuArrowWrap}>
            <div className={style.dropdownMenuArrow} />
          </DropdownMenuRadix.Arrow>
          {children}
        </DropdownMenuRadix.Content>
      </DropdownMenuRadix.Portal>
    </DropdownMenuRadix.Root>
  )
}

export const DropdownItem = (props: ComponentPropsWithoutRef<typeof DropdownMenuRadix.Item>) => {
  const { className, ...rest } = props

  return <DropdownMenuRadix.Item className={clsx(style.dropdownMenuItem, className)} {...rest} />
}

type DropdownLabelProps = {
  avatar?: string
  email?: string
  name?: string
} & ComponentPropsWithoutRef<typeof DropdownMenuRadix.Label>

export const DropdownLabel = (props: DropdownLabelProps) => {
  const { avatar, className, email, name, ...rest } = props

  return (
    <DropdownMenuRadix.Label className={style.dropdownMenuLabel} {...rest}>
      <Avatar avatar={avatar} fontSize={20} name={name} />

      <div className={style.text}>
        <Typography variant={'subtitle2'}>{name}</Typography>
        <Typography className={style.email} variant={'caption'}>
          {email}
        </Typography>
      </div>
    </DropdownMenuRadix.Label>
  )
}
