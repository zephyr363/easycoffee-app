import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { UserI } from '../types/user'
import { API_BASE_URL } from './base'
import type { LoginCredentials } from '../types/request';
import type { PaginationResponseI } from '../types/responses';


export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({ baseUrl: `${API_BASE_URL}`, credentials: 'include' }),
    endpoints: (builder) => ({
        fetchUsers: builder.query<PaginationResponseI<UserI>, void>({
            query: () => `/users`,
        }),
        loginUser: builder.mutation<UserI, LoginCredentials>({
            query: (credentials) => ({
                url: '/users/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        createUser: builder.mutation<UserI, LoginCredentials>({
            query: (newUser) => ({
                url: '/users',
                method: 'POST',
                body: newUser,
            }),
        }),
    }),
})


export const { useFetchUsersQuery } = userAPI;