import { useState } from 'react'

import { FiSearch, FiTrash } from 'react-icons/fi'

import style from './decksPage.module.scss'

import { Container } from '../../components/layout/container/contaiter'
import { DecksTable } from '../../components/layout/decksTable/decksTable'
import { Button } from '../../components/ui/button/button'
import { Slider } from '../../components/ui/slider/slider'
import { Tabs, TabsTrigger } from '../../components/ui/tabs/tabs'
import { TextField } from '../../components/ui/textField/textField'
import { Typography } from '../../components/ui/typography/typography'
import { useGetDecksQuery } from '../../features/decks/dekcsService'
import { useDebounce } from '../../hooks/useDebounce'
import { useDeckParams } from './useDeckParams'

export const DecksPage = () => {
  const { search, setSearch } = useDeckParams()

  const [orderBy, setOrderBy] = useState<null | string>(null)
  const [sliderValue, setSliderValue] = useState<number[]>([0, 99])

  const { data: decks, isLoading } = useGetDecksQuery({
    maxCardsCount: sliderValue[1],
    minCardsCount: sliderValue[0],
    name: useDebounce(search) || undefined,
    orderBy,
  })

  const clearFilters = () => {
    setSliderValue([0, 99])
    setOrderBy(null)
  }

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <div className={style.decksPage}>
      <Container>
        <div className={style.title}>
          <Typography variant={'h1'}>Decks list</Typography>
          <Button className={style.button}>Add New Deck</Button>
        </div>

        <div className={style.filter}>
          <TextField
            className={style.search}
            icon={<FiSearch />}
            label={'Search'}
            onChange={e => setSearch(e.currentTarget.value)}
            onClearValue={() => setSearch('')}
            value={search}
          />

          <Tabs className={style.tabs} defaultValue={'All Cards'} title={'Show decks cards'}>
            <TabsTrigger value={'My Cards'}>My Cards</TabsTrigger>
            <TabsTrigger value={'All Cards'}>All Cards</TabsTrigger>
          </Tabs>

          <Slider onValueChange={setSliderValue} title={'Number of cards'} value={sliderValue} />

          <Button className={style.button} onClick={clearFilters} variant={'secondary'}>
            <FiTrash /> Clear Filter
          </Button>
        </div>

        <DecksTable
          className={style.decksTable}
          decks={decks?.items}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
        />
      </Container>
    </div>
  )
}
