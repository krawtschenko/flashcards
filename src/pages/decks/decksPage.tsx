import { useState } from 'react'

import { FiSearch, FiTrash } from 'react-icons/fi'

import style from './decksPage.module.scss'

import { Container } from '../../components/layout/container/contaiter'
import { DecksTable } from '../../components/layout/decksTable/decksTable'
import { Button } from '../../components/ui/button/button'
import { Slider } from '../../components/ui/slider/slider'
import { Tabs } from '../../components/ui/tabs/tabs'
import { TextField } from '../../components/ui/textField/textField'
import { Typography } from '../../components/ui/typography/typography'
import { useGetDecksQuery, useGetMinMaxCardsQuery } from '../../features/decks/dekcsService'
import { useDebounce } from '../../hooks/useDebounce'

export const DecksPage = () => {
  const [search, setSearch] = useState<string>('')
  const [orderBy, setOrderBy] = useState<null | string>(null)
  const [sliderValue, setSliderValue] = useState<number[]>([0, 99])

  const tabsOptions = [
    { name: 'My Cards', value: 'My Cards' },
    { name: 'All Cards', value: 'All Cards' },
  ]

  const { data: decks, isLoading } = useGetDecksQuery({
    maxCardsCount: sliderValue[1],
    minCardsCount: sliderValue[0],
    name: useDebounce(search),
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

          <Tabs
            className={style.tabs}
            defaultValue={'All Cards'}
            options={tabsOptions}
            title={'Show decks cards'}
          />

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