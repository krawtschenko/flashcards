import ReactDOM from 'react-dom'

import style from './loadingBar.module.scss'

type LoadingBarProps = {
  id?: string
}

export const LoadingBar = ({ id }: LoadingBarProps) => {
  const loaderRoot = id ? document.getElementById(id) : null

  const loaderContent = (
    <div className={style.loadingBarWrap}>
      <div className={style.loadingBar}></div>
    </div>
  )

  if (loaderRoot) {
    return ReactDOM.createPortal(loaderContent, loaderRoot)
  }

  return loaderContent
}
