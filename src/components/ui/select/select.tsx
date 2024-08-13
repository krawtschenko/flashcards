import React from 'react'

import * as Select from '@radix-ui/react-select'
import clsx from 'clsx'
import { FiCheck, FiChevronDown, FiChevronUp } from 'react-icons/fi'

import './select.css'

export const SelectDemo = () => (
  <Select.Root>
    <Select.Trigger aria-label={'Food'} className={'SelectTrigger'}>
      <Select.Value placeholder={'Select a fruit…'} />
      <Select.Icon className={'SelectIcon'}>
        <FiChevronDown />
      </Select.Icon>
    </Select.Trigger>
    <Select.Portal>
      <Select.Content className={'SelectContent'}>
        <Select.ScrollUpButton className={'SelectScrollButton'}>
          <FiChevronUp />
        </Select.ScrollUpButton>
        <Select.Viewport className={'SelectViewport'}>
          <Select.Group>
            <Select.Label className={'SelectLabel'}>Fruits</Select.Label>
            <SelectItem value={'apple'}>Apple</SelectItem>
            <SelectItem value={'banana'}>Banana</SelectItem>
            <SelectItem value={'blueberry'}>Blueberry</SelectItem>
            <SelectItem value={'grapes'}>Grapes</SelectItem>
            <SelectItem value={'pineapple'}>Pineapple</SelectItem>
          </Select.Group>

          <Select.Separator className={'SelectSeparator'} />

          <Select.Group>
            <Select.Label className={'SelectLabel'}>Vegetables</Select.Label>
            <SelectItem value={'aubergine'}>Aubergine</SelectItem>
            <SelectItem value={'broccoli'}>Broccoli</SelectItem>
            <SelectItem disabled value={'carrot'}>
              Carrot
            </SelectItem>
            <SelectItem value={'courgette'}>Courgette</SelectItem>
            <SelectItem value={'leek'}>Leek</SelectItem>
          </Select.Group>

          <Select.Separator className={'SelectSeparator'} />

          <Select.Group>
            <Select.Label className={'SelectLabel'}>Meat</Select.Label>
            <SelectItem value={'beef'}>Beef</SelectItem>
            <SelectItem value={'chicken'}>Chicken</SelectItem>
            <SelectItem value={'lamb'}>Lamb</SelectItem>
            <SelectItem value={'pork'}>Pork</SelectItem>
          </Select.Group>
        </Select.Viewport>
        <Select.ScrollDownButton className={'SelectScrollButton'}>
          <FiChevronDown />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
)

type SelectItemProps = {
  children: React.ReactNode
  className?: string
} & React.ComponentPropsWithoutRef<typeof Select.Item>

const SelectItem = React.forwardRef<React.ElementRef<typeof Select.Item>, SelectItemProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item className={clsx('SelectItem', className)} {...props} ref={forwardedRef}>
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className={'SelectItemIndicator'}>
          <FiCheck />
        </Select.ItemIndicator>
      </Select.Item>
    )
  }
)
