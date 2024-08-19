import type { Meta, StoryObj } from '@storybook/react'

import { SignUpForm } from './signUpForm'

const meta = {
  component: SignUpForm,
  tags: ['autodocs'],
  title: 'Auth/SignUpForm',
} satisfies Meta<typeof SignUpForm>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    onSubmit: console.log,
  },
}
