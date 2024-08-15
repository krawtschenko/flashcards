import type { Meta } from '@storybook/react'

import { useState } from 'react'

import { Pagination } from './pagination'

const meta = {
  component: Pagination,
  tags: ['autodocs'],
  title: 'Components/UI/Pagination',
} satisfies Meta<typeof Pagination>

export default meta

export const Primary = {
  render: () => {
    const [currentPage, setCurrentPage] = useState<number>(1)

    return (
      <Pagination
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        pageSize={5}
        totalCount={100}
      />
    )
  },
}
