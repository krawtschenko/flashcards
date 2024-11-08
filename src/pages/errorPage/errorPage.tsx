import style from './errorPage.module.scss'

import error from '../../assets/images/404.png'
import { Button } from '../../components/ui/button/button'
import { Typography } from '../../components/ui/typography/typography'
import { Link } from 'react-router-dom'
import { path } from '../../routes/path'

export const ErrorPage = () => {
  return (
    <div className={style.errorPage}>
      <img alt={'errorImg'} src={error} />

      <Typography variant={'body1'}>Sorry! Page not found!</Typography>

      <Button as={Link} to={path.decks} className={style.button}>
        Back to home page
      </Button>
    </div>
  )
}
