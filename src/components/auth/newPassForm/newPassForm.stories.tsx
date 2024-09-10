import type { Meta, StoryObj } from '@storybook/react'

import { NewPassForm } from './newPassForm'

const meta = {
  component: NewPassForm,
  tags: ['autodocs'],
  title: 'Auth/NewPassForm',
} satisfies Meta<typeof NewPassForm>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { onSubmit: console.log },
}
