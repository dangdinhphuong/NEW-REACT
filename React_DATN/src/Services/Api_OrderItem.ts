import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IOrder } from "../Models/interfaces";

const orderItemApi = createApi({
  reducerPath: "orderItem",
  tagTypes: ["OrderItem"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",
  }),
  endpoints: (builder) => ({
    getOrder: builder.query<any, void>({
      query: () => `/api/orderItem`,
      providesTags: ["OrderItem"]
    }),

    addOrderItem: builder.mutation<any, any>({
      query: (order) => ({
        url: `/api/orderItem`,
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["OrderItem"]
    }),

    // updateOrder: builder.mutation<IOrder, IOrder>({
    //   query: (order:IOrder) => ({
    //     url: `/api/order/${order._id}`,
    //     method: "PUT",
    //     body: order,
    //   }),
    //   invalidatesTags: ["Order"]
    // }),

    // updatePatchOrder: builder.mutation<any, any>({
    //   query: (order:any) => ({
    //     url: `/api/order/${order._id}`,
    //     method: "PATCH",
    //     body: order,
    //   }),
    //   invalidatesTags: ["Order"]
    // }),

    
  }),
});

export const {
  useAddOrderItemMutation,
  useGetOrderQuery
} = orderItemApi;
export default orderItemApi;