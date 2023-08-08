import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
    reducerPath: "categoryApi",
    refetchOnFocus: true,
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.API_URL,
    }),
    endpoints: (builder) => ({
        getCategories: builder.query<{ id: string, name: string, brand: string }[], string>({
                query: (name) => `category/${name}/all`
            }
        )
    }),
});

export const {
    useGetCategoriesQuery
} = categoryApi;
