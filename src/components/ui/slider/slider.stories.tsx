import type { Meta } from '@storybook/react'

import { useState } from 'react'

import { Slider } from './slider'

const meta = {
  component: Slider,
  tags: ['autodocs'],
  title: 'UI/Slider',
} satisfies Meta<typeof Slider>

export default meta

export const Primary = {
  render: () => {
    const [value, setValue] = useState<number[]>([3, 80])

    return <Slider onValueChange={setValue} value={value} />
  },
}

export const Disabled = {
  render: () => {
    const [value, setValue] = useState<number[]>([3, 80])

    return <Slider disabled onValueChange={setValue} value={value} />
  },
}
