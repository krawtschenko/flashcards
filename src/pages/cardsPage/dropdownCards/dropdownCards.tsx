import { useState } from 'react'
import { Link } from 'react-router-dom'

import { FiEdit, FiPlayCircle, FiTrash } from 'react-icons/fi'

import style from './dropdownCards.module.scss'

import { DropdownItem, DropdownMenu } from '../../../components/ui/dropdownMenu/dropdownMenu'
import { Deck, DeckBody } from '../../../features/decks/decksTypes'
import { path } from '../../../routes/path'
import { DecksDialog } from '../../decksPage/deckDialog/deckDialog'
import { DeckDialogDelete } from '../../decksPage/deckDialog/deckDialogDelete'

type DropdownCardsProps = {
  deck?: Deck
  deckId: string
  onDeleteDeck: (id: string) => void
  onUpdateDeckHandler: (args: { id: string } & DeckBody) => void
}

export const DropdownCards = (props: DropdownCardsProps) => {
  const { deck, deckId, onDeleteDeck, onUpdateDeckHandler } = props

  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false)

  return (
    <>
      <DecksDialog
        cover={deck?.cover}
        isPrivate={deck?.isPrivate}
        name={deck?.name}
        onOpenChange={() => setIsOpenModal(false)}
        onSubmit={body => onUpdateDeckHandler({ id: deckId, ...body })}
        open={isOpenModal}
        title={'Edit Deck'}
      />

      <DeckDialogDelete
        name={deck?.name}
        onOpenChange={() => setIsOpenModalDelete(false)}
        onSubmit={() => onDeleteDeck(deckId)}
        open={isOpenModalDelete}
      />

      <DropdownMenu variant={'icon'}>
        <DropdownItem disabled={!deck?.cardsCount}>
          <Link className={style.dropdownItem} to={`/decks/${deckId}/learn`}>
            <FiPlayCircle />
            Learn
          </Link>
        </DropdownItem>

        <DropdownItem onSelect={() => setIsOpenModal(true)}>
          <div className={style.dropdownItem}>
            <FiEdit />
            Edit
          </div>
        </DropdownItem>

        <DropdownItem onSelect={() => setIsOpenModalDelete(true)}>
          <div className={style.dropdownItem}>
            <FiTrash />
            Delete
          </div>
        </DropdownItem>
      </DropdownMenu>
    </>
  )
}
