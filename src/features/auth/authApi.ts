import { baseApi } from '../api/baseApi'
import { Login, LoginResponse, Me, Registration, RegistrationResponse } from './authTypes'

const authApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      login: builder.mutation<LoginResponse, Login>({
        invalidatesTags: ['me'],
        query: body => {
          return {
            body,
            method: 'POST',
            url: 'v1/auth/login',
          }
        },
      }),
      logout: builder.mutation<void, void>({
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

export const { useLoginMutation, useLogoutMutation, useMeQuery, useRegistrationMutation } = authApi
