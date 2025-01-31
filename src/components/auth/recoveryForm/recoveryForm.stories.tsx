import type { Meta, StoryObj } from '@storybook/react'

import { RecoveryForm } from './recoveryForm'

const meta = {
  component: RecoveryForm,
  tags: ['autodocs'],
  title: 'Auth/RecoveryForm',
} satisfies Meta<typeof RecoveryForm>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    isSuccess: false,
    recovery: console.log,
  },
}

export const Success: Story = {
  args: {
    isSuccess: true,
    recovery: console.log,
  },
}
