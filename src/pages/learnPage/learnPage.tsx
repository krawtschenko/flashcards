import { useNavigate, useParams } from 'react-router-dom'

import { FiArrowLeft } from 'react-icons/fi'

import style from './learnPage.module.scss'

import { Button } from '../../components/ui/button/button'
import { path } from '../../routes/path'

type LearnPageProps = {}

export const LearnPage = ({}: LearnPageProps) => {
  const navigate = useNavigate()
  const { id: deckId } = useParams() as { id: string }

  return (
    <div className={style.learnPage}>
      <Button className={style.back} onClick={() => navigate(`${path.decks}/${deckId}`)}>
        <FiArrowLeft />
        Back to Decks List
      </Button>

      <p>{deckId}</p>
    </div>
  )
}
