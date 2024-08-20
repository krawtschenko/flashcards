import type { Meta, StoryObj } from '@storybook/react'

import { Tabs } from './tabs'

const meta = {
  component: Tabs,
  tags: ['autodocs'],
  title: 'UI/Tabs',
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

const options = [
  { name: 'Sunday', value: '1' },
  { name: 'Monday', value: '2' },
  { name: 'Thursday', value: '3' },
  { name: 'Wednesday', value: '4' },
]

const optionsWithDisabled = [
  { name: 'Sunday', value: '1' },
  { name: 'Monday', value: '2' },
  { name: 'Thursday', value: '3' },
  { disabled: true, name: 'Wednesday', value: '4' },
]

export const Primary: Story = {
  args: { defaultValue: '3', options: options, title: 'Title' },
}

export const PrimaryWithDisabled: Story = {
  args: { defaultValue: '3', options: optionsWithDisabled, title: 'Title' },
}
