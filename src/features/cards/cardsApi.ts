import { baseApi } from '../../services/baseApi'
import { Card, CardBody, CardsArgs, CardsResponse } from './cardsTypes'

const cardsApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createCard: builder.mutation<Card, { id: string } & CardBody>({
        invalidatesTags: ['cards'],
        query: ({ id, ...body }) => {
          return {
            body,
            method: 'POST',
            url: `/v1/decks/${id}/cards`,
          }
        },
      }),
      getCards: builder.query<CardsResponse, CardsArgs>({
        providesTags: ['cards'],
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

export const { useCreateCardMutation, useGetCardsQuery } = cardsApi
