import { FiLogOut, FiUser } from 'react-icons/fi'

import style from './header.module.scss'

import { Logo } from '../../../assets/icons/logo/logo'
import { Button } from '../../ui/button/button'
import { DropdownItem, DropdownLabel, DropdownMenu } from '../../ui/dropdownMenu/dropdownMenu'
import { Typography } from '../../ui/typography/typography'
import { Container } from '../container/contaiter'

type HeaderProps = {
  isAuthenticated: boolean
  logout: () => void
  personalInfo?: PersonalInfo
}

type PersonalInfo = {
  avatar?: string
  email: string
  name: string
}

export const Header = ({ isAuthenticated, logout, personalInfo }: HeaderProps) => {
  return (
    <div className={style.header}>
      <Container className={style.container}>
        <Logo className={style.logo} />

        {isAuthenticated && <DropdownAvatar logout={logout} personalInfo={personalInfo} />}

        {!isAuthenticated && <Button variant={'secondary'}>Sign In</Button>}
      </Container>
    </div>
  )
}

type DropdownAvatarProps = {
  logout: () => void
  personalInfo?: PersonalInfo
}

const DropdownAvatar = ({ logout, personalInfo }: DropdownAvatarProps) => {
  return (
    <div className={style.info}>
      <Typography className={style.name} variant={'subtitle1'}>
        {personalInfo?.name}
      </Typography>

      <DropdownMenu avatar={personalInfo?.avatar} variant={'avatar'}>
        <DropdownLabel
          avatar={personalInfo?.avatar}
          email={personalInfo?.email}
          name={personalInfo?.name}
        />

        <DropdownItem>
          <FiUser />
          My Profile
        </DropdownItem>

        <DropdownItem onClick={logout}>
          <FiLogOut />
          Sign Out
        </DropdownItem>
      </DropdownMenu>
    </div>
  )
}
