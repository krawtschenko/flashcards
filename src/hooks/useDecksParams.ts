import { ChangeEvent, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useGetMinMaxCardsQuery } from '../features/decks/decksApi'
import { useQueryParam } from './useQueryParam'

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

  const [currentTab, setCurrentTab] = useQueryParam(
    searchParams,
    setSearchParams,
    'currentTab',
    'all'
  )

  const [orderBy, setOrderBy] = useQueryParam<null | string>(
    searchParams,
    setSearchParams,
    'orderBy',
    null
  )

  const [itemsPerPage, setItemsPerPage] = useQueryParam(
    searchParams,
    setSearchParams,
    'itemsPerPage',
    10
  )

  const [currentPage, setCurrentPage] = useQueryParam(
    searchParams,
    setSearchParams,
    'currentPage',
    1
  )

  const [range, setRange] = useState([minCards, maxCards])

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(1)
    setName(e.currentTarget.value)
  }

  const onChangeSlider = (value: number[]) => {
    setCurrentPage(1)
    setMinCards(value[0])
    setMaxCards(value[1])
  }

  const onChangeTab = (value: string) => {
    setCurrentTab(value)
    setCurrentPage(1)
  }

  const onChangeOrderBy = (value: null | string) => {
    setCurrentPage(1)
    setOrderBy(value)
  }

  const onChangeItemsPerPage = (items: number) => {
    setCurrentPage(1)
    setItemsPerPage(items)
  }

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
    onChangeItemsPerPage,
    onChangeName,
    onChangeOrderBy,
    onChangeSlider,
    onChangeTab,
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
