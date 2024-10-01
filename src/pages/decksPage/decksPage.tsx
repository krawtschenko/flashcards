import { ChangeEvent } from 'react'

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
import { useCreateDeckMutation, useGetDecksQuery } from '../../features/decks/dekcsApi'
import { useDeckParams } from '../../features/decks/useDeckParams'
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
  } = useDeckParams()

  const [createDeck] = useCreateDeckMutation()
  const { data: me } = useMeQuery()

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

  if (isLoading) {
    return <LoadingBar id={'loader-root'} loading={isLoading} />
  }

  return (
    <div className={style.decksPage}>
      <div className={style.title}>
        <Typography variant={'h1'}>Decks list</Typography>

        <DecksDialog onSubmit={createDeck} title={'Add New Deck'}>
          <Button className={style.button}>Add New Deck</Button>
        </DecksDialog>
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
