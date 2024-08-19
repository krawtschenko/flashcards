import { Meta } from '@storybook/react'

import avatar from '../../../assets/images/avatar.png'
import { DropdownItem, DropdownLabel, DropdownMenu } from './dropdownMenu'

const meta = {
  component: DropdownMenu,
  tags: ['autodocs'],
  title: 'UI/DropdownMenu',
} as Meta<typeof DropdownMenu>

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

const personalInfo = { avatar, email: 'eugene@example.com', name: 'Eugene' }

export const WithPersonalInfo = {
  render: () => {
    return (
      <DropdownMenu avatar={avatar} variant={'avatar'}>
        <DropdownLabel personalInfo={personalInfo} />
        <DropdownItem>One</DropdownItem>
        <DropdownItem>Two</DropdownItem>
        <DropdownItem>Three</DropdownItem>
        <DropdownItem>Four</DropdownItem>
      </DropdownMenu>
    )
  },
}
