import { ChangeEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { FiArrowLeft, FiPlayCircle, FiSearch } from 'react-icons/fi'

import style from './cardsPage.module.scss'

import coverImg from '../../assets/images/cover.svg'
import { Button } from '../../components/ui/button/button'
import { LoadingBar } from '../../components/ui/loadingBar/loadingBar'
import { TextField } from '../../components/ui/textField/textField'
import { Typography } from '../../components/ui/typography/typography'
import { useMeQuery } from '../../features/auth/authApi'
import { useGetCardsQuery } from '../../features/cards/cardsApi'
import { useCardsParams } from '../../features/cards/useCardsParams'
import {
  useDeleteDeckMutation,
  useGetDeckQuery,
  useUpdateDeckMutation,
} from '../../features/decks/decksApi'
import { DeckBody } from '../../features/decks/decksTypes'
import { useDebounce } from '../../hooks/useDebounce'
import { path } from '../../routes/path'
import { CardsTable } from './cardsTable/cardsTable'
import { DropdownCards } from './dropdownCards/dropdownCards'

export const CardsPage = () => {
  const {
    currentPage,
    itemsPerPage,
    orderBy,
    question,
    setCurrentPage,
    setItemsPerPage,
    setOrderBy,
    setQuestion,
  } = useCardsParams()

  const navigate = useNavigate()
  const { id: deckId } = useParams() as { id: string }

  const { data: me } = useMeQuery()
  const [updateDeck] = useUpdateDeckMutation()
  const [deleteDeck] = useDeleteDeckMutation()

  const { data: deck, isLoading } = useGetDeckQuery({ id: deckId })
  const { data: cards } = useGetCardsQuery({
    id: deckId,
    orderBy: orderBy || undefined,
    question: useDebounce(question) || undefined,
  })

  const isOwner = deck?.userId === me?.id

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(1)
    setQuestion(e.currentTarget.value)
  }

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
      await deleteDeck(id).unwrap()
      navigate(path.decks)
      toast.success('Deck successfully deleted')
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  if (isLoading) {
    return <LoadingBar id={'loader-root'} />
  }

  return (
    <div className={style.cardsPage}>
      <Button className={style.back} onClick={() => navigate(path.decks)}>
        <FiArrowLeft />
        Back to Decks List
      </Button>

      <div className={style.options}>
        <div className={style.deckName}>
          <Typography variant={'h1'}>{deck?.name}</Typography>

          {isOwner && (
            <DropdownCards
              deck={deck}
              deckId={deckId}
              onDeleteDeck={onDeleteDeck}
              onUpdateDeckHandler={onUpdateDeckHandler}
            />
          )}
        </div>

        {isOwner && <Button>Add New Card</Button>}
        {!isOwner && !!deck?.cardsCount && (
          <Button>
            <FiPlayCircle />
            Learn to Pack
          </Button>
        )}
      </div>

      <img alt={'cover'} className={style.cover} src={deck?.cover ?? coverImg} />

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
            onChange={onChangeName}
            onClearValue={() => setQuestion('')}
            value={question}
          />

          <CardsTable
            cards={cards?.items}
            className={style.cardsTable}
            meId={me?.id}
            orderBy={orderBy}
            setOrderBy={setOrderBy}
          />
        </>
      )}
    </div>
  )
}
