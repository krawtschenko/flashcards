import type { Meta, StoryObj } from '@storybook/react'

import { TextField } from './text-field'

const meta = {
  component: TextField,
  tags: ['autodocs'],
  title: 'Components/UI/Text Field',
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { disabled: false, label: 'Label', placeholder: 'Placeholder' },
}

export const Error: Story = {
  args: { disabled: false, error: 'Error message', label: 'Label', placeholder: 'Placeholder' },
}

export const Search: Story = {
  args: { disabled: false, label: 'Search', placeholder: 'Placeholder', variant: 'search' },
}

export const Password: Story = {
  args: { disabled: false, label: 'Password', placeholder: 'Placeholder', variant: 'password' },
}
