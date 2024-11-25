import { useSearchParams } from 'react-router-dom'

import { useQueryParam } from './useQueryParam'

export const useCardsParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [question, setQuestion] = useQueryParam(searchParams, setSearchParams, 'question', '')

  const [orderBy, setOrderBy] = useQueryParam<null | string>(
    searchParams,
    setSearchParams,
    'orderBy',
    null
  )

  const [currentPage, setCurrentPage] = useQueryParam(
    searchParams,
    setSearchParams,
    'currentPage',
    1
  )

  const [itemsPerPage, setItemsPerPage] = useQueryParam(
    searchParams,
    setSearchParams,
    'itemsPerPage',
    10
  )

  return {
    currentPage,
    itemsPerPage,
    orderBy,
    question,
    setCurrentPage,
    setItemsPerPage,
    setOrderBy,
    setQuestion,
  }
}
