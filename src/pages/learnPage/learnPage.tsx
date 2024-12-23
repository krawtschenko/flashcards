import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { FiArrowLeft } from 'react-icons/fi'

import style from './learnPage.module.scss'

import { Button } from '../../components/ui/button/button'
import { Card } from '../../components/ui/card/card'
import { LoadingBar } from '../../components/ui/loadingBar/loadingBar'
import { ControlledRadioGroup } from '../../components/ui/radioGroup/controlledRadioGroup'
import { RadioGroup } from '../../components/ui/radioGroup/radioGroup'
import { Typography } from '../../components/ui/typography/typography'
import { useGetDeckQuery } from '../../features/decks/decksApi'
import { path } from '../../routes/path'

type LearnPageProps = {}

export const LearnPage = ({}: LearnPageProps) => {
  const [isAnswer, setIsAnswer] = useState(true)

  const navigate = useNavigate()
  const { id: deckId } = useParams() as { id: string }

  const { data: deck, isLoading } = useGetDeckQuery({ id: deckId })

  const options = [
    {
      label: 'Did not know',
      value: 'Did not know',
    },
    {
      label: 'Forgot',
      value: 'Forgot',
    },
    {
      label: 'A lot of thought',
      value: 'A lot of thought',
    },
    {
      label: 'Сonfused',
      value: 'Сonfused',
    },
    {
      label: 'Knew the answer',
      value: 'Knew the answer',
    },
  ]

  if (isLoading) {
    return <LoadingBar id={'loader-root'} />
  }

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

        <Typography className={style.question} variant={'body1'}>
          <b>Question:</b> How This works in JavaScript?
        </Typography>

        <Typography className={style.answerNumber} variant={'body2'}>
          Number of attempts to answer the question: 10
        </Typography>

        {!isAnswer && (
          <Button className={style.showAnswer} fullWidth onClick={() => setIsAnswer(true)}>
            Show Answer
          </Button>
        )}

        {isAnswer && (
          <>
            <Typography className={style.answer} variant={'body1'}>
              <b>Answer:</b> This is how This works in JavaScript
            </Typography>

            <Typography className={style.subtitle} variant={'subtitle1'}>
              Rate yourself:
            </Typography>

            <RadioGroup className={style.radioGroup} options={options} />
          </>
        )}
      </Card>
    </div>
  )
}
