import { useEffect, useState } from 'react'

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

export const DecksPage = () => {
  const { data: minMax } = useGetMinMaxCardsQuery()

  const [search, setSearch] = useState<string>('')
  const [orderBy, setOrderBy] = useState<null | string>(null)
  const [sliderValue, setSliderValue] = useState<number[]>([0, 0])

  const tabsOptions = [
    { name: 'My Cards', value: 'My Cards' },
    { name: 'All Cards', value: 'All Cards' },
  ]

  const { data: decks, isLoading } = useGetDecksQuery({
    maxCardsCount: sliderValue[1],
    minCardsCount: sliderValue[0],
    name: search,
    orderBy,
  })

  const clearFilters = () => {
    minMax && setSliderValue([minMax.min, minMax.max])
    setOrderBy(null)
  }

  useEffect(() => {
    if (minMax) {
      setSliderValue([minMax.min, minMax.max])
    }
  }, [minMax])

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

          <Slider
            max={minMax?.max}
            min={minMax?.min}
            onValueChange={setSliderValue}
            title={'Number of cards'}
            value={sliderValue}
          />

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
