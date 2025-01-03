import type { Meta } from '@storybook/react'

import { useState } from 'react'

import { Select, SelectItem } from './select'

const meta = {
  component: Select,
  tags: ['autodocs'],
  title: 'UI/Select',
} satisfies Meta<typeof Select>

export default meta

export const Primary = {
  render: () => {
    const [value, setValue] = useState('Sunday')

    return (
      <Select onValueChange={setValue} value={value}>
        <SelectItem value={'Sunday'}>Sunday</SelectItem>
        <SelectItem value={'Monday'}>Monday</SelectItem>
        <SelectItem value={'Tuesday'}>Tuesday</SelectItem>
      </Select>
    )
  },
}

export const Disabled = {
  render: () => {
    const [value, setValue] = useState('Sunday')

    return (
      <Select disabled onValueChange={setValue} value={value}>
        <SelectItem value={'Sunday'}>Sunday</SelectItem>
        <SelectItem value={'Monday'}>Monday</SelectItem>
        <SelectItem value={'Tuesday'}>Tuesday</SelectItem>
      </Select>
    )
  },
}
