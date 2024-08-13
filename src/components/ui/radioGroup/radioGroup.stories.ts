import type { Meta, StoryObj } from '@storybook/react'

import { RadioGroup } from './radioGroup'

const meta = {
  component: RadioGroup,
  tags: ['autodocs'],
  title: 'Components/UI/Radio Group',
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

const options = [
  { id: '1', name: 'Sunday' },
  { id: '2', name: 'Monday' },
  { id: '3', name: 'Thursday' },
  { id: '4', name: 'Wednesday' },
]

export const Primary: Story = {
  args: { options },
}

export const Disabled: Story = {
  args: { disabled: true, options },
}
