import { Meta, StoryObj } from '@storybook/react'

import { Header } from './header'

const meta = {
  component: Header,
  tags: ['autodocs'],
  title: 'Layout/Header',
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

const personalInfo = {
  avatar: 'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80',
  email: 'test@test.info',
  name: 'test',
}

export const LoggedIn: Story = {
  args: { isAuthenticated: true, logout: () => console.log(), personalInfo },
}

export const UnLoggedIn: Story = {
  args: { isAuthenticated: false, logout: () => console.log() },
}
