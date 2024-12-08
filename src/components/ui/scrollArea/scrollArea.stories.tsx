import type { Meta } from '@storybook/react'

import { ScrollArea } from './scrollArea'

const meta = {
  component: ScrollArea,
  tags: ['autodocs'],
  title: 'UI/ScrollArea',
} satisfies Meta<typeof ScrollArea>

export default meta

const TAGS = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`)

export const Primary = {
  render: () => {
    return (
      <ScrollArea>
        <div>Tags</div>

        {TAGS.map(tag => (
          <div key={tag}>{tag}</div>
        ))}
      </ScrollArea>
    )
  },
}
