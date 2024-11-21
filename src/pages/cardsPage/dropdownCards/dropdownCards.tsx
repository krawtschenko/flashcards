import { FiEdit, FiPlayCircle, FiTrash } from 'react-icons/fi'

import style from './dropdownCards.module.scss'

import { DropdownItem, DropdownMenu } from '../../../components/ui/dropdownMenu/dropdownMenu'
import { Deck, DeckBody } from '../../../features/decks/decksTypes'
import { DecksDialog } from '../../decksPage/decksDialog/decksDialog'
import { DeleteDeckDialog } from '../../decksPage/decksDialog/decksDialogDelete'

type DropdownCardsProps = {
  deck?: Deck
  deckId: string
  onDeleteDeck: (id: string) => void
  onUpdateDeckHandler: (args: { id: string } & DeckBody) => void
}

export const DropdownCards = (props: DropdownCardsProps) => {
  const { deck, deckId, onDeleteDeck, onUpdateDeckHandler } = props

  return (
    <DropdownMenu variant={'icon'}>
      <DropdownItem
        onSelect={event => {
          event.preventDefault()
        }}
      >
        <div className={style.dropdownItem}>
          <FiPlayCircle />
          Learn
        </div>
      </DropdownItem>
      <DropdownItem
        onSelect={event => {
          event.preventDefault()
        }}
      >
        <DecksDialog
          cover={deck?.cover}
          isPrivate={deck?.isPrivate}
          name={deck?.name}
          onSubmit={body => onUpdateDeckHandler({ id: deckId, ...body })}
          title={'Edit Deck'}
        >
          <div className={style.dropdownItem}>
            <FiEdit />
            Edit
          </div>
        </DecksDialog>
      </DropdownItem>

      <DropdownItem
        onSelect={event => {
          event.preventDefault()
        }}
      >
        <DeleteDeckDialog name={deck?.name} onDelete={() => onDeleteDeck(deckId)}>
          <div className={style.dropdownItem}>
            <FiTrash />
            Delete
          </div>
        </DeleteDeckDialog>
      </DropdownItem>
    </DropdownMenu>
  )
}
