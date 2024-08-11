import type { Meta, StoryObj } from '@storybook/react'

import { Tabs } from './tabs'

const meta = {
  component: Tabs,
  tags: ['autodocs'],
  title: 'Components/UI/Tabs',
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

const dataPrimary = [
  { name: 'Sunday', value: '1' },
  { name: 'Monday', value: '2' },
  { name: 'Thursday', value: '3' },
  { name: 'Wednesday', value: '4' },
]

const dataPrimaryWithDisabled = [
  { name: 'Sunday', value: '1' },
  { name: 'Monday', value: '2' },
  { name: 'Thursday', value: '3' },
  { disabled: true, name: 'Wednesday', value: '4' },
]

export const Primary: Story = {
  args: { data: dataPrimary, defaultValue: '3', title: 'Title' },
}

export const PrimaryWithDisabled: Story = {
  args: { data: dataPrimaryWithDisabled, defaultValue: '3', title: 'Title' },
}
