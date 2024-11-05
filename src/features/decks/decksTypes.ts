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
