import { createApi } from "@reduxjs/toolkit/query/react";
import { getBaseQuery } from "./base";
import type { CoffeeI } from "../types/coffee";
import type { PaginationResponseI } from "../types/responses";

export const coffeeAPI = createApi({
    reducerPath: "coffeeAPI",
    baseQuery: getBaseQuery,
    endpoints: (builder) => ({
        fetchCoffees: builder.query<PaginationResponseI<CoffeeI>, void>({
            query: () => ({
                url: '/v1/coffees',
                method: 'GET'
            })
        }),

    })
})

export const { useFetchCoffeesQuery } = coffeeAPI;