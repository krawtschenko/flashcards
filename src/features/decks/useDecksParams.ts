import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useQueryParam } from '../../hooks/useQueryParam'
import { useGetMinMaxCardsQuery } from './decksApi'

export const useDecksParams = () => {
  const { data: minMax } = useGetMinMaxCardsQuery()
  const [searchParams, setSearchParams] = useSearchParams()

  const [name, setName] = useQueryParam(searchParams, setSearchParams, 'name', '')

  const [minCards, setMinCards] = useQueryParam(
    searchParams,
    setSearchParams,
    'minCards',
    minMax?.min
  )

  const [maxCards, setMaxCards] = useQueryParam(
    searchParams,
    setSearchParams,
    'maxCards',
    minMax?.max
  )

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

  const [currentTab, setCurrentTab] = useQueryParam(
    searchParams,
    setSearchParams,
    'currentTab',
    'all'
  )

  const [range, setRange] = useState([minCards, maxCards])

  useEffect(() => {
    setRange([minCards, maxCards])
  }, [maxCards, minCards])

  return {
    currentPage,
    currentTab,
    itemsPerPage,
    maxCards,
    minCards,
    minMax,
    name,
    orderBy,
    range,
    setCurrentPage,
    setCurrentTab,
    setItemsPerPage,
    setMaxCards,
    setMinCards,
    setName,
    setOrderBy,
    setRange,
  }
}