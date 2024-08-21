import { ComponentPropsWithoutRef } from 'react'

import clsx from 'clsx'

import style from './table.module.scss'

type TableProps = { className?: string } & ComponentPropsWithoutRef<'table'>

export const Table = ({ className, ...rest }: TableProps) => {
  return <table className={clsx(style.table, className)} {...rest} />
}

export const Thead = (props: ComponentPropsWithoutRef<'thead'>) => {
  return <thead {...props} />
}

export const Tbody = (props: ComponentPropsWithoutRef<'tbody'>) => {
  return <tbody {...props} />
}

export const Tfoot = (props: ComponentPropsWithoutRef<'tfoot'>) => {
  return <tfoot {...props} />
}

export const Tr = (props: ComponentPropsWithoutRef<'tr'>) => {
  return <tr {...props} />
}

export const Th = (props: ComponentPropsWithoutRef<'th'>) => {
  return <th {...props} />
}

export const Td = (props: ComponentPropsWithoutRef<'td'>) => {
  return <td {...props} />
}
