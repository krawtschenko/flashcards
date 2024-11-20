export type Deck = {
  author: Author
  cardsCount: number
  cover?: string
  created: Date
  id: string
  isFavorite: boolean
  isPrivate: boolean
  name: string
  updated: Date
  userId: string
}

export type DecksArgs = {
  authorId?: string
  currentPage?: number
  itemsPerPage?: number
  maxCardsCount?: number
  minCardsCount?: number
  name?: string
  orderBy?: null | string
}

export type DecksResponse = {
  items: Deck[]
  pagination: DecksPagination
}

export type DecksPagination = {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
}

export type Author = {
  id: string
  name: string
}

export type DeckBody = {
  cover?: File | null
  isPrivate?: boolean
  name?: string
}

export type CreateDeckResponse = {
  cardsCount: number
  cover: string
  created: string
  id: string
  isPrivate: boolean
  name: string
  updated: string
  userId: string
}

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
