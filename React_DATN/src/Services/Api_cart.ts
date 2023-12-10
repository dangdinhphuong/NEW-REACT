import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductItem } from "../Models/interfaces";
import { pause } from "../utils/pause";

const cartApi = createApi({
    reducerPath: "cart",
    tagTypes: ["Cart"],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080",
        prepareHeaders: (headers) => {
            headers.set("Content-Type", "application/json");
            const token = localStorage.getItem("token") || "";
            if (token) {
                headers.set("Authorization", `Bearer ${JSON.parse(token)}`);
            }
            return headers;
        },
        fetchFn: async (...args) => (
            await pause(1000),
            fetch(...args)
        )
    }),
    endpoints: (builder) => ({
        getCart: builder.query<any,void>({
            query: () => "/api/cart",
            providesTags: ["Cart"]
        }),

        addToCart: builder.mutation<ProductItem,ProductItem>({
            query: (product) => ({
                url: "/api/cart",
                method: "POST",
                body: product
            }),
            invalidatesTags: ["Cart"]

        }),

        deleteFromCart: builder.mutation<void, string>({
            query: (productId) => ({
                url: `/api/cart/${productId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Cart"]

        }),

        updateMinus: builder.mutation({
            query: (product) => ({
                url: "/api/cart/update-minus",
                method: "POST",
                body: product
            }),
            invalidatesTags: ["Cart"]
        }),

        updateIncrease: builder.mutation({
            query: (product) => ({
                url: "/api/cart/update-increase",
                method: "POST",
                body: product
            }),
            invalidatesTags: ["Cart"]
        })
    }),
});

export const { useGetCartQuery, useAddToCartMutation, useDeleteFromCartMutation,useUpdateMinusMutation, useUpdateIncreaseMutation } = cartApi;
export default cartApi;