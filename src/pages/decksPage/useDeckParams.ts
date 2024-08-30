import { useEffect, useState } from 'react'

import { useGetMinMaxCardsQuery } from '../../features/decks/dekcsService'
import { useQueryParam } from '../../hooks/useQueryParam'

export const useDeckParams = () => {
  const { data: minMax } = useGetMinMaxCardsQuery()

  const [search, setSearch] = useQueryParam('search', '')

  const [minCards, setMinCards] = useQueryParam('minCards', minMax?.min)
  const [maxCards, setMaxCards] = useQueryParam('maxCards', minMax?.max)
  const [orderBy, setOrderBy] = useQueryParam<null | string>('orderBy', null)

  const [range, setRange] = useState([minCards, maxCards])

  useEffect(() => {
    setRange([minCards, maxCards])
  }, [maxCards, minCards])

  return {
    maxCards,
    minCards,
    minMax,
    orderBy,
    range,
    search,
    setMaxCards,
    setMinCards,
    setOrderBy,
    setRange,
    setSearch,
  }
}
