import style from './profilePage.module.scss'

import { Profile } from '../../components/layout/profile/profile'
import { useLogoutMutation, useMeQuery, useUpdateMutation } from '../../features/auth/authApi'

export const ProfilePage = () => {
  const { data: me } = useMeQuery()
  const [logout] = useLogoutMutation()
  const [update] = useUpdateMutation()

  return (
    <Profile
      avatar={me?.avatar}
      className={style.profilePage}
      email={me?.email}
      logout={logout}
      name={me?.name}
      update={update}
    />
  )
}
