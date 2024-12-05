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
      deleteCard: builder.mutation<void, { id: string }>({
        invalidatesTags: ['cards'],
        query: ({ id }) => {
          return {
            method: 'DELETE',
            url: `/v1/cards/${id}`,
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
      updateCard: builder.mutation<Card, { id: string } & CardBody>({
        invalidatesTags: ['cards'],
        query: ({ answer, answerImg, id, question, questionImg }) => {
          const formData = new FormData()

          if (question) {
            formData.append('question', question)
          }

          if (answer) {
            formData.append('answer', answer)
          }

          return {
            body: formData,
            method: 'PATCH',
            url: `/v1/cards/${id}`,
          }
        },
      }),
    }
  },
})

export const {
  useCreateCardMutation,
  useDeleteCardMutation,
  useGetCardsQuery,
  useUpdateCardMutation,
} = cardsApi
