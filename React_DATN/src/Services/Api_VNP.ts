import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { pause } from "../utils/pause";

const vnpApi = createApi({
  reducerPath: "VNP",
  tagTypes: ["VNP"],
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:8080`,
    headers: {
      
    },
    fetchFn: async (...args) => (
      await pause(1000),
      fetch(...args)
    )
  }),
  endpoints: (builder) => ({
    vnpay_ipn: builder.query({
      query: () => `/api/vnpay_ipn`,
      providesTags: ["VNP"]
    }),

    vnpay_return: builder.query({
      query: () => `/api/vnpay_return`,
      providesTags: ["VNP"]
    }),

    createPayment: builder.mutation({
      query: (vnp) => ({
        url: `/api/create_payment_url`,
        method: "POST",
        body: vnp,
      }),
      invalidatesTags: ["VNP"]
    }),
  }),
});

export const {
    useCreatePaymentMutation, useVnpay_ipnQuery, useVnpay_returnQuery
} = vnpApi;
export default vnpApi;