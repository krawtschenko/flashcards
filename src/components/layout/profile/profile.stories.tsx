import type { Meta } from '@storybook/react'

import { useState } from 'react'

import { Profile, ProfileValue } from './profile'

const meta = {
  component: Profile,
  tags: ['autodocs'],
  title: 'Layout/Profile',
} satisfies Meta<typeof Profile>

export default meta

export const Primary = {
  render: () => {
    const [name, setName] = useState<ProfileValue>({ name: 'Eugene' })

    return (
      <Profile
        email={'readytofight@fight.info'}
        logout={() => {}}
        name={name.name}
        update={(e: ProfileValue) => setName(e)}
      />
    )
  },
}
