import { baseApi } from '../../services/baseApi'
import { Card, CardBody, CardsArgs, CardsResponse } from './cardsTypes'

const cardsApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createCard: builder.mutation<Card, { id: string } & CardBody>({
        invalidatesTags: ['cards'],
        query: ({ answer, answerImg, id, question, questionImg }) => {
          const formData = new FormData()

          if (answer) {
            formData.append('answer', answer)
          }

          if (question) {
            formData.append('question', question)
          }

          if (answerImg) {
            formData.append('answerImg', answerImg)
          } else if (answerImg === null) {
            formData.append('answerImg', '')
          }

          if (questionImg) {
            formData.append('questionImg', questionImg)
          } else if (questionImg === null) {
            formData.append('questionImg', '')
          }

          return {
            body: formData,
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
      getRandomCard: builder.query<Card, { id: string }>({
        providesTags: ['randomCard'],
        query: ({ id }) => {
          return {
            url: `/v1/decks/${id}/learn`,
          }
        },
      }),
      giveGrade: builder.mutation<Card, { cardId: string; deckId: string; grade: number }>({
        invalidatesTags: ['cards', 'randomCard'],
        query: ({ deckId, ...body }) => {
          return {
            body,
            method: 'POST',
            url: `/v1/decks/${deckId}/learn`,
          }
        },
      }),
      updateCard: builder.mutation<Card, { id: string } & CardBody>({
        invalidatesTags: ['cards'],
        query: ({ answer, answerImg, id, question, questionImg }) => {
          const formData = new FormData()

          if (answer) {
            formData.append('answer', answer)
          }

          if (question) {
            formData.append('question', question)
          }

          if (answerImg) {
            formData.append('answerImg', answerImg)
          } else if (answerImg === null) {
            formData.append('answerImg', '')
          }

          if (questionImg) {
            formData.append('questionImg', questionImg)
          } else if (questionImg === null) {
            formData.append('questionImg', '')
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
  useGetRandomCardQuery,
  useGiveGradeMutation,
  useUpdateCardMutation,
} = cardsApi
