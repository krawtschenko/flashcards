import { ChangeEvent, useState } from 'react'
import { toast } from 'react-toastify'

import { FiSearch, FiTrash } from 'react-icons/fi'

import style from './decksPage.module.scss'

import { Button } from '../../components/ui/button/button'
import { LoadingBar } from '../../components/ui/loadingBar/loadingBar'
import { Pagination } from '../../components/ui/pagination/pagination'
import { Slider } from '../../components/ui/slider/slider'
import { Tabs, TabsTrigger } from '../../components/ui/tabs/tabs'
import { TextField } from '../../components/ui/textField/textField'
import { Typography } from '../../components/ui/typography/typography'
import { useMeQuery } from '../../features/auth/authApi'
import {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
  useUpdateDeckMutation,
} from '../../features/decks/decksApi'
import { DeckBody } from '../../features/decks/decksTypes'
import { useDecksParams } from '../../features/decks/useDecksParams'
import { useDebounce } from '../../hooks/useDebounce'
import { DecksDialog } from './decksDialog/decksDialog'
import { DecksTable } from './decksTable/decksTable'

export const DecksPage = () => {
  const {
    currentPage,
    currentTab,
    itemsPerPage,
    maxCards,
    minCards,
    minMax,
    name,
    orderBy,
    range,
    setCurrentPage,
    setCurrentTab,
    setItemsPerPage,
    setMaxCards,
    setMinCards,
    setName,
    setOrderBy,
    setRange,
  } = useDecksParams()

  const [isOpenModal, setIsOpenModal] = useState(false)

  const { data: me } = useMeQuery()
  const [createDeck] = useCreateDeckMutation()
  const [updateDeck] = useUpdateDeckMutation()
  const [deleteDeck] = useDeleteDeckMutation()

  const { data: decks, isLoading } = useGetDecksQuery({
    authorId: currentTab === 'my' ? me?.id : undefined,
    currentPage: currentPage !== 1 ? currentPage : undefined,
    itemsPerPage: itemsPerPage !== 10 ? itemsPerPage : undefined,
    maxCardsCount: maxCards !== minMax?.max ? maxCards : undefined,
    minCardsCount: minCards !== minMax?.min ? minCards : undefined,
    name: useDebounce(name) || undefined,
    orderBy: orderBy || undefined,
  })

  const onClearFilters = () => {
    setName('')
    setCurrentPage(1)
    setItemsPerPage(10)
    setMinCards(minMax?.min)
    setMaxCards(minMax?.max)
    setOrderBy(null)
  }

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(1)
    setName(e.currentTarget.value)
  }

  const onChangeTab = (value: string) => {
    setCurrentTab(value)
    setCurrentPage(1)
  }

  const onChangeSlider = (value: number[]) => {
    setCurrentPage(1)
    setMinCards(value[0])
    setMaxCards(value[1])
  }

  const onChangeItemsPerPage = (items: number) => {
    setCurrentPage(1)
    setItemsPerPage(items)
  }

  const onCreateDeckHandler = async (value: DeckBody) => {
    try {
      await createDeck(value).unwrap()
      toast.success('Deck successfully created')
    } catch (error) {
      toast.error('Something went wrong')
    }
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
      toast.success('Deck successfully deleted')
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  if (isLoading) {
    return <LoadingBar id={'loader-root'} />
  }

  return (
    <div className={style.decksPage}>
      <DecksDialog
        onOpenChange={setIsOpenModal}
        onSubmit={onCreateDeckHandler}
        open={isOpenModal}
        title={'Add New Deck'}
      />

      <div className={style.title}>
        <Typography variant={'h1'}>Decks list</Typography>

        <Button className={style.button} onClick={() => setIsOpenModal(true)}>
          Add New Deck
        </Button>
      </div>

      <div className={style.filter}>
        <TextField
          className={style.search}
          icon={<FiSearch />}
          label={'Search'}
          onChange={onChangeName}
          onClearValue={() => setName('')}
          value={name}
        />

        <Tabs className={style.tabs} title={'Show decks cards'} value={currentTab}>
          <TabsTrigger onClick={() => onChangeTab('my')} value={'my'}>
            My Cards
          </TabsTrigger>

          <TabsTrigger onClick={() => onChangeTab('all')} value={'all'}>
            All Cards
          </TabsTrigger>
        </Tabs>

        <Slider
          max={minMax?.max}
          min={minMax?.min}
          onValueChange={setRange}
          onValueCommit={onChangeSlider}
          title={'Number of cards'}
          value={range}
        />

        <Button className={style.button} onClick={onClearFilters} variant={'secondary'}>
          <FiTrash /> Clear Filter
        </Button>
      </div>

      <DecksTable
        className={style.decksTable}
        decks={decks?.items}
        meId={me?.id}
        onDeleteDeck={onDeleteDeck}
        onUpdateDeck={onUpdateDeckHandler}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
      />

      {decks?.items.length === 0 && (
        <Typography className={style.paragraph} position={'center'} variant={'body1'}>
          Decks not found
        </Typography>
      )}

      <Pagination
        className={style.pagination}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={onChangeItemsPerPage}
        onPageChange={setCurrentPage}
        totalPages={decks?.pagination.totalPages}
      />
    </div>
  )
}
