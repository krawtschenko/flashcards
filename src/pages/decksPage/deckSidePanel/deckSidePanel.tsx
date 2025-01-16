import { ReactNode } from 'react'
import ReactDOM from 'react-dom'

import clsx from 'clsx'
import { IoCloseOutline } from 'react-icons/io5'

import style from './deckSidePanel.module.scss'

import { Button } from '../../../components/ui/button/button'
import { Typography } from '../../../components/ui/typography/typography'

type DeckSidePanelProps = {
  children?: ReactNode
  className?: string
  closePanel: () => void
  id?: string
  isOpen: boolean
}

export const DeckSidePanel = (props: DeckSidePanelProps) => {
  const { children, className, closePanel, id, isOpen } = props

  const sidePanelRoot = id ? document.getElementById(id) : null

  const sidePanel = (
    <>
      <div className={style.overlay} data-open={isOpen} onClick={closePanel} />

      <div
        className={clsx(style.sidePanel, className)}
        data-open={isOpen}
        onClick={e => e.stopPropagation()}
      >
        <div className={style.titleWrapper}>
          <Typography variant={'h1'}>Filter</Typography>

          <Button className={style.closeButton} onClick={closePanel}>
            <IoCloseOutline />
          </Button>
        </div>

        <div className={style.content}>{children}</div>
      </div>
    </>
  )

  if (sidePanelRoot) {
    return ReactDOM.createPortal(sidePanel, sidePanelRoot)
  }

  return sidePanel
}
