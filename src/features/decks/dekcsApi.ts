import { baseApi } from '../../services/baseApi'
import { CreateDeckResponse, Deck, DeckBody, DecksArgs, DecksResponse } from './decksTypes'

const decksApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createDeck: builder.mutation<CreateDeckResponse, DeckBody>({
        invalidatesTags: ['decks'],
        query: body => {
          return {
            body,
            method: 'POST',
            url: '/v1/decks',
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
            url: '/v2/decks',
          }
        },
      }),
      getMinMaxCards: builder.query<{ max: number; min: number }, void>({
        query: () => '/v2/decks/min-max-cards',
      }),
      updateDeck: builder.mutation<CreateDeckResponse, { id: string } & DeckBody>({
        invalidatesTags: ['decks'],
        query: ({ id, ...body }) => {
          return {
            body,
            method: 'PATCH',
            url: `/v1/decks/${id}`,
          }
        },
      }),
    }
  },
})

export const {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
  useGetMinMaxCardsQuery,
  useUpdateDeckMutation,
} = decksApi
