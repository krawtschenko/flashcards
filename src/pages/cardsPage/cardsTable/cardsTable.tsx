import clsx from 'clsx'
import { FiEdit, FiTrash } from 'react-icons/fi'
import { IoIosStar, IoIosStarOutline } from 'react-icons/io'

import style from './cardsTable.module.scss'

import { Button } from '../../../components/ui/button/button'
import { Table, Tbody, Td, Th, Thead, Tr } from '../../../components/ui/table/table'
import { Card } from '../../../features/cards/cardsTypes'
import { getSortIcon, handleSort } from '../../../utilities/sortingUtils'

type CardsTableProps = {
  cards?: Card[]
  className?: string
  isOwner: boolean
  meId?: string
  orderBy: null | string
  setOrderBy: (orderBy: null | string) => void
}

export const CardsTable = (props: CardsTableProps) => {
  const { cards, className, isOwner, meId, orderBy, setOrderBy } = props

  return (
    <Table className={className}>
      <Thead>
        <Tr>
          <Th
            className={clsx(getSortIcon('question', orderBy) && style.active)}
            onClick={() => handleSort('question', orderBy, setOrderBy)}
          >
            <div className={style.th}>Question {getSortIcon('question', orderBy)}</div>
          </Th>

          <Th
            className={clsx(getSortIcon('answer', orderBy) && style.active)}
            onClick={() => handleSort('answer', orderBy, setOrderBy)}
          >
            <div className={style.th}>Answer {getSortIcon('answer', orderBy)}</div>
          </Th>

          <Th
            className={clsx(getSortIcon('updated', orderBy) && style.active)}
            onClick={() => handleSort('updated', orderBy, setOrderBy)}
          >
            <div className={style.th}>Last Updated {getSortIcon('updated', orderBy)}</div>
          </Th>

          <Th
            className={clsx(getSortIcon('grade', orderBy) && style.active)}
            onClick={() => handleSort('grade', orderBy, setOrderBy)}
          >
            <div className={style.th}>Grade {getSortIcon('grade', orderBy)}</div>
          </Th>

          {isOwner && (
            <Th>
              <div className={style.th}></div>
            </Th>
          )}
        </Tr>
      </Thead>

      <Tbody>
        {cards?.map(({ answer, grade, id, question, updated }) => {
          const updatedLocale = new Date(updated).toLocaleDateString('en-GB')
          const cardQuestion = question.length > 40 ? `${question.slice(0, 37)}...` : question
          const cardAnswer = answer.length > 40 ? `${answer.slice(0, 37)}...` : answer

          // Generate stars
          const stars = Array.from({ length: 5 }, (_, index) =>
            index < grade ? <IoIosStar key={index} /> : <IoIosStarOutline key={index} />
          )

          return (
            <Tr key={id}>
              <Td className={style.tdQuestion} title={question}>
                {cardQuestion}
              </Td>

              <Td className={style.tdAnswer} title={answer}>
                {cardAnswer}
              </Td>

              <Td className={style.tdUpdated}>{updatedLocale}</Td>

              <Td className={style.tdGrade}>
                <div className={style.stars}>{stars}</div>
              </Td>

              {isOwner && (
                <Td>
                  <div className={style.actions}>
                    <Button className={style.edit} onClick={() => alert('yoy')}>
                      <FiEdit />
                    </Button>

                    <Button className={style.btnTrash} onClick={() => alert('yoy')}>
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
