export type DecksArgs = {
  authorId?: string
  currentPage?: number
  itemsPerPage?: number
  maxCardsCount?: number
  minCardsCount?: number
  name?: string
  orderBy?: string
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

export type Author = {
  id: string
  name: string
}