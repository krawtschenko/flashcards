import type { Meta, StoryObj } from '@storybook/react'

import { RegistrationForm } from './registrationForm'

const meta = {
  component: RegistrationForm,
  tags: ['autodocs'],
  title: 'Auth/RegistrationForm',
} satisfies Meta<typeof RegistrationForm>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    onSubmit: console.log,
  },
}
