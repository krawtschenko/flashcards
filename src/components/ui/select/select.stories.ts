import type { Meta, StoryObj } from '@storybook/react'

import { SelectDemo } from './select'

const meta = {
  component: SelectDemo,
  tags: ['autodocs'],
  title: 'Components/UI/SelectDemo',
} satisfies Meta<typeof SelectDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {},
}
