import type { Meta, StoryObj } from '@storybook/react'

import { LoginForm, LoginFormValues } from './loginForm'

const meta = {
  component: LoginForm,
  tags: ['autodocs'],
  title: 'Layout/LoginForm',
} satisfies Meta<typeof LoginForm>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    onSubmit: console.log,
  },
}
