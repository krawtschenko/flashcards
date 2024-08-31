import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useGetMinMaxCardsQuery } from '../../features/decks/dekcsService'
import { useQueryParam } from '../../hooks/useQueryParam'

export const useDeckParams = () => {
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

  const [range, setRange] = useState([minCards, maxCards])

  useEffect(() => {
    setRange([minCards, maxCards])
  }, [maxCards, minCards])

  return {
    maxCards,
    minCards,
    minMax,
    name,
    orderBy,
    range,
    setMaxCards,
    setMinCards,
    setName,
    setOrderBy,
    setRange,
  }
}
