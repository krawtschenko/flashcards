import { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { SlCloudUpload, SlTrash } from 'react-icons/sl'
import { z } from 'zod'

import style from './cardsDialog.module.scss'

import { Dialog, DialogPortal } from '../../../components/layout/dialog/dialog'
import { Button } from '../../../components/ui/button/button'
import { ControlledTextField } from '../../../components/ui/textField/controlledTextField'
import { CardBody } from '../../../features/cards/cardsTypes'

const cardsDialogSchema = z.object({
  answer: z.string().min(1, 'Required').min(3).max(500),
  question: z.string().min(1, 'Required').min(3).max(500),
})

type CardsDialogValue = z.infer<typeof cardsDialogSchema>

type CardsDialogProps = {
  answer?: string
  answerImg?: string
  onOpenChange: () => void
  onSubmit: (value: CardBody) => void
  open: boolean
  question?: string
  questionImg?: string
  title?: string
}

export const CardsDialog = (props: CardsDialogProps) => {
  const { answer, answerImg, onOpenChange, onSubmit, open, question, questionImg, title } = props

  const { control, handleSubmit, reset } = useForm<CardsDialogValue>({
    defaultValues: { answer: answer ?? '', question: question ?? '' },
    resolver: zodResolver(cardsDialogSchema),
  })

  const [answerImage, setAnswerImage] = useState<File | null | undefined>(undefined)
  const [answerPreview, setAnswerPreview] = useState<null | string>(null)

  const [questionImage, setQuestionImage] = useState<File | null | undefined>(undefined)
  const [questionPreview, setQuestionPreview] = useState<null | string>(null)

  useEffect(() => {
    if (answerImg) {
      setAnswerPreview(answerImg)
    }

    if (questionImg) {
      setQuestionPreview(questionImg)
    }
  }, [answerImg, questionImg])

  useEffect(() => {
    if (answerImage) {
      const newPreview = URL.createObjectURL(answerImage)

      if (answerPreview) {
        URL.revokeObjectURL(answerPreview)
      }
      setAnswerPreview(newPreview)

      return () => URL.revokeObjectURL(newPreview)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answerImage])

  useEffect(() => {
    if (questionImage) {
      const newPreview = URL.createObjectURL(questionImage)

      if (questionPreview) {
        URL.revokeObjectURL(questionPreview)
      }
      setQuestionPreview(newPreview)

      return () => URL.revokeObjectURL(newPreview)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionImage])

  const onUploadAnswerImgHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      setAnswerImage(file)
    }
  }

  const onRemoveAnswerImgHandler = () => {
    setAnswerImage(null)
    setAnswerPreview(null)
  }

  const onUploadQuestionImgHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      setQuestionImage(file)
    }
  }

  const onRemoveQuestionImgHandler = () => {
    setQuestionImage(null)
    setQuestionPreview(null)
  }

  const onOpenChangeHandler = () => {
    onOpenChange()

    if (answerImg) {
      setAnswerPreview(answerImg)
    } else {
      setAnswerPreview(null)
    }

    if (questionImg) {
      setQuestionPreview(questionImg)
    } else {
      setQuestionPreview(null)
    }

    if (!question && !answer) {
      reset()
    }
  }

  const onSubmitHandler = (value: CardBody) => {
    onSubmit(value)
    onOpenChangeHandler()
    setAnswerImage(undefined)
    setQuestionImage(undefined)
  }

  const onHandleSubmit = handleSubmit(value => {
    return onSubmitHandler({
      answer: value.answer === answer ? undefined : value.answer,
      answerImg: answerImage ?? (answerImage === null ? null : undefined),
      question: value.question === question ? undefined : value.question,
      questionImg: questionImage ?? (questionImage === null ? null : undefined),
    })
  })

  return (
    <Dialog onOpenChange={onOpenChangeHandler} open={open}>
      <DialogPortal
        className={style.portal}
        isScroll={!!questionPreview && !!answerPreview}
        title={title}
      >
        <form className={style.form} onSubmit={onHandleSubmit}>
          <ControlledTextField
            control={control}
            label={'Question'}
            name={'question'}
            placeholder={'Question'}
          />

          {questionPreview && <img alt={'questionPreview'} src={questionPreview} />}

          <div className={style.buttons}>
            {questionPreview && (
              <Button className={style.removeButton} fullWidth onClick={onRemoveQuestionImgHandler}>
                <SlTrash /> Remove Image
              </Button>
            )}

            <Button as={'label'} className={style.uploadButton} fullWidth variant={'secondary'}>
              <SlCloudUpload /> Upload Image
              <input accept={'image/*'} onChange={onUploadQuestionImgHandler} type={'file'} />
            </Button>
          </div>

          <ControlledTextField
            className={style.textField}
            control={control}
            label={'Answer'}
            name={'answer'}
            placeholder={'Answer'}
          />

          {answerPreview && <img alt={'answerPreview'} src={answerPreview} />}

          <div className={style.buttons}>
            {answerPreview && (
              <Button className={style.removeButton} fullWidth onClick={onRemoveAnswerImgHandler}>
                <SlTrash /> Remove Image
              </Button>
            )}

            <Button as={'label'} className={style.uploadButton} fullWidth variant={'secondary'}>
              <SlCloudUpload /> Upload Image
              <input accept={'image/*'} onChange={onUploadAnswerImgHandler} type={'file'} />
            </Button>
          </div>

          <div className={style.buttonsWrap}>
            <Button onClick={onOpenChangeHandler} variant={'secondary'}>
              Cancel
            </Button>

            <Button>{title}</Button>
          </div>
        </form>
      </DialogPortal>
    </Dialog>
  )
}
