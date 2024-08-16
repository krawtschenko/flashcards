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
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(5)
    const totalItems = 100

    // Calculate total number of pages
    const totalPages = Math.ceil(totalItems / itemsPerPage)

    // Page change handler
    const handlePageChange = (page: number) => {
      setCurrentPage(page)
    }

    // Items per page change handler
    const handleItemsPerPageChange = (newItemsPerPage: number) => {
      setItemsPerPage(newItemsPerPage)
      setCurrentPage(1) // Сбрасываем на первую страницу при изменении количества элементов
    }

    return (
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
        onPageChange={handlePageChange}
        totalPages={totalPages}
      />
    )
  },
}
