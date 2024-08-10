import type { Meta, StoryObj } from '@storybook/react'

import { FiLogOut } from 'react-icons/fi'

import { Button } from './button'

const meta = {
  component: Button,
  tags: ['autodocs'],
  title: 'Components/UI/Button',
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    disabled: false,
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    disabled: false,
    variant: 'secondary',
  },
}

export const PrimaryWithIcon: Story = {
  args: {
    children: (
      <>
        <FiLogOut />
        Primary Button
      </>
    ),
    disabled: false,
    variant: 'primary',
  },
}

export const SecondaryWithIcon: Story = {
  args: {
    children: (
      <>
        <FiLogOut />
        Secondary Button
      </>
    ),
    disabled: false,
    variant: 'secondary',
  },
}
