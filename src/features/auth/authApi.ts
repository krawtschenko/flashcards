import { baseApi } from '../../services/baseApi'
import {
  Login,
  LoginResponse,
  Me,
  Registration,
  RegistrationResponse,
  UpdateUser,
  resetPassBody,
} from './authTypes'

const authApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      confirmEmail: builder.mutation<void, { code: string }>({
        invalidatesTags: ['me'],
        query: body => {
          return {
            body,
            method: 'POST',
            url: '/v1/auth/verify-email',
          }
        },
      }),
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
            url: '/v1/auth/login',
          }
        },
      }),
      logout: builder.mutation<void, void>({
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          try {
            await queryFulfilled

            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')

            localStorage.removeItem('lightBackground')
            localStorage.removeItem('textColor')

            // Reset API state
            dispatch(authApi.util.resetApiState())
          } catch (error) {
            console.error('Logout failed:', error)
          }
        },
        query: () => {
          return {
            method: 'POST',
            url: '/v2/auth/logout',
          }
        },
      }),
      me: builder.query<Me, void>({
        providesTags: ['me'],
        query: () => '/v1/auth/me',
      }),
      recovery: builder.mutation<void, { email: string }>({
        query: ({ email }) => {
          return {
            body: {
              email,
              html: '<div style="font-family: Arial, sans-serif; color: #333333; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">\
  <h1 style="font-size: 28px; font-weight: bold; margin-top: 0;">\
    Hi, ##name##\
  </h1>\
  <p style="font-size: 16px; line-height: 1.5; color: #51545e;">\
    Click <a href=\'http://localhost:5173/recover-password/##token##\' style="color: #1a73e8; text-decoration: none; font-weight: bold;">here</a> to recover your password.\
  </p>\
</div>',
            },
            method: 'POST',
            url: '/v1/auth/recover-password',
          }
        },
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
      resetPassword: builder.mutation<void, resetPassBody>({
        query: ({ token, ...body }) => {
          return {
            body,
            method: 'POST',
            url: `/v1/auth/reset-password/${token}`,
          }
        },
      }),
      update: builder.mutation<Me, UpdateUser>({
        invalidatesTags: ['me', 'decks'],
        query: ({ avatar, name }) => {
          const formData = new FormData()

          if (name) {
            formData.append('name', name)
          }

          if (avatar) {
            formData.append('avatar', avatar)
          } else if (avatar === null) {
            formData.append('avatar', '')
          }

          return {
            body: formData,
            method: 'PATCH',
            url: '/v1/auth/me',
          }
        },
      }),
      verify: builder.mutation<void, { userId?: string }>({
        query: ({ userId }) => {
          return {
            body: {
              html: '<div style="font-family: Arial, sans-serif; color: #333333;">\
  <h1 style="margin-top: 0; color: #333333; font-size: 24px; font-weight: bold; text-align: left;">\
    Thank you for signing up for ##name##!\
  </h1>\
  <p style="color: #51545e; margin: 0.4em 0 1.2em; font-size: 16px; line-height: 1.6;">\
    We\'re glad you\'re here. Let\'s verify your email address:\
  </p>\
  <p style="color: #51545e; margin: 0.4em 0 1.2em; font-size: 16px; line-height: 1.6;">\
    Your code:\
  </p>\
  <h2 style="margin-top: 0; margin-bottom: 0.4em; color: #333333; font-size: 20px; font-weight: bold; text-align: left;">\
    ##token##\
  </h2>\
</div>',
              subject: 'verify',
              userId,
            },
            method: 'POST',
            url: '/v1/auth/resend-verification-email',
          }
        },
      }),
    }
  },
})

export const {
  useConfirmEmailMutation,
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
  useRecoveryMutation,
  useRegistrationMutation,
  useResetPasswordMutation,
  useUpdateMutation,
  useVerifyMutation,
} = authApi
