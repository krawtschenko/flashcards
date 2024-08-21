import type { Meta } from '@storybook/react'

import { useState } from 'react'

import { Profile, ProfileValue } from './profile'

const meta = {
  component: Profile,
  tags: ['autodocs'],
  title: 'Auth/Profile',
} satisfies Meta<typeof Profile>

export default meta

export const Primary = {
  render: () => {
    const [name, setName] = useState<ProfileValue>({ name: 'Eugene' })

    return (
      <Profile
        email={'readytofight@fight.info'}
        name={name.name}
        onSubmit={(e: ProfileValue) => setName(e)}
      />
    )
  },
}
