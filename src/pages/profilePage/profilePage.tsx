import style from './profilePage.module.scss'

import { Profile } from '../../components/layout/profile/profile'
import {
  useLogoutMutation,
  useMeQuery,
  useUpdateMutation,
  useVerifyMutation,
} from '../../features/auth/authApi'
import { path } from '../../routes/path'
import { router } from '../../routes/router'

export const ProfilePage = () => {
  const { data: me } = useMeQuery()
  const [logout] = useLogoutMutation()
  const [update] = useUpdateMutation()
  const [verify] = useVerifyMutation()

  const verifyHandler = async () => {
    try {
      await verify({ userId: me?.id })
      await router.navigate(path.confirmEmail)
    } catch (error) {
      alert(error)
    }
  }

  return (
    <Profile
      avatar={me?.avatar}
      className={style.profilePage}
      email={me?.email}
      isEmailVerified={me?.isEmailVerified}
      logout={logout}
      name={me?.name}
      update={update}
      verify={verifyHandler}
    />
  )
}
