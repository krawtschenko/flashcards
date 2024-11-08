import { useParams } from 'react-router-dom'

import style from './deckPage.module.scss'

import { Typography } from '../../components/ui/typography/typography'
import { useGetDecksQuery } from '../../features/decks/decksApi'

type DeckPageProps = {}

export const DeckPage = ({}: DeckPageProps) => {
  const { id } = useParams()

  const { data } = useGetDecksQuery()

  const img = data?.items.filter(e => e.id === id)

  console.log(img)

  return (
    <div className={style.deckPage}>
      <Typography variant={'h2'}>Deck: {id}</Typography>
    </div>
  )
}
