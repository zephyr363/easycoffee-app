import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { UserI } from '../types/user'
import { API_BASE_URL } from './base'


export const userAPI = createApi({
    reducerPath: 'pokemonApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${API_BASE_URL}` }),
    endpoints: (builder) => ({
        fetchUsers: builder.query<UserI, void>({
            query: () => `/users`,
        }),
    }),
})


export const { useFetchUsersQuery } = userAPI;