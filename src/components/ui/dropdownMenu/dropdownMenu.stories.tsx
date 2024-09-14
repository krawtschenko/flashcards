import { Meta } from '@storybook/react'

import { DropdownItem, DropdownLabel, DropdownMenu } from './dropdownMenu'

const meta = {
  component: DropdownMenu,
  tags: ['autodocs'],
  title: 'UI/DropdownMenu',
} satisfies Meta<typeof DropdownMenu>

export default meta

export const WithIcon = {
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

export const WithAvatar = {
  render: () => {
    const avatar =
      'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80'

    return (
      <DropdownMenu avatar={avatar} name={'Eugene'} variant={'avatar'}>
        <DropdownLabel avatar={avatar} email={'eugene@example.com'} name={'Eugene'} />
        <DropdownItem>One</DropdownItem>
        <DropdownItem>Two</DropdownItem>
        <DropdownItem>Three</DropdownItem>
        <DropdownItem>Four</DropdownItem>
      </DropdownMenu>
    )
  },
}

export const WithoutAvatar = {
  render: () => {
    return (
      <DropdownMenu name={'Eugene'} variant={'avatar'}>
        <DropdownLabel email={'eugene@example.com'} name={'Eugene'} />
        <DropdownItem>One</DropdownItem>
        <DropdownItem>Two</DropdownItem>
        <DropdownItem>Three</DropdownItem>
        <DropdownItem>Four</DropdownItem>
      </DropdownMenu>
    )
  },
}
