import type { Meta, StoryObj } from '@storybook/react'

import { CheckEmailForm } from './checkEmailForm'

const meta = {
  component: CheckEmailForm,
  tags: ['autodocs'],
  title: 'Auth/CheckEmailForm',
} satisfies Meta<typeof CheckEmailForm>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {},
}
