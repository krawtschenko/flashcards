import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

import style from './decksTable.module.scss'

import { Deck } from '../../../features/decks/decksTypes'
import { Table, Tbody, Td, Th, Thead, Tr } from '../../ui/table/table'

type DecksTableProps = {
  className?: string
  decks?: Deck[]
  orderBy: null | string
  setOrderBy: (orderBy: null | string) => void
}

export const DecksTable = ({ className, decks, orderBy, setOrderBy }: DecksTableProps) => {
  const handleSort = (column: string) => {
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
          <Th onClick={() => handleSort('name')}>
            <div className={style.th}>Name {getSortIcon('name')}</div>
          </Th>
          <Th onClick={() => handleSort('cardsCount')}>
            <div className={style.th}>Cards {getSortIcon('cardsCount')}</div>
          </Th>
          <Th onClick={() => handleSort('updated')}>
            <div className={style.th}>Last Updated {getSortIcon('updated')}</div>
          </Th>
          <Th onClick={() => handleSort('author.name')}>
            <div className={style.th}>Created By {getSortIcon('author.name')}</div>
          </Th>
          <Th></Th>
        </Tr>
      </Thead>

      <Tbody>
        {decks?.map(deck => {
          const updatedAt = new Date(deck.updated).toLocaleDateString('ru-RU')

          return (
            <Tr key={deck.id}>
              <Td className={style.tdName}>{deck.name}</Td>
              <Td className={style.tdCards}>{deck.cardsCount}</Td>
              <Td>{updatedAt}</Td>
              <Td className={style.tdAuthor}>{deck.author.name}</Td>
              <Td className={style.tdActions}></Td>
            </Tr>
          )
        })}
      </Tbody>
    </Table>
  )
}
