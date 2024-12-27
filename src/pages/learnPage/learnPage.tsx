import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import { FiArrowLeft, FiLoader } from 'react-icons/fi'

import style from './learnPage.module.scss'

import { Button } from '../../components/ui/button/button'
import { Card } from '../../components/ui/card/card'
import { LoadingBar } from '../../components/ui/loadingBar/loadingBar'
import { ControlledRadioGroup } from '../../components/ui/radioGroup/controlledRadioGroup'
import { Typography } from '../../components/ui/typography/typography'
import { useGetRandomCardQuery, useGiveGradeMutation } from '../../features/cards/cardsApi'
import { useGetDeckQuery } from '../../features/decks/decksApi'

export const LearnPage = () => {
  const navigate = useNavigate()
  const { id: deckId } = useParams() as { id: string }

  const [isAnswer, setIsAnswer] = useState(false)

  const options = [
    {
      label: 'Did not know',
      value: '1',
    },
    {
      label: 'Forgot',
      value: '2',
    },
    {
      label: 'A lot of thought',
      value: '3',
    },
    {
      label: 'Confused',
      value: '4',
    },
    {
      label: 'Knew the answer',
      value: '5',
    },
  ]

  const { control, handleSubmit, reset } = useForm<{ grade: string }>({
    defaultValues: { grade: '1' },
  })

  const { data: deck, isLoading: isLoadingDeck } = useGetDeckQuery({ id: deckId })
  const { data: card } = useGetRandomCardQuery({ id: deckId })

  const [giveGrade, { isLoading: isLoadingGrade }] = useGiveGradeMutation()

  const onSubmit = async (data: { grade: string }) => {
    await giveGrade({ cardId: card?.id ?? '', deckId, grade: Number(data.grade) })

    setIsAnswer(false)
    reset()
  }

  if (isLoadingDeck) {
    return <LoadingBar id={'loader-root'} />
  }

  return (
    <div className={style.learnPage}>
      <Button className={style.back} onClick={() => navigate(-1)}>
        <FiArrowLeft />
        Back
      </Button>

      <Card className={style.card}>
        <Typography position={'center'} variant={'h1'}>
          Learn «{deck?.name}»
        </Typography>

        <Typography className={style.question} variant={'body1'}>
          <b>Question:</b> {card?.question}
        </Typography>

        {card?.questionImg && (
          <img alt={'questionImg'} className={style.image} src={card?.questionImg} />
        )}

        <Typography className={style.answerNumber} variant={'body2'}>
          Number of attempts to answer the question: {card?.shots}
        </Typography>

        {!isAnswer && (
          <Button className={style.showAnswer} fullWidth onClick={() => setIsAnswer(true)}>
            Show Answer
          </Button>
        )}

        {isAnswer && (
          <form onSubmit={handleSubmit(({ grade }) => onSubmit({ grade }))}>
            <Typography className={style.answer} variant={'body1'}>
              <b>Answer:</b> {card?.answer}
            </Typography>

            {card?.answerImg && (
              <img alt={'questionImg'} className={style.image} src={card?.answerImg} />
            )}

            <Typography className={style.subtitle} variant={'subtitle1'}>
              Rate yourself:
            </Typography>

            <ControlledRadioGroup
              className={style.radioGroup}
              control={control}
              name={'grade'}
              options={options}
            />

            <Button className={style.acceptBtn} disabled={isLoadingGrade} fullWidth>
              {isLoadingGrade && <FiLoader className={style.btnLoader} />}
              Next Question
            </Button>
          </form>
        )}
      </Card>
    </div>
  )
}
