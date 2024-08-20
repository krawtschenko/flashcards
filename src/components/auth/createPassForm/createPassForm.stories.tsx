import type { Meta, StoryObj } from '@storybook/react'

import { CreatePassForm } from './createPassForm'

const meta = {
  component: CreatePassForm,
  tags: ['autodocs'],
  title: 'Auth/CreatePassForm',
} satisfies Meta<typeof CreatePassForm>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { onSubmit: console.log },
}
