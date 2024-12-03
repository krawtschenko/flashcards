import { useState } from 'react'
import { Link } from 'react-router-dom'

import clsx from 'clsx'
import { FiEdit, FiPlayCircle, FiTrash } from 'react-icons/fi'

import style from './decksTable.module.scss'

import coverImg from '../../../assets/images/cover.svg'
import { Button } from '../../../components/ui/button/button'
import { Table, Tbody, Td, Th, Thead, Tr } from '../../../components/ui/table/table'
import { Deck, DeckBody } from '../../../features/decks/decksTypes'
import { path } from '../../../routes/path'
import { getSortIcon, handleSort } from '../../../utilities/sortingUtils'
import { DecksDialog } from '../decksDialog/decksDialog'
import { DeleteDeckDialog } from '../decksDialog/decksDialogDelete'

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

  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false)

  return (
    <Table className={clsx(style.table, className)}>
      <Thead>
        <Tr>
          <Th
            className={clsx(style.th, style.thName, getSortIcon('name', orderBy) && style.active)}
            onClick={() => handleSort('name', orderBy, setOrderBy)}
          >
            <div>Name {getSortIcon('name', orderBy)}</div>
          </Th>

          <Th
            className={clsx(
              style.th,
              style.thCards,
              getSortIcon('cardsCount', orderBy) && style.active
            )}
            onClick={() => handleSort('cardsCount', orderBy, setOrderBy)}
          >
            <div>Cards {getSortIcon('cardsCount', orderBy)}</div>
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
            className={clsx(
              style.th,
              style.thAuthor,
              getSortIcon('author.name', orderBy) && style.active
            )}
            onClick={() => handleSort('author.name', orderBy, setOrderBy)}
          >
            <div>Created By {getSortIcon('author.name', orderBy)}</div>
          </Th>

          <Th className={(style.th, style.thActions)}></Th>
        </Tr>
      </Thead>

      <Tbody>
        {decks?.map(({ author, cardsCount, cover, id, isPrivate, name, updated }) => {
          const updatedLocale = new Date(updated).toLocaleDateString('en-GB')
          const deckCover = cover || coverImg

          const isMe = meId === author.id

          return (
            <Tr key={id}>
              <DecksDialog
                cover={cover}
                isPrivate={isPrivate}
                name={name}
                onOpenChange={setIsOpenModal}
                onSubmit={body => onUpdateDeck({ id, ...body })}
                open={isOpenModal}
                title={'Update Deck'}
              />

              <DeleteDeckDialog
                name={name}
                onOpenChange={setIsOpenModalDelete}
                onSubmit={() => onDeleteDeck(id)}
                open={isOpenModalDelete}
              />

              <Td className={(style.td, style.tdName)} title={name}>
                <Link className={style.link} to={`${path.decks}/${id}`}>
                  <img alt={'cover'} src={deckCover} />
                  {name}
                </Link>
              </Td>

              <Td className={clsx(style.td, style.tdCards, cardsCount === 0 && style.zero)}>
                {cardsCount}
              </Td>

              <Td className={(style.td, style.tdUpdated)}>{updatedLocale}</Td>

              <Td className={(style.td, style.tdAuthor)}>{author.name}</Td>

              <Td className={(style.td, style.tdActions)}>
                <div>
                  <Button className={style.play} disabled={cardsCount === 0}>
                    <FiPlayCircle />
                  </Button>

                  {isMe && (
                    <Button className={style.edit} onClick={() => setIsOpenModal(true)}>
                      <FiEdit />
                    </Button>
                  )}

                  {isMe && (
                    <Button className={style.btnTrash} onClick={() => setIsOpenModalDelete(true)}>
                      <FiTrash />
                    </Button>
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
