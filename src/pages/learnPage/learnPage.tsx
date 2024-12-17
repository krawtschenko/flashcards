import { useNavigate, useParams } from 'react-router-dom'

import { FiArrowLeft } from 'react-icons/fi'

import style from './learnPage.module.scss'

import { Button } from '../../components/ui/button/button'
import { Card } from '../../components/ui/card/card'
import { Typography } from '../../components/ui/typography/typography'
import { useGetDeckQuery } from '../../features/decks/decksApi'
import { path } from '../../routes/path'

type LearnPageProps = {}

export const LearnPage = ({}: LearnPageProps) => {
  const navigate = useNavigate()
  const { id: deckId } = useParams() as { id: string }

  const { data: deck } = useGetDeckQuery({ id: deckId })

  return (
    <div className={style.learnPage}>
      <Button className={style.back} onClick={() => navigate(`${path.decks}/${deckId}`)}>
        <FiArrowLeft />
        Back to Decks List
      </Button>

      <Card className={style.card}>
        <Typography position={'center'} variant={'h1'}>
          Learn «{deck?.name}»
        </Typography>
      </Card>
    </div>
  )
}
