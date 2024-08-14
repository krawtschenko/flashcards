import { ComponentPropsWithoutRef } from 'react'

import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu'
import { FiMoreVertical } from 'react-icons/fi'

import style from './dropdownMenu.module.scss'

type DropdownMenuProps = {} & ComponentPropsWithoutRef<typeof DropdownMenuRadix.Root>

export const DropdownMenu = ({ children, ...rest }: DropdownMenuProps) => {
  return (
    <DropdownMenuRadix.Root {...rest}>
      <DropdownMenuRadix.Trigger asChild>
        <button aria-label={'Customise options'} className={style.iconButton} type={'button'}>
          <FiMoreVertical />
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

          {/*<DropdownMenuRadix.Label className={style.dropdownMenuLabel}>*/}
          {/*  People*/}
          {/*</DropdownMenuRadix.Label>*/}

          {children}
        </DropdownMenuRadix.Content>
      </DropdownMenuRadix.Portal>
    </DropdownMenuRadix.Root>
  )
}

type DropdownItemProps = {} & ComponentPropsWithoutRef<typeof DropdownMenuRadix.Item>

export const DropdownItem = ({ children, ...rest }: DropdownItemProps) => {
  return (
    <DropdownMenuRadix.Item {...rest} className={style.dropdownMenuItem}>
      {children}
    </DropdownMenuRadix.Item>
  )
}
