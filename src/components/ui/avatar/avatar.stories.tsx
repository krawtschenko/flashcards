import type { Meta, StoryObj } from '@storybook/react'

import { Avatar } from './avatar'

const meta = {
  component: Avatar,
  tags: ['autodocs'],
  title: 'UI/Avatar',
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const WithAvatar: Story = {
  args: {
    avatar: 'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80',
  },
}

export const WithoutAvatar: Story = {
  args: {
    fallbackSize: 20,
    name: 'Test',
  },
}
