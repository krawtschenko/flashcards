import { DecksPagination } from '../decks/decksTypes'

export type Card = {
  answer: string
  answerImg: string
  answerVideo: string
  created: Date
  deckId: string
  grade: number
  id: string
  question: string
  questionImg: string
  questionVideo: string
  shots: number
  updated: Date
  userId: string
}

export type CardsResponse = {
  items: Card[]
  pagination: DecksPagination
}

export type CardsArgs = {
  answer?: string
  currentPage?: number
  id: string
  itemsPerPage?: number
  orderBy?: null | string
  question?: string
}
