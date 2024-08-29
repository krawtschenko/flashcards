import { useGetMinMaxCardsQuery } from '../../features/decks/dekcsService'
import { useQueryParam } from '../../hooks/useQueryParam'

export const useDeckParams = () => {
  const { data } = useGetMinMaxCardsQuery()

  const [search, setSearch] = useQueryParam('search', '')
  const [maxCards, setMaxCards] = useQueryParam('maxCards', data?.max)
  const [minCards, setMinCards] = useQueryParam('minCards', data?.min)

  return {
    maxCards,
    minCards,
    search,
    setMaxCards,
    setMinCards,
    setSearch,
  }
}
