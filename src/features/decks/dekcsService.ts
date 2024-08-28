import { baseApi } from '../api/baseApi'
import { DecksArgs, DecksResponse } from './decksTypes'

const decksService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getDecks: builder.query<DecksResponse, DecksArgs | void>({
        query: args => {
          return {
            params: args ?? undefined,
            url: 'v2/decks',
          }
        },
      }),

      getMinMaxCards: builder.query<{ max: number; min: number }, void>({
        query: () => 'v2/decks/min-max-cards',
      }),
    }
  },
})

export const { useGetDecksQuery, useGetMinMaxCardsQuery } = decksService
