import { baseApi } from '../api/baseApi'
import { LoginBody, LoginResponse, MeResponse } from './authTypes'

const authApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      login: builder.mutation<LoginResponse, LoginBody>({
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
      me: builder.query<MeResponse, void>({
        providesTags: ['me'],
        query: () => 'v1/auth/me',
      }),
    }
  },
})

export const { useLoginMutation, useLogoutMutation, useMeQuery } = authApi
