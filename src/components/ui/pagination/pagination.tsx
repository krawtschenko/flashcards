import clsx from 'clsx'

import style from './pagination.module.scss'

import { usePagination } from './usePagination'

type PaginationProps = {
  className?: string
  currentPage: number
  onPageChange: (page: number) => void
  pageSize: number
  siblingCount?: number
  totalCount: number
}

export const Pagination = (props: PaginationProps) => {
  const { className, currentPage, onPageChange, pageSize, siblingCount = 1, totalCount } = props

  const paginationRange = usePagination({
    currentPage,
    pageSize,
    siblingCount,
    totalCount,
  })

  if (paginationRange) {
    // If there are less than 2 times in pagination range we shall not render the component
    if (currentPage === 0 || paginationRange.length < 2) {
      return null
    }

    const onNext = () => {
      onPageChange(currentPage + 1)
    }

    const onPrevious = () => {
      onPageChange(currentPage - 1)
    }

    const lastPage = paginationRange[paginationRange.length - 1]

    return (
      <ul className={clsx(style.paginationContainer)}>
        {/* Left navigation arrow */}
        <li
          className={clsx(style.paginationItem, currentPage === 1 && style.disabled)}
          onClick={onPrevious}
        >
          <div className={clsx(style.arrow, style.left)} />
        </li>
        {paginationRange.map((pageNumber, index) => {
          // If the pageItem is a DOT, render the DOTS unicode character
          if (pageNumber === '...') {
            return (
              <li className={clsx(style.paginationItem, style.dots)} key={index}>
                &#8230;
              </li>
            )
          }

          // Render our Page Pills
          return (
            <li
              className={clsx(style.paginationItem, pageNumber === currentPage && style.selected)}
              key={index}
              onClick={() => onPageChange(Number(pageNumber))}
            >
              {pageNumber}
            </li>
          )
        })}
        {/*  Right Navigation arrow */}
        <li
          className={clsx(style.paginationItem, currentPage === lastPage && style.disabled)}
          onClick={onNext}
        >
          <div className={clsx(style.arrow, style.right)} />
        </li>
      </ul>
    )
  }
}
