import style from './cardsTable.module.scss'

import { Table, Th, Thead, Tr } from '../../../components/ui/table/table'
import { Card } from '../../../features/decks/decksTypes'

type DeckTableProps = {
  cards?: Card[]
  className?: string
  meId?: string
  orderBy: null | string
  setOrderBy: (orderBy: null | string) => void
}

export const CardsTable = (props: DeckTableProps) => {
  const { cards, className, meId, orderBy, setOrderBy } = props

  return (
    <Table className={className}>
      <Thead>
        <Tr>
          <Th>
            <div className={style.th}>Question</div>
          </Th>

          <Th>
            <div className={style.th}>Answer</div>
          </Th>

          <Th>
            <div className={style.th}>Last Updated</div>
          </Th>

          <Th>
            <div className={style.th}>Grade</div>
          </Th>
        </Tr>
      </Thead>
    </Table>
  )
}
