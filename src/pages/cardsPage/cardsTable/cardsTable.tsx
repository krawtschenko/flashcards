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
            <div>Question {getSortIcon('question', orderBy)}</div>
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
            <div>Last Updated {getSortIcon('updated', orderBy)}</div>
          </Th>

          <Th
            className={clsx(style.th, style.thGrade, getSortIcon('grade', orderBy) && style.active)}
            onClick={() => handleSort('grade', orderBy, setOrderBy)}
          >
            <div>Grade {getSortIcon('grade', orderBy)}</div>
          </Th>

          {isOwner && <Th className={style.th}></Th>}
        </Tr>
      </Thead>

      <Tbody>
        {cards?.map(({ answer, grade, id, question, updated }) => {
          const updatedLocale = new Date(updated).toLocaleDateString('en-GB')

          // Generate stars
          const stars = Array.from({ length: 5 }, (_, index) =>
            index < grade ? <IoIosStar key={index} /> : <IoIosStarOutline key={index} />
          )

          return (
            <Tr key={id}>
              <Td className={clsx(style.td, style.tdQuestion)} title={question}>
                {question}
              </Td>

              <Td className={clsx(style.td, style.tdAnswer)} title={answer}>
                {answer}
              </Td>

              <Td className={clsx(style.td, style.tdUpdated)}>{updatedLocale}</Td>

              <Td className={clsx(style.td, style.tdGrade)}>
                <div className={style.stars}>{stars}</div>
              </Td>

              {isOwner && (
                <Td className={(style.td, style.tdActions)}>
                  <div>
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
