import type { Meta } from '@storybook/react'

import { Tabs, TabsTrigger } from './tabs'

const meta = {
  component: Tabs,
  tags: ['autodocs'],
  title: 'UI/Tabs',
} satisfies Meta<typeof Tabs>

export default meta

export const Primary = {
  render: () => {
    return (
      <Tabs defaultValue={'2'} title={'Primary'}>
        <TabsTrigger value={'1'}>Sunday</TabsTrigger>
        <TabsTrigger value={'2'}>Monday</TabsTrigger>
        <TabsTrigger value={'3'}>Thursday</TabsTrigger>
      </Tabs>
    )
  },
}

export const PrimaryWithDisabled = {
  render: () => {
    return (
      <Tabs defaultValue={'3'} title={'Primary With Disabled'}>
        <TabsTrigger value={'1'}>Sunday</TabsTrigger>
        <TabsTrigger value={'2'}>Monday</TabsTrigger>
        <TabsTrigger value={'3'}>Thursday</TabsTrigger>
        <TabsTrigger disabled value={'4'}>
          Wednesday
        </TabsTrigger>
      </Tabs>
    )
  },
}
