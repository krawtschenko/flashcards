import type { Meta } from '@storybook/react'

import { useState } from 'react'

import { Profile, ProfileValue } from './profile'

const meta = {
  component: Profile,
  tags: ['autodocs'],
  title: 'Layout/Profile',
} satisfies Meta<typeof Profile>

export default meta

export const Verified = {
  render: () => {
    const [name, setName] = useState<ProfileValue>({ name: 'Eugene' })

    return (
      <Profile
        avatar={
          'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80'
        }
        email={'readytofight@fight.info'}
        isEmailVerified
        logout={() => {}}
        name={name.name}
        update={(e: ProfileValue) => setName(e)}
        verify={() => {}}
      />
    )
  },
}

export const Unverified = {
  render: () => {
    const [name, setName] = useState<ProfileValue>({ name: 'Eugene' })

    return (
      <Profile
        email={'readytofight@fight.info'}
        isEmailVerified={false}
        logout={() => {}}
        name={name.name}
        update={(e: ProfileValue) => setName(e)}
        verify={() => {}}
      />
    )
  },
}
