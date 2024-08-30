import { useEffect, useState } from 'react'

import { useGetMinMaxCardsQuery } from '../../features/decks/dekcsService'
import { useQueryParam } from '../../hooks/useQueryParam'

export const useDeckParams = () => {
  const { data: minMax } = useGetMinMaxCardsQuery()

  const [name, setName] = useQueryParam('name', '')
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
