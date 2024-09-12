import style from './profilePage.module.scss'

import { Profile } from '../../components/layout/profile/profile'
import {
  useLogoutMutation,
  useMeQuery,
  useUpdateMutation,
  useVerifyMutation,
} from '../../features/auth/authApi'

export const ProfilePage = () => {
  const { data: me } = useMeQuery()
  const [logout] = useLogoutMutation()
  const [update] = useUpdateMutation()
  const [verify] = useVerifyMutation()

  return (
    <Profile
      avatar={me?.avatar}
      className={style.profilePage}
      email={me?.email}
      isEmailVerified={me?.isEmailVerified}
      logout={logout}
      name={me?.name}
      update={update}
      verify={() => verify({ userId: me?.id })}
    />
  )
}
