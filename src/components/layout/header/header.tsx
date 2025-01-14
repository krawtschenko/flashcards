import { Link } from 'react-router-dom'

import { FiLogOut, FiUser } from 'react-icons/fi'

import style from './header.module.scss'

import { Logo } from '../../../assets/icons/logo/logo'
import { path } from '../../../routes/path'
import { router } from '../../../routes/router'
import { Button } from '../../ui/button/button'
import { DropdownItem, DropdownLabel, DropdownMenu } from '../../ui/dropdownMenu/dropdownMenu'
import { Typography } from '../../ui/typography/typography'
import { Container } from '../container/contaiter'

type HeaderProps = {
  avatar?: string
  email?: string
  isAuthenticated: boolean
  logout: () => void
  name?: string
}

export const Header = ({ avatar, email, isAuthenticated, logout, name }: HeaderProps) => {
  return (
    <div className={style.header}>
      <Container className={style.container}>
        <Logo className={style.logo} onClick={() => router.navigate(path.decks)} />

        {isAuthenticated && (
          <DropdownAvatar avatar={avatar} email={email} logout={logout} name={name} />
        )}

        {!isAuthenticated && (
          <Button as={Link} to={path.login} variant={'secondary'}>
            Sign In
          </Button>
        )}
      </Container>
    </div>
  )
}

type DropdownAvatarProps = {
  avatar?: string
  email?: string
  logout: () => void
  name?: string
}

const DropdownAvatar = ({ avatar, email, logout, name }: DropdownAvatarProps) => {
  return (
    <div className={style.info}>
      <Typography className={style.name} variant={'subtitle1'}>
        {name}
      </Typography>

      <DropdownMenu avatar={avatar} name={name} variant={'avatar'}>
        <DropdownLabel avatar={avatar} email={email} name={name} />

        <DropdownItem onClick={() => router.navigate(path.profile)}>
          <FiUser /> My Profile
        </DropdownItem>

        <DropdownItem onClick={logout}>
          <FiLogOut /> Sign Out
        </DropdownItem>
      </DropdownMenu>
    </div>
  )
}
