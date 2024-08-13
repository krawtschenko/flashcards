import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import * as SelectRadix from '@radix-ui/react-select'
import clsx from 'clsx'
import { FiChevronDown } from 'react-icons/fi'

import style from './select.module.scss'

import { Typography } from '../typography/typography'

type SelectProps = { items: Items[]; label?: string } & ComponentPropsWithoutRef<
  typeof SelectRadix.Root
>

type Items = {
  name: string
  value: string
}

export const Select = ({ disabled, items, label, ...rest }: SelectProps) => {
  return (
    <SelectRadix.Root disabled={disabled} {...rest}>
      {label && (
        <Typography
          className={clsx(style.label, disabled && style.labelDisabled)}
          variant={'body2'}
        >
          {label}
        </Typography>
      )}
      <SelectRadix.Trigger aria-label={'Food'} className={style.selectTrigger}>
        <SelectRadix.Value placeholder={items[0].name} />
        <SelectRadix.Icon className={style.selectIcon}>
          <FiChevronDown />
        </SelectRadix.Icon>
      </SelectRadix.Trigger>

      <SelectRadix.Portal>
        <SelectRadix.Content className={style.selectContent} position={'popper'} sideOffset={-1}>
          <SelectRadix.Viewport className={style.selectViewport}>
            <SelectRadix.Group>
              {items.map(({ name, value }) => (
                <SelectItem key={value} value={value}>
                  {name}
                </SelectItem>
              ))}
            </SelectRadix.Group>
          </SelectRadix.Viewport>
        </SelectRadix.Content>
      </SelectRadix.Portal>
    </SelectRadix.Root>
  )
}

type SelectItemProps = {
  children: ReactNode
  className?: string
} & ComponentPropsWithoutRef<typeof SelectRadix.Item>

const SelectItem = forwardRef<ElementRef<typeof SelectRadix.Item>, SelectItemProps>(
  (props, ref) => {
    const { children, className, ...rest } = props

    return (
      <SelectRadix.Item className={clsx(style.selectItem, className)} {...rest} ref={ref}>
        <SelectRadix.ItemText>{children}</SelectRadix.ItemText>
      </SelectRadix.Item>
    )
  }
)
