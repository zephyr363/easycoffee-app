import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { UserI } from '../types/user'
import type { LoginCredentials } from '../types/request';
import type { PaginationResponseI } from '../types/responses';
import { getBaseQuery } from './base';


export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: getBaseQuery,
    endpoints: (builder) => ({
        fetchUsers: builder.query<PaginationResponseI<UserI>, void>({
            query: () => `v1/users`,
        }),
        loginUser: builder.mutation<UserI, LoginCredentials>({
            query: (credentials) => ({
                url: 'v1/users/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        createUser: builder.mutation<UserI, LoginCredentials>({
            query: (newUser) => ({
                url: 'v1/users',
                method: 'POST',
                body: newUser,
            }),
        }),
    }),
})


export const { useFetchUsersQuery } = userAPI;