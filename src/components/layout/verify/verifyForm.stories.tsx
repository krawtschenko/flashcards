import type { Meta, StoryObj } from '@storybook/react'

import { VerifyForm } from './verifyForm'

const meta = {
  component: VerifyForm,
  tags: ['autodocs'],
  title: 'Layout/VerifyForm',
} satisfies Meta<typeof VerifyForm>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    email: 'kravchenko.eugene@outlook.com',
    verify: console.log,
  },
}
