import { FiLogOut, FiUser } from 'react-icons/fi'

import style from './header.module.scss'

import { Logo } from '../../../assets/icons/logo'
import { Button } from '../../ui/button/button'
import { DropdownItem, DropdownLabel, DropdownMenu } from '../../ui/dropdownMenu/dropdownMenu'
import { Typography } from '../../ui/typography/typography'
import { Container } from '../container/contaiter'

type HeaderProps = { personalInfo?: PersonalInfo }

type PersonalInfo = {
  avatar?: string
  email: string
  name: string
}

export const Header = ({ personalInfo }: HeaderProps) => {
  return (
    <div className={style.header}>
      <Container className={style.container}>
        <Logo className={style.logo} />

        {personalInfo ? (
          <div className={style.info}>
            <Typography className={style.name} variant={'subtitle1'}>
              {personalInfo.name}
            </Typography>
            <DropdownMenu avatar={personalInfo.avatar} variant={'avatar'}>
              <DropdownLabel personalInfo={personalInfo} />
              <DropdownItem>
                <FiUser />
                My Profile
              </DropdownItem>
              <DropdownItem>
                <FiLogOut />
                Sign Out
              </DropdownItem>
            </DropdownMenu>
          </div>
        ) : (
          <Button variant={'secondary'}>Sign In</Button>
        )}
      </Container>
    </div>
  )
}
