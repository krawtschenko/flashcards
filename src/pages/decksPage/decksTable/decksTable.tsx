import { Link } from 'react-router-dom'

import clsx from 'clsx'
import { FiChevronDown, FiChevronUp, FiEdit, FiPlayCircle, FiTrash } from 'react-icons/fi'

import style from './decksTable.module.scss'

import coverImg from '../../../assets/images/cover.svg'
import { Button } from '../../../components/ui/button/button'
import { Table, Tbody, Td, Th, Thead, Tr } from '../../../components/ui/table/table'
import { Deck, DeckBody } from '../../../features/decks/decksTypes'
import { path } from '../../../routes/path'
import { DecksDialog, DeleteDeckDialog } from '../decksDialog/decksDialog'

type DecksTableProps = {
  className?: string
  decks?: Deck[]
  meId?: string
  onDeleteDeck: (id: string) => void
  onUpdateDeck: (args: { id: string } & DeckBody) => void
  orderBy: null | string
  setOrderBy: (orderBy: null | string) => void
}

export const DecksTable = (props: DecksTableProps) => {
  const { className, decks, meId, onDeleteDeck, onUpdateDeck, orderBy, setOrderBy } = props

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
          <Th className={clsx(getSortIcon('name') && style.active)} onClick={() => onSort('name')}>
            <div className={style.th}>Name {getSortIcon('name')}</div>
          </Th>
          <Th
            className={clsx(getSortIcon('cardsCount') && style.active)}
            onClick={() => onSort('cardsCount')}
          >
            <div className={style.th}>Cards {getSortIcon('cardsCount')}</div>
          </Th>
          <Th
            className={clsx(getSortIcon('updated') && style.active)}
            onClick={() => onSort('updated')}
          >
            <div className={style.th}>Last Updated {getSortIcon('updated')}</div>
          </Th>
          <Th
            className={clsx(getSortIcon('author.name') && style.active)}
            onClick={() => onSort('author.name')}
          >
            <div className={style.th}>Created By {getSortIcon('author.name')}</div>
          </Th>
          <Th></Th>
        </Tr>
      </Thead>

      <Tbody>
        {decks?.map(({ author, cardsCount, cover, id, isPrivate, name, updated }) => {
          const updatedLocale = new Date(updated).toLocaleDateString()
          const deckName = name.length > 30 ? `${name.slice(0, 27)}...` : name
          const deckCover = cover || coverImg

          const isMe = meId === author.id

          return (
            <Tr key={id}>
              <Td className={style.tdName} title={name}>
                <Link className={style.link} to={`${path.decks}/${id}`}>
                  <img alt={'cover'} src={deckCover} />
                  {deckName}
                </Link>
              </Td>
              <Td className={clsx(style.tdCards, cardsCount === 0 && style.zero)}>{cardsCount}</Td>
              <Td>{updatedLocale}</Td>
              <Td className={style.tdAuthor}>{author.name}</Td>
              <Td className={style.tdActions}>
                <div>
                  <Button className={style.play} disabled={cardsCount === 0}>
                    <FiPlayCircle />
                  </Button>

                  {isMe && (
                    <DecksDialog
                      cover={cover}
                      isPrivate={isPrivate}
                      name={name}
                      onSubmit={body => onUpdateDeck({ id, ...body })}
                      title={'Update Deck'}
                    >
                      <Button className={style.edit}>
                        <FiEdit />
                      </Button>
                    </DecksDialog>
                  )}

                  {isMe && (
                    <DeleteDeckDialog name={name} onDelete={() => onDeleteDeck(id)}>
                      <Button className={style.btnTrash}>
                        <FiTrash />
                      </Button>
                    </DeleteDeckDialog>
                  )}
                </div>
              </Td>
            </Tr>
          )
        })}
      </Tbody>
    </Table>
  )
}
