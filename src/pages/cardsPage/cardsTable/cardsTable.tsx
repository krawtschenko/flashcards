import { useEffect, useState } from 'react'

import clsx from 'clsx'
import { FiEdit, FiTrash } from 'react-icons/fi'
import { IoIosStar, IoIosStarOutline } from 'react-icons/io'

import style from './cardsTable.module.scss'

import coverImg from '../../../assets/images/cover.svg'
import { Button } from '../../../components/ui/button/button'
import { Table, Tbody, Td, Th, Thead, Tr } from '../../../components/ui/table/table'
import { Card, CardBody } from '../../../features/cards/cardsTypes'
import { getSortIcon, handleSort } from '../../../utilities/sortingUtils'
import { CardsDialog } from '../cardsDialog/cardsDialog'
import { CardDialogDelete } from '../cardsDialog/cardsDialogDelete'

type CardsTableProps = {
  cards?: Card[]
  className?: string
  isOwner: boolean
  onDeleteCard: (id: string) => void
  onUpdateCard: (args: { id: string } & CardBody) => void
  orderBy: null | string
  setOrderBy: (orderBy: null | string) => void
}

export const CardsTable = (props: CardsTableProps) => {
  const { cards, className, isOwner, onDeleteCard, onUpdateCard, orderBy, setOrderBy } = props

  const [isMobile, setIsMobile] = useState(false)
  const [openModalId, setOpenModalId] = useState<null | string>(null)
  const [openDeleteModalId, setOpenDeleteModalId] = useState<null | string>(null)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (isMobile) {
    return (
      <div className={style.wrapper}>
        {cards?.map(({ answer, answerImg, grade, id, question, questionImg, updated }) => {
          const updatedLocale = new Date(updated).toLocaleDateString('en-GB')

          // Generate stars
          const stars = Array.from({ length: 5 }, (_, index) =>
            index < grade ? <IoIosStar key={index} /> : <IoIosStarOutline key={index} />
          )

          return (
            <div className={style.card} key={id}>
              <CardsDialog
                answer={answer}
                answerImg={answerImg}
                onOpenChange={() => setOpenModalId(null)}
                onSubmit={body => onUpdateCard({ id, ...body })}
                open={openModalId === id}
                question={question}
                questionImg={questionImg}
                title={'Edit Card'}
              />

              <CardDialogDelete
                onOpenChange={() => setOpenDeleteModalId(null)}
                onSubmit={() => onDeleteCard(id)}
                open={openDeleteModalId === id}
              />

              <div className={style.wrapInfo}>
                <div className={style.label}>Question</div>
                <div className={style.value} title={question}>
                  {question}
                </div>

                <div className={style.label}>Answer</div>
                <div className={style.value} title={answer}>
                  {answer}
                </div>

                <div className={style.label}>Last Updated</div>
                <div className={style.value}>{updatedLocale}</div>

                <div className={style.label}>Grade</div>
                <div className={clsx(style.value, style.stars)}>{stars}</div>
              </div>

              {isOwner && (
                <div className={style.buttons}>
                  <Button
                    className={clsx(style.button, style.edit)}
                    onClick={() => setOpenModalId(id)}
                  >
                    <FiEdit />
                  </Button>

                  <Button
                    className={clsx(style.button, style.trash)}
                    onClick={() => setOpenDeleteModalId(id)}
                  >
                    <FiTrash />
                  </Button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <Table className={clsx(style.table, className)}>
      <Thead>
        <Tr>
          <Th
            className={clsx(
              style.th,
              style.thQuestion,
              getSortIcon('question', orderBy) && style.active
            )}
            onClick={() => handleSort('question', orderBy, setOrderBy)}
          >
            <div>
              Question
              {getSortIcon('question', orderBy)}
            </div>
          </Th>

          <Th
            className={clsx(
              style.th,
              style.thAnswer,
              getSortIcon('answer', orderBy) && style.active
            )}
            onClick={() => handleSort('answer', orderBy, setOrderBy)}
          >
            <div>Answer {getSortIcon('answer', orderBy)}</div>
          </Th>

          <Th
            className={clsx(
              style.th,
              style.thUpdated,
              getSortIcon('updated', orderBy) && style.active
            )}
            onClick={() => handleSort('updated', orderBy, setOrderBy)}
          >
            <div>Last Updated{getSortIcon('updated', orderBy)}</div>
          </Th>

          <Th
            className={clsx(style.th, style.thGrade, getSortIcon('grade', orderBy) && style.active)}
            onClick={() => handleSort('grade', orderBy, setOrderBy)}
          >
            <div>Grade{getSortIcon('grade', orderBy)}</div>
          </Th>

          {isOwner && <Th className={clsx(style.th, style.thActions)}></Th>}
        </Tr>
      </Thead>

      <Tbody>
        {cards?.map(({ answer, answerImg, grade, id, question, questionImg, updated }) => {
          const updatedLocale = new Date(updated).toLocaleDateString('en-GB')

          const questionCover = questionImg || coverImg
          const answerCover = answerImg || coverImg

          // Generate stars
          const stars = Array.from({ length: 5 }, (_, index) =>
            index < grade ? <IoIosStar key={index} /> : <IoIosStarOutline key={index} />
          )

          return (
            <Tr key={id}>
              <CardsDialog
                answer={answer}
                answerImg={answerImg}
                onOpenChange={() => setOpenModalId(null)}
                onSubmit={body => onUpdateCard({ id, ...body })}
                open={openModalId === id}
                question={question}
                questionImg={questionImg}
                title={'Edit Card'}
              />

              <CardDialogDelete
                onOpenChange={() => setOpenDeleteModalId(null)}
                onSubmit={() => onDeleteCard(id)}
                open={openDeleteModalId === id}
              />

              <Td className={clsx(style.td, style.tdQuestion)} title={question}>
                <div className={style.content}>
                  <img alt={'cover'} className={style.cover} src={questionCover} />
                  <span className={style.text}>{question}</span>
                </div>
              </Td>

              <Td className={clsx(style.td, style.tdAnswer)} title={answer}>
                <div className={style.content}>
                  <img alt={'cover'} className={style.cover} src={answerCover} />
                  <span className={style.text}>{answer}</span>
                </div>
              </Td>

              <Td className={clsx(style.td, style.tdUpdated)}>{updatedLocale}</Td>

              <Td className={clsx(style.td, style.tdGrade)}>
                <div className={style.stars}>{stars}</div>
              </Td>

              {isOwner && (
                <Td className={clsx(style.td, style.tdActions)}>
                  <div>
                    <Button className={style.edit} onClick={() => setOpenModalId(id)}>
                      <FiEdit />
                    </Button>

                    <Button className={style.btnTrash} onClick={() => setOpenDeleteModalId(id)}>
                      <FiTrash />
                    </Button>
                  </div>
                </Td>
              )}
            </Tr>
          )
        })}
      </Tbody>
    </Table>
  )
}
