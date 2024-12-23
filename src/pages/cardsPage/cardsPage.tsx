import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { FiArrowLeft, FiPlayCircle, FiSearch } from 'react-icons/fi'

import style from './cardsPage.module.scss'

import { Button } from '../../components/ui/button/button'
import { LoadingBar } from '../../components/ui/loadingBar/loadingBar'
import { Pagination } from '../../components/ui/pagination/pagination'
import { TextField } from '../../components/ui/textField/textField'
import { Typography } from '../../components/ui/typography/typography'
import { useMeQuery } from '../../features/auth/authApi'
import {
  useCreateCardMutation,
  useDeleteCardMutation,
  useGetCardsQuery,
  useUpdateCardMutation,
} from '../../features/cards/cardsApi'
import { CardBody } from '../../features/cards/cardsTypes'
import {
  useDeleteDeckMutation,
  useGetDeckQuery,
  useUpdateDeckMutation,
} from '../../features/decks/decksApi'
import { DeckBody } from '../../features/decks/decksTypes'
import { useCardsParams } from '../../hooks/useCardsParams'
import { useDebounce } from '../../hooks/useDebounce'
import { path } from '../../routes/path'
import { CardsDialog } from './cardsDialog/cardsDialog'
import { CardsDropdown } from './cardsDropdown/cardsDropdown'
import { CardsTable } from './cardsTable/cardsTable'

export const CardsPage = () => {
  const {
    currentPage,
    itemsPerPage,
    onChangeItemsPerPage,
    onChangeOrderBy,
    onChangeQuestion,
    orderBy,
    question,
    setCurrentPage,
    setQuestion,
  } = useCardsParams()

  const [isOpenModal, setIsOpenModal] = useState(false)

  const navigate = useNavigate()
  const { id: deckId } = useParams() as { id: string }

  const { data: me } = useMeQuery()

  const [updateDeck] = useUpdateDeckMutation()
  const [deleteDeck] = useDeleteDeckMutation()

  const [createCard] = useCreateCardMutation()
  const [updateCard] = useUpdateCardMutation()
  const [deleteCard] = useDeleteCardMutation()

  const { data: deck, isLoading: isLoadingDeck } = useGetDeckQuery({ id: deckId })
  const { data: cards, isLoading: isLoadingCards } = useGetCardsQuery({
    currentPage: currentPage !== 1 ? currentPage : undefined,
    id: deckId,
    itemsPerPage: itemsPerPage !== 10 ? itemsPerPage : undefined,
    orderBy: orderBy || undefined,
    question: useDebounce(question) || undefined,
  })

  const isOwner = deck?.userId === me?.id

  const onUpdateDeckHandler = async (args: { id: string } & DeckBody) => {
    try {
      await updateDeck(args).unwrap()
      toast.success('Deck updated')
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  const onDeleteDeck = async (id: string) => {
    try {
      await deleteDeck({ id }).unwrap()
      navigate(path.decks)
      toast.success('Deck successfully deleted')
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  const onCreateCardHandler = async (value: CardBody) => {
    try {
      await createCard({ id: deckId, ...value }).unwrap()
      toast.success('Card successfully created')
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  const onUpdateCardHandler = async (args: { id: string } & CardBody) => {
    try {
      await updateCard(args).unwrap()
      toast.success('Deck updated')
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  const onDeleteCardHandler = async (id: string) => {
    try {
      await deleteCard({ id }).unwrap()
      toast.success('Deck successfully deleted')
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  if (isLoadingDeck || isLoadingCards) {
    return <LoadingBar id={'loader-root'} />
  }

  return (
    <div className={style.cardsPage}>
      <CardsDialog
        onOpenChange={() => setIsOpenModal(false)}
        onSubmit={onCreateCardHandler}
        open={isOpenModal}
        title={'Add New Card'}
      />

      <Button className={style.back} onClick={() => navigate(path.decks)}>
        <FiArrowLeft />
        Back to Decks List
      </Button>

      <div className={style.options}>
        <div className={style.deckName}>
          <Typography variant={'h1'}>{deck?.name}</Typography>

          {isOwner && (
            <CardsDropdown
              deck={deck}
              deckId={deckId}
              onDeleteDeck={onDeleteDeck}
              onUpdateDeckHandler={onUpdateDeckHandler}
            />
          )}
        </div>

        {isOwner && <Button onClick={() => setIsOpenModal(true)}>Add New Card</Button>}

        {!isOwner && !!deck?.cardsCount && (
          <Button as={Link} to={`/decks/${deckId}/learn`}>
            <FiPlayCircle />
            Learn to Pack
          </Button>
        )}
      </div>

      {deck?.cover && <img alt={'cover'} className={style.cover} src={deck?.cover} />}

      {!deck?.cardsCount && (
        <Typography className={style.emptyDeckText} position={'center'} variant={'body1'}>
          This deck is empty
        </Typography>
      )}

      {!!deck?.cardsCount && (
        <>
          <TextField
            className={style.search}
            icon={<FiSearch />}
            label={'Search'}
            onChange={onChangeQuestion}
            onClearValue={() => setQuestion('')}
            value={question}
          />

          <CardsTable
            cards={cards?.items}
            className={style.cardsTable}
            isOwner={isOwner}
            onDeleteCard={onDeleteCardHandler}
            onUpdateCard={onUpdateCardHandler}
            orderBy={orderBy}
            setOrderBy={onChangeOrderBy}
          />

          <Pagination
            className={style.pagination}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={onChangeItemsPerPage}
            onPageChange={setCurrentPage}
            totalPages={cards?.pagination.totalPages}
          />
        </>
      )}
    </div>
  )
}
