import { Table, Tbody, Td, Th, Thead, Tr } from '../../components/ui/table/table'
import { Deck } from '../../features/decks/decksTypes'

type DecksTableProps = {
  decks?: Deck[]
}

export const DecksTable = ({ decks }: DecksTableProps) => {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Cards</Th>
          <Th>Last Updated</Th>
          <Th>Created By</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>

      <Tbody>
        {decks?.map(deck => {
          const updatedAt = new Date(deck.updated).toLocaleDateString('ru-RU')

          return (
            <Tr key={deck.id}>
              <Td>{deck.name}</Td>
              <Td>{deck.cardsCount}</Td>
              <Td>{updatedAt}</Td>
              <Td>{deck.author.name}</Td>
              <Td>Actions</Td>
            </Tr>
          )
        })}
      </Tbody>
    </Table>
  )
}
