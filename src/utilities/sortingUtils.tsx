import { ReactNode } from 'react'

import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

export const handleSort = (
  column: string,
  orderBy: null | string,
  setOrderBy: (value: null | string) => void
) => {
  if (orderBy === `${column}-asc`) {
    setOrderBy(`${column}-desc`)
  } else if (orderBy === `${column}-desc`) {
    setOrderBy(null)
  } else {
    setOrderBy(`${column}-asc`)
  }
}

export const getSortIcon = (column: string, orderBy: null | string): ReactNode => {
  if (orderBy === `${column}-asc`) {
    return <FiChevronUp />
  } else if (orderBy === `${column}-desc`) {
    return <FiChevronDown />
  }

  return null
}
