import { baseApi } from '../api/baseApi'
import { CreateDeckBody, CreateDeckResponse, DecksArgs, DecksResponse } from './decksTypes'

const decksService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createDeck: builder.mutation<CreateDeckResponse, CreateDeckBody>({
        invalidatesTags: ['decks'],
        query: body => {
          return {
            body,
            method: 'POST',
            url: 'v1/decks',
          }
        },
      }),
      deleteDeck: builder.mutation<CreateDeckResponse, string>({
        invalidatesTags: ['decks'],
        query: id => {
          return {
            method: 'DELETE',
            url: `/v1/decks/${id}`,
          }
        },
      }),
      getDecks: builder.query<DecksResponse, DecksArgs | void>({
        providesTags: ['decks'],
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

export const {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
  useGetMinMaxCardsQuery,
} = decksService
