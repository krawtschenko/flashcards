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
    }
  },
})

export const { useGetDecksQuery } = decksService
