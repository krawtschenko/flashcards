import { useGetMinMaxCardsQuery } from '../../features/decks/dekcsService'
import { useQueryParam } from '../../hooks/useQueryParam'

export const useDeckParams = () => {
  const { data: minMax } = useGetMinMaxCardsQuery()

  const [search, setSearch] = useQueryParam('search', '')
  const [maxCards, setMaxCards] = useQueryParam('maxCards', minMax?.max)
  const [minCards, setMinCards] = useQueryParam('minCards', minMax?.min)

  return {
    maxCards,
    minCards,
    minMax,
    search,
    setMaxCards,
    setMinCards,
    setSearch,
  }
}
