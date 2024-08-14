import { Meta } from '@storybook/react'

import { DropdownItem, DropdownMenu } from './dropdownMenu'

export default {
  component: DropdownMenu,
  title: 'Components/UI/DropdownMenu',
} as Meta<typeof DropdownMenu>

export const Primary = {
  render: () => {
    return (
      <DropdownMenu>
        <DropdownItem>One</DropdownItem>
        <DropdownItem>Two</DropdownItem>
        <DropdownItem>Three</DropdownItem>
        <DropdownItem>Four</DropdownItem>
      </DropdownMenu>
    )
  },
}
