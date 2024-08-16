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

    // Если текущая страница от 1 до 3, показываем первые 5 страниц
    if (currentPage <= 3) {
      for (let i = 2; i <= Math.min(5, totalPages - 1); i++) {
        range.push(i)
      }
    } else {
      // Для страницы 4 и выше, показываем 1, ..., предыдущая, текущая, следующая, ...
      for (
        let i = Math.max(3, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        range.push(i)
      }
    }

    // Всегда показываем первую страницу
    pages.push(1)

    // Добавляем "..." перед диапазоном, если текущая страница больше 3
    if (currentPage > 3) {
      pages.push('...')
    }

    // Вставляем вычисленный диапазон страниц
    pages.push(...range)

    // Добавляем "..." после диапазона, если есть промежуток до последней страницы
    if (currentPage + 2 < totalPages - 1) {
      pages.push('...')
    }

    // Всегда показываем последнюю страницу
    if (totalPages > 1) {
      pages.push(totalPages)
    }

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
        className={clsx(currentPage === 1 && style.arrowDisabled)}
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
        className={clsx(currentPage === totalPages && style.arrowDisabled)}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        type={'button'}
      >
        <FiChevronRight />
      </button>

      {/* Items per page dropdown */}
      <div className={style.itemsPerPage}>
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
    </div>
  )
}
