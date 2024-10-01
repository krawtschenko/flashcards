import ReactDOM from 'react-dom'

import style from './loadingBar.module.scss'

type LoadingBarProps = {
  id?: string
  loading: boolean
}

export const LoadingBar = ({ id, loading }: LoadingBarProps) => {
  if (!loading) {
    return null
  }

  const loaderRoot = id ? document.getElementById(id) : null

  const loaderContent = (
    <div className={style.loadingBarWrap}>
      {loading && <div className={style.loadingBar}></div>}
    </div>
  )

  if (loaderRoot) {
    return ReactDOM.createPortal(loaderContent, loaderRoot)
  }

  return loaderContent
}
