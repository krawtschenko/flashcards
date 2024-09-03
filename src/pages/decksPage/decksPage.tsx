import { ChangeEvent } from 'react'

import { FiSearch, FiTrash } from 'react-icons/fi'

import style from './decksPage.module.scss'

import { Button } from '../../components/ui/button/button'
import { Pagination } from '../../components/ui/pagination/pagination'
import { Slider } from '../../components/ui/slider/slider'
import { Tabs, TabsTrigger } from '../../components/ui/tabs/tabs'
import { TextField } from '../../components/ui/textField/textField'
import { Typography } from '../../components/ui/typography/typography'
import { useCreateDeckMutation, useGetDecksQuery } from '../../features/decks/dekcsService'
import { useDeckParams } from '../../features/decks/useDeckParams'
import { useDebounce } from '../../hooks/useDebounce'
import { DecksTable } from './decksTable/decksTable'

export const DecksPage = () => {
  const {
    currentPage,
    itemsPerPage,
    maxCards,
    minCards,
    minMax,
    name,
    orderBy,
    range,
    setCurrentPage,
    setItemsPerPage,
    setMaxCards,
    setMinCards,
    setName,
    setOrderBy,
    setRange,
  } = useDeckParams()

  const { data: decks, isLoading } = useGetDecksQuery({
    currentPage: currentPage !== 1 ? currentPage : undefined,
    itemsPerPage: itemsPerPage !== 10 ? itemsPerPage : undefined,
    maxCardsCount: maxCards !== minMax?.max ? maxCards : undefined,
    minCardsCount: minCards !== minMax?.min ? minCards : undefined,
    name: useDebounce(name) || undefined,
    orderBy: orderBy || undefined,
  })

  const [createDeck] = useCreateDeckMutation()

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

  const onChangeSlider = (value: number[]) => {
    setCurrentPage(1)
    setMinCards(value[0])
    setMaxCards(value[1])
  }

  const onChangeItemsPerPage = (items: number) => {
    setCurrentPage(1)
    setItemsPerPage(items)
  }

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <div className={style.decksPage}>
      <div className={style.title}>
        <Typography variant={'h1'}>Decks list</Typography>
        <Button className={style.button} onClick={() => createDeck({ name: 'Test deck' })}>
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

        <Tabs className={style.tabs} defaultValue={'All Cards'} title={'Show decks cards'}>
          <TabsTrigger value={'My Cards'}>My Cards</TabsTrigger>
          <TabsTrigger value={'All Cards'}>All Cards</TabsTrigger>
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
        orderBy={orderBy}
        setOrderBy={setOrderBy}
      />

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
