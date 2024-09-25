import { toast } from 'react-toastify'

import style from './profilePage.module.scss'

import { Profile, ProfileValue } from '../../components/layout/profile/profile'
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
      await verify({ userId: me?.id }).unwrap()
      await router.navigate(path.confirmEmail)
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  const updateHandler = async (e: ProfileValue) => {
    try {
      await update(e).unwrap()
      toast.success('Profile is updated')
    } catch (error) {
      toast.error('Something went wrong')
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
      update={updateHandler}
      verify={verifyHandler}
    />
  )
}
