import type { Meta } from '@storybook/react'

import { RadioGroup } from './radioGroup'

const meta = {
  component: RadioGroup,
  tags: ['autodocs'],
  title: 'UI/Radio Group',
} satisfies Meta<typeof RadioGroup>

export default meta

const options = [
  { label: 'Option One', value: 'option-one' },
  { label: 'Option Two', value: 'option-two' },
  { label: 'Option Three', value: 'option-three' },
  { label: 'Option Four', value: 'option-four' },
]

export const Primary = {
  render: () => {
    return <RadioGroup options={options} />
  },
}

export const Disabled = {
  render: () => {
    return <RadioGroup disabled options={options} />
  },
}
