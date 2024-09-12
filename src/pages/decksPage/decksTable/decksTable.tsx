import { FiChevronDown, FiChevronUp, FiEdit, FiPlayCircle, FiTrash } from 'react-icons/fi'

import style from './decksTable.module.scss'

import coverImg from '../../../assets/images/cover.png'
import { Button } from '../../../components/ui/button/button'
import { Table, Tbody, Td, Th, Thead, Tr } from '../../../components/ui/table/table'
import { Deck } from '../../../features/decks/decksTypes'
import { useDeleteDeckMutation } from '../../../features/decks/dekcsApi'

type DecksTableProps = {
  className?: string
  decks?: Deck[]
  meId?: string
  orderBy: null | string
  setOrderBy: (orderBy: null | string) => void
}

export const DecksTable = ({ className, decks, meId, orderBy, setOrderBy }: DecksTableProps) => {
  const [deleteDeck] = useDeleteDeckMutation()

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
          const name = deck.name.length > 30 ? `${deck.name.slice(0, 27)}...` : deck.name
          const cover = deck.cover || coverImg

          const isDisabled = meId !== deck.author.id

          return (
            <Tr key={deck.id}>
              <Td className={style.tdName}>
                <div>
                  <img alt={'cover'} src={cover} />
                  {name}
                </div>
              </Td>
              <Td className={style.tdCards}>{deck.cardsCount}</Td>
              <Td>{updatedAt}</Td>
              <Td className={style.tdAuthor}>{deck.author.name}</Td>
              <Td className={style.tdActions}>
                <div>
                  <Button>
                    <FiPlayCircle />
                  </Button>

                  <Button disabled={isDisabled}>
                    <FiEdit />
                  </Button>

                  <Button disabled={isDisabled} onClick={() => deleteDeck(deck.id)}>
                    <FiTrash />
                  </Button>
                </div>
              </Td>
            </Tr>
          )
        })}
      </Tbody>
    </Table>
  )
}
