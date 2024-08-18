import type { Meta } from '@storybook/react'

import { RadioGroup, RadioGroupItem } from './radioGroup'

const meta = {
  component: RadioGroup,
  tags: ['autodocs'],
  title: 'UI/Radio Group',
} satisfies Meta<typeof RadioGroup>

export default meta

export const Primary = {
  render: () => {
    return (
      <RadioGroup>
        <RadioGroupItem label={'Thor'} value={'Thor'} />
        <RadioGroupItem label={'Hulk'} value={'Hulk'} />
        <RadioGroupItem label={'Tony'} value={'Tony'} />
        <RadioGroupItem label={'Thrall'} value={'Thrall'} />
        <RadioGroupItem label={'Sydney'} value={'Sydney'} />
      </RadioGroup>
    )
  },
}

export const Disabled = {
  render: () => {
    return (
      <RadioGroup disabled>
        <RadioGroupItem label={'Thor'} value={'Thor'} />
        <RadioGroupItem label={'Hulk'} value={'Hulk'} />
        <RadioGroupItem label={'Tony'} value={'Tony'} />
        <RadioGroupItem label={'Thrall'} value={'Thrall'} />
        <RadioGroupItem label={'Sydney'} value={'Sydney'} />
      </RadioGroup>
    )
  },
}
