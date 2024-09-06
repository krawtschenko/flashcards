import { ComponentPropsWithoutRef } from 'react'

import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu'
import clsx from 'clsx'
import { FiMoreVertical } from 'react-icons/fi'

import style from './dropdownMenu.module.scss'

import altAvatar from '../../../assets/images/avatar.png'
import { Typography } from '../typography/typography'

type DropdownMenuProps = { avatar?: string; variant: 'avatar' | 'icon' } & ComponentPropsWithoutRef<
  typeof DropdownMenuRadix.Root
>

export const DropdownMenu = ({ avatar, children, variant, ...rest }: DropdownMenuProps) => {
  const triggerClassName = variant === 'avatar' ? style.avatarButton : style.iconButton

  return (
    <DropdownMenuRadix.Root {...rest}>
      <DropdownMenuRadix.Trigger asChild>
        <button aria-label={'Customise options'} className={triggerClassName} type={'button'}>
          {variant === 'avatar' ? (
            <img alt={'avatar'} src={avatar ?? altAvatar} />
          ) : (
            <FiMoreVertical />
          )}
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
      <img alt={'avatar'} src={avatar ?? altAvatar} />
      <div className={style.text}>
        <Typography variant={'subtitle2'}>{name}</Typography>
        <Typography className={style.email} variant={'caption'}>
          {email}
        </Typography>
      </div>
    </DropdownMenuRadix.Label>
  )
}
