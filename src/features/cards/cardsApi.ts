import { baseApi } from '../../services/baseApi'
import { CardsArgs, CardsResponse } from './cardsTypes'

const cardsApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getCards: builder.query<CardsResponse, CardsArgs>({
        query: ({ id, ...args }) => {
          return {
            params: args ?? undefined,
            url: `/v1/decks/${id}/cards`,
          }
        },
      }),
    }
  },
})

export const { useGetCardsQuery } = cardsApi
