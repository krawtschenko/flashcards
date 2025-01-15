import ReactDOM from 'react-dom'

import style from './deckSidePanel.module.scss'

import { Button } from '../../../components/ui/button/button'

type DeckSidePanelProps = {
  closePanel: () => void
  id?: string
  isOpen: boolean
}

export const DeckSidePanel = ({ closePanel, id, isOpen }: DeckSidePanelProps) => {
  const sidePanelRoot = id ? document.getElementById(id) : null

  const sidePanel = (
    <>
      <div className={style.overlay} data-open={isOpen} onClick={closePanel} />
      <div className={style.sidePanel} data-open={isOpen} onClick={e => e.stopPropagation()}>
        <Button className={style.closeButton} onClick={closePanel}>
          ×
        </Button>

        <div className={style.content}>
          <h2>Filters</h2>

          <p>Текст внутри боковой панели.</p>
        </div>
      </div>
    </>
  )

  if (sidePanelRoot) {
    return ReactDOM.createPortal(sidePanel, sidePanelRoot)
  }

  return sidePanel
}
