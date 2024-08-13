import type { Meta, StoryObj } from '@storybook/react'

import { Select } from './select'

const meta = {
  component: Select,
  tags: ['autodocs'],
  title: 'Components/UI/Select',
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

const items = [
  { name: 'Sunday', value: 'Sunday' },
  { name: 'Monday', value: 'Monday' },
  { name: 'Tuesday', value: 'Tuesday' },
  { name: 'Wednesday', value: 'Wednesday' },
  { name: 'Thursday', value: 'Thursday' },
  { name: 'Friday', value: 'Friday' },
]

export const Primary: Story = {
  args: { items, label: 'Select' },
}

export const Disabled: Story = {
  args: { disabled: true, items, label: 'Select' },
}
