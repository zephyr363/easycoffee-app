import { createApi } from "@reduxjs/toolkit/query/react";
import { getBaseQuery } from "./base";
import type { CoffeeCategoryI, CoffeeI } from "../types/coffee";
import type { PaginationResponseI } from "../types/responses";

interface FetchCoffeesParams {
    page?: number;
    search?: string;
    category?: string;
    price_min?: number;
    price_max?: number;
    ordering?: string;
}

export const coffeeAPI = createApi({
    reducerPath: "coffeeAPI",
    baseQuery: getBaseQuery,
    tagTypes: ['Coffee'],
    endpoints: (builder) => ({
        fetchCoffees: builder.query<PaginationResponseI<CoffeeI>, FetchCoffeesParams>({
            query: (params) => {
                const queryParams = new URLSearchParams();
                
                if (params.page) queryParams.append('page', params.page.toString());
                if (params.search) queryParams.append('search', params.search);
                if (params.category) queryParams.append('category', params.category);
                if (params.price_min) queryParams.append('price_min', params.price_min.toString());
                if (params.price_max) queryParams.append('price_max', params.price_max.toString());
                if (params.ordering) queryParams.append('ordering', params.ordering);
                
                return {
                    url: `/v1/coffees/?${queryParams.toString()}`,
                    method: 'GET'
                };
            },
            providesTags: ['Coffee'],
        }),
        fetchCategories: builder.query<PaginationResponseI<CoffeeCategoryI>, void>({
            query: () => ({
                url: '/v1/coffees/categories',
                method: 'GET'
            })
        }),
    })
})

export const { useFetchCoffeesQuery, useFetchCategoriesQuery } = coffeeAPI;