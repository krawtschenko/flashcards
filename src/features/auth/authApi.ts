import { baseApi } from '../api/baseApi'
import { Login, LoginResponse, Me, Registration, RegistrationResponse } from './authTypes'

const authApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      login: builder.mutation<LoginResponse, Login>({
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled

            if (!data) {
              return
            }

            // Save tokens to localStorage after successful login
            localStorage.setItem('accessToken', data.accessToken)
            localStorage.setItem('refreshToken', data.refreshToken)

            // After saving tokens, initiate the 'me' query to fetch user data
            dispatch(authApi.endpoints.me.initiate())
          } catch (error) {
            console.error('Login failed:', error)
          }
        },
        query: body => {
          return {
            body,
            method: 'POST',
            url: 'v1/auth/login',
          }
        },
      }),
      logout: builder.mutation<void, void>({
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          try {
            await queryFulfilled

            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')

            // Reset API state
            dispatch(authApi.util.resetApiState())
          } catch (error) {
            console.error('Logout failed:', error)
          }
        },
        query: () => {
          return {
            method: 'POST',
            url: 'v2/auth/logout',
          }
        },
      }),
      me: builder.query<Me, void>({
        providesTags: ['me'],
        query: () => 'v1/auth/me',
      }),
      registration: builder.mutation<RegistrationResponse, Registration>({
        query: body => {
          return {
            body,
            method: 'POST',
            url: 'v1/auth/sign-up',
          }
        },
      }),
    }
  },
})

export const {
  useLazyMeQuery,
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
  useRegistrationMutation,
} = authApi
