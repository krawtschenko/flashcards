import { useParams } from 'react-router-dom'

import style from './deckPage.module.scss'

import { Typography } from '../../components/ui/typography/typography'
import { useGetDeckQuery } from '../../features/decks/decksApi'

type DeckPageProps = {}

export const DeckPage = ({}: DeckPageProps) => {
  const { id } = useParams()

  const { data } = useGetDeckQuery({ id })

  return (
    <div className={style.deckPage}>
      <Typography variant={'h2'}>Deck: {id}</Typography>
      {data?.cover && <img alt={'cover'} src={data?.cover} />}
    </div>
  )
}
