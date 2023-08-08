import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Product, ProductDetails} from "~/interfaces/models";

export const productApi = createApi({
    reducerPath: "productApi",
    refetchOnFocus: true,
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.API_URL,
    }),
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], { category: string }>({
                query: ({category}) => `product/${category}/all`
            }
        ),
        getProductById: builder.query<ProductDetails, { id: number }>({
            query: ({id}) => `product/${id}`,
        })
    }),
});

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
} = productApi;
