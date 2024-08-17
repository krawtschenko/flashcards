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
  { label: 'Sunday', value: '1' },
  { label: 'Monday', value: '2' },
  { label: 'Thursday', value: '3' },
  { label: 'Wednesday', value: '4' },
]

export const Primary: Story = {
  args: { options },
}

export const Disabled: Story = {
  args: { disabled: true, options },
}
