import { Meta } from '@storybook/react'

import avatar from '../../../assets/images/no-photo.svg'
import { DropdownItem, DropdownLabel, DropdownMenu } from './dropdownMenu'

const meta = {
  component: DropdownMenu,
  tags: ['autodocs'],
  title: 'UI/DropdownMenu',
} satisfies Meta<typeof DropdownMenu>

export default meta

export const Default = {
  render: () => {
    return (
      <DropdownMenu variant={'icon'}>
        <DropdownItem>One</DropdownItem>
        <DropdownItem>Two</DropdownItem>
        <DropdownItem>Three</DropdownItem>
        <DropdownItem>Four</DropdownItem>
      </DropdownMenu>
    )
  },
}

export const WithPersonalInfo = {
  render: () => {
    return (
      <DropdownMenu avatar={avatar} variant={'avatar'}>
        <DropdownLabel avatar={avatar} email={'eugene@example.com'} name={'Eugene'} />
        <DropdownItem>One</DropdownItem>
        <DropdownItem>Two</DropdownItem>
        <DropdownItem>Three</DropdownItem>
        <DropdownItem>Four</DropdownItem>
      </DropdownMenu>
    )
  },
}
