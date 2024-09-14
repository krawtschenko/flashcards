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
  email: 'test@test.info',
  name: 'test',
}

export const LoggedIn: Story = {
  args: { isAuthenticated: true, logout: () => console.log(), personalInfo },
}

export const UnLoggedIn: Story = {
  args: { isAuthenticated: false, logout: () => console.log() },
}
