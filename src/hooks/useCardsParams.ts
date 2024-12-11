import { ChangeEvent } from 'react'
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
    5
  )

  const onChangeQuestion = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(1)
    setQuestion(e.currentTarget.value)
  }

  const onChangeOrderBy = (value: null | string) => {
    setCurrentPage(1)
    setOrderBy(value)
  }

  const onChangeItemsPerPage = (items: number) => {
    setCurrentPage(1)
    setItemsPerPage(items)
  }

  return {
    currentPage,
    itemsPerPage,
    onChangeItemsPerPage,
    onChangeOrderBy,
    onChangeQuestion,
    orderBy,
    question,
    setCurrentPage,
    setItemsPerPage,
    setOrderBy,
    setQuestion,
  }
}
