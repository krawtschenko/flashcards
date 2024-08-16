import clsx from 'clsx'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

import style from './pagination.module.scss'

import { Select, SelectItem } from '../select/select'
import { usePagination } from './usePagination'

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

  const pages = usePagination(currentPage, totalPages)

  const handlePageClick = (page: '...' | number) => {
    if (page !== currentPage && page !== '...') {
      onPageChange(page)
    }
  }

  return (
    <div className={clsx(style.pagination, className)}>
      <button
        className={clsx(style.button, currentPage === 1 && style.arrowDisabled)}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        type={'button'}
      >
        <FiChevronLeft />
      </button>

      {pages.map((page, index) => (
        <button
          className={clsx(style.button, page === currentPage && style.active)}
          disabled={page === '...'}
          key={index}
          onClick={() => handlePageClick(Number(page))}
          type={'button'}
        >
          {page}
        </button>
      ))}

      <button
        className={clsx(style.button, currentPage === totalPages && style.arrowDisabled)}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        type={'button'}
      >
        <FiChevronRight />
      </button>

      <span>Show</span>
      <Select
        className={style.select}
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
  )
}
