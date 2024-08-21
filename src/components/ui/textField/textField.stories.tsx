import type { Meta } from '@storybook/react'

import { useState } from 'react'

import { FiSearch } from 'react-icons/fi'

import { TextField } from './textField'

const meta = {
  component: TextField,
  tags: ['autodocs'],
  title: 'UI/Text Field',
} satisfies Meta<typeof TextField>

export default meta

export const Primary = {
  render: () => {
    const [value, setValue] = useState('')

    return (
      <TextField
        disabled={false}
        label={'Primary'}
        onChange={event => setValue(event.currentTarget.value)}
        placeholder={'Primary'}
        value={value}
      />
    )
  },
}

export const Error = {
  render: () => {
    const [value, setValue] = useState('')

    return (
      <TextField
        disabled={false}
        error={'Error message'}
        label={'Error'}
        onChange={event => setValue(event.currentTarget.value)}
        placeholder={'Error'}
        value={value}
      />
    )
  },
}

export const Search = {
  render: () => {
    const [value, setValue] = useState('')

    return (
      <TextField
        disabled={false}
        icon={<FiSearch />}
        label={'Search'}
        onChange={event => setValue(event.currentTarget.value)}
        onClearValue={() => setValue('')}
        placeholder={'Search'}
        value={value}
      />
    )
  },
}

export const Password = {
  render: () => {
    const [value, setValue] = useState('')

    return (
      <TextField
        disabled={false}
        label={'Password'}
        onChange={event => setValue(event.currentTarget.value)}
        placeholder={'Password'}
        type={'password'}
        value={value}
      />
    )
  },
}
