import { ComponentPropsWithoutRef } from 'react'

import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu'
import clsx from 'clsx'
import { FiMoreVertical } from 'react-icons/fi'

import style from './dropdownMenu.module.scss'

import { Typography } from '../typography/typography'

type DropdownMenuProps = { avatar?: string } & ComponentPropsWithoutRef<
  typeof DropdownMenuRadix.Root
>

export const DropdownMenu = ({ avatar, children, ...rest }: DropdownMenuProps) => {
  const triggerClassName = avatar ? style.avatarButton : style.iconButton

  return (
    <DropdownMenuRadix.Root {...rest}>
      <DropdownMenuRadix.Trigger asChild>
        <button aria-label={'Customise options'} className={triggerClassName} type={'button'}>
          {avatar ? <img alt={'avatar'} src={avatar} /> : <FiMoreVertical />}
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
  const { children, className, ...rest } = props

  return (
    <DropdownMenuRadix.Item {...rest} className={clsx(style.dropdownMenuItem, className)}>
      {children}
    </DropdownMenuRadix.Item>
  )
}

type DropdownLabelProps = { personalInfo: PersonalInfo } & ComponentPropsWithoutRef<
  typeof DropdownMenuRadix.Label
>
type PersonalInfo = {
  avatar?: string
  email: string
  name: string
}

export const DropdownLabel = (props: DropdownLabelProps) => {
  const {
    children,
    className,
    personalInfo: { avatar, email, name },
    ...rest
  } = props

  return (
    <DropdownMenuRadix.Label className={style.dropdownMenuLabel} {...rest}>
      <img alt={'avatar'} src={avatar} />
      <div className={style.text}>
        <Typography variant={'subtitle2'}>{name}</Typography>
        <Typography className={style.email} variant={'caption'}>
          {email}
        </Typography>
      </div>
    </DropdownMenuRadix.Label>
  )
}
