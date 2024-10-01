import type { Meta, StoryObj } from '@storybook/react'

import { LoadingBar } from './loadingBar'

const meta = {
  component: LoadingBar,
  tags: ['autodocs'],
  title: 'UI/LoadingBar',
} satisfies Meta<typeof LoadingBar>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    loading: true,
  },
}
