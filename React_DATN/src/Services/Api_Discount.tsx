import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { IDiscount } from "../Models/interfaces"

const discountApi = createApi({
  reducerPath: "discountApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",
  }),
  tagTypes: ["Discount"],
  endpoints: (builder) => ({
    getDiscounts: builder.query<IDiscount[], void>({
      query: () => "/api/discount",
      providesTags: ["Discount"],
    }),
    getOneDiscount: builder.query({
      query: (id) => `/api/discount/${id}`,
      providesTags: ["Discount"],
    }),
    createDiscount: builder.mutation({
      query: (discount: IDiscount) => ({
        url: "/api/discount",
        method: "POST",
        body: discount,
      }),
      invalidatesTags: ["Discount"],
    }),
    removeDiscount: builder.mutation({
      query: (id) => ({
        url: `/api/discount/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Discount"],
    }),
    updateDiscount: builder.mutation({
      query: (discount: IDiscount) => ({
        url: `/api/discount/${discount._id}`,
        method: "PATCH",
        body: discount,
      }),
      invalidatesTags: ["Discount"],
    }),
  }),
})

export const {
  useGetDiscountsQuery,
  useGetOneDiscountQuery,
  useCreateDiscountMutation,
  useRemoveDiscountMutation,
  useUpdateDiscountMutation,
} = discountApi

export default discountApi
