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
    const range = []
    const pages = []

    // Если страниц меньше или равно 5, показываем все
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else if (currentPage <= 4) {
      // Если текущая страница от 1 до 4, показываем первые несколько страниц
      for (let i = 1; i <= 5; i++) {
        range.push(i)
      }
      pages.push(...range)
      if (totalPages > 5) {
        pages.push('...')
        pages.push(totalPages)
      }
    } else if (currentPage >= totalPages - 2) {
      // Если текущая страница близка к последней, показываем последние страницы
      for (let i = totalPages - 4; i <= totalPages; i++) {
        range.push(i)
      }
      pages.push(1)
      pages.push('...')
      pages.push(...range)
    } else {
      // Страница в середине диапазона
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        range.push(i)
      }
      pages.push(1)
      pages.push('...')
      pages.push(...range)
      pages.push('...')
      pages.push(totalPages)
    }

    // // Убедимся, что страница не начинается с "..." если это не требуется
    // if (pages[0] === '...') {
    //   pages.shift()
    // }
    //
    // // Убедимся, что страница не заканчивается на "..." если это не требуется
    // if (pages[pages.length - 1] === '...') {
    //   pages.pop()
    // }

    return pages
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
        className={clsx(style.button, currentPage === 1 && style.arrowDisabled)}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        type={'button'}
      >
        <FiChevronLeft />
      </button>

      {/* Display page numbers */}
      {getPagination().map((page, index) => (
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

      {/* Next Button */}
      <button
        className={clsx(style.button, currentPage === totalPages && style.arrowDisabled)}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        type={'button'}
      >
        <FiChevronRight />
      </button>

      {/* Items per page dropdown */}
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
