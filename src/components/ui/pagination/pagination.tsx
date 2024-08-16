import clsx from 'clsx'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

import style from './pagination.module.scss'

import { Select, SelectItem } from '../select/select'

type PaginationProps = {
  className?: string
  currentPage: number
  itemsPerPage: number
  onItemsPerPageChange: (items: number) => void
  onPageChange: (page: number) => void
  totalPages: number
}

export const Pagination = (props: PaginationProps) => {
  const { className, currentPage, itemsPerPage, onItemsPerPageChange, onPageChange, totalPages } =
    props

  const getPagination = () => {
    const delta = 2
    const range = []
    const pages = []

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      pages.push('...')
    }

    pages.push(...range)

    if (currentPage + delta < totalPages - 1) {
      pages.push('...')
    }

    return totalPages === 1 ? [1] : [1, ...pages, totalPages]
  }

  const handlePageClick = (page: '...' | number) => {
    if (page !== currentPage && page !== '...') {
      onPageChange(page)
    }
  }

  return (
    <div className={clsx(style.pagination, className)}>
      {/* Previous Button */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        type={'button'}
      >
        <FiChevronLeft />
      </button>

      {/* Display page numbers */}
      {getPagination().map((page, index) => (
        <button
          className={clsx(page === currentPage && style.active)}
          disabled={page === '...'}
          key={index}
          onClick={() => handlePageClick(Number(page))}
          type={'button'}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        type={'button'}
      >
        <FiChevronRight />
      </button>

      {/* Items per page dropdown */}
      <div className={'items-per-page'}>
        <span>Show</span>

        <Select
          onValueChange={value => onItemsPerPageChange(Number(value))}
          value={itemsPerPage.toString()}
        >
          <SelectItem value={'5'}>5</SelectItem>
          <SelectItem value={'10'}>10</SelectItem>
          <SelectItem value={'30'}>30</SelectItem>
          <SelectItem value={'50'}>50</SelectItem>
          <SelectItem value={'100'}>100</SelectItem>
        </Select>
        <span>per page</span>
      </div>
    </div>
  )
}
