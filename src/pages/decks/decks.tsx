import { useState } from 'react'

import { Container } from '../../components/layout/container/contaiter'
import { TextField } from '../../components/ui/textField/textField'
import { useGetDecksQuery } from '../../features/decks/dekcsService'
import { DecksTable } from './decksTable'

type Props = {}

export const Decks = ({}: Props) => {
  const [search, setSearch] = useState('')

  const { data, isLoading } = useGetDecksQuery({ name: search })

  if (isLoading) {
    return <h1>Loading...</h1> // Здесь можете добавить спиннер на ваш вкус
  }

  return (
    <Container>
      <TextField
        icon={<div></div>}
        label={'Search'}
        onChange={e => setSearch(e.currentTarget.value)}
        onClearValue={() => setSearch('')}
        value={search}
      />
      <DecksTable decks={data?.items} />
    </Container>
  )
}
