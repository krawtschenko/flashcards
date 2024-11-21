import clsx from 'clsx'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

import style from './cardsTable.module.scss'

import { Table, Tbody, Td, Th, Thead, Tr } from '../../../components/ui/table/table'
import { Card } from '../../../features/cards/cardsTypes'

type CardsTableProps = {
  cards?: Card[]
  className?: string
  meId?: string
  orderBy: null | string
  setOrderBy: (orderBy: null | string) => void
}

export const CardsTable = (props: CardsTableProps) => {
  const { cards, className, meId, orderBy, setOrderBy } = props

  const onSort = (column: string) => {
    if (orderBy === `${column}-asc`) {
      setOrderBy(`${column}-desc`)
    } else if (orderBy === `${column}-desc`) {
      setOrderBy(null)
    } else {
      setOrderBy(`${column}-asc`)
    }
  }

  const getSortIcon = (column: string) => {
    if (orderBy === `${column}-asc`) {
      return <FiChevronUp />
    } else if (orderBy === `${column}-desc`) {
      return <FiChevronDown />
    } else {
      return null
    }
  }

  return (
    <Table className={className}>
      <Thead>
        <Tr>
          <Th
            className={clsx(getSortIcon('question') && style.active)}
            onClick={() => onSort('question')}
          >
            <div className={style.th}>Question {getSortIcon('question')}</div>
          </Th>

          <Th
            className={clsx(getSortIcon('answer') && style.active)}
            onClick={() => onSort('answer')}
          >
            <div className={style.th}>Answer {getSortIcon('answer')}</div>
          </Th>

          <Th
            className={clsx(getSortIcon('updated') && style.active)}
            onClick={() => onSort('updated')}
          >
            <div className={style.th}>Last Updated {getSortIcon('updated')}</div>
          </Th>

          <Th
            className={clsx(getSortIcon('grade') && style.active)}
            onClick={() => onSort('grade')}
          >
            <div className={style.th}>Grade {getSortIcon('grade')}</div>
          </Th>
        </Tr>
      </Thead>

      <Tbody>
        {cards?.map(({ answer, grade, id, question, updated }) => {
          const updatedLocale = new Date(updated).toLocaleDateString()
          const cardQuestion = question.length > 40 ? `${question.slice(0, 37)}...` : question
          const cardAnswer = answer.length > 40 ? `${answer.slice(0, 37)}...` : answer

          return (
            <Tr key={id}>
              <Td className={style.tdQuestion} title={question}>
                {cardQuestion}
              </Td>
              <Td className={style.tdAnswer} title={answer}>
                {cardAnswer}
              </Td>
              <Td className={style.tdUpdated}>{updatedLocale}</Td>
              <Td className={style.tdGrade}>{grade}</Td>
            </Tr>
          )
        })}
      </Tbody>
    </Table>
  )
}
