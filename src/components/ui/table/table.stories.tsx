import { Meta } from '@storybook/react'

import { Table, Tbody, Td, Th, Thead, Tr } from './table'

const meta = {
  component: Table,
  tags: ['autodocs'],
  title: 'UI/Table',
} satisfies Meta<typeof Table>

export default meta

const data = [
  { age: 28, city: 'New York', name: 'John', profession: 'Engineer' },
  { age: 34, city: 'Los Angeles', name: 'Alice', profession: 'Programmer' },
  { age: 22, city: 'Chicago', name: 'Emma', profession: 'Designer' },
  { age: 40, city: 'Houston', name: 'Michael', profession: 'Manager' },
]

export const Primary = {
  render: () => {
    return (
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Age</Th>
            <Th>City</Th>
            <Th>Profession</Th>
          </Tr>
        </Thead>

        <Tbody>
          {data.map(({ age, city, name, profession }, index) => (
            <Tr key={index}>
              <Td>{name}</Td>
              <Td>{age}</Td>
              <Td>{city}</Td>
              <Td>{profession}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    )
  },
}
