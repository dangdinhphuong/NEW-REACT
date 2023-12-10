import { pause } from "../utils/pause";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IProduct } from "../Models/interfaces";

const productApi = createApi({
  reducerPath: "products",
  tagTypes: ["Product"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    fetchFn: async (...args) => {
      await pause(1000);
      return fetch(...args);
    },
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<IProduct, void>({
      query: () => `products`,
      providesTags: ["Product"],
    }),
    getProductById: builder.query<IProduct, number>({
      query: (id) => `products/${id}`,
      providesTags: ["Product"],
    }),
    addProduct: builder.mutation<IProduct, IProduct>({
      query: (product) => ({
        url: "products",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),
    removeProduct: builder.mutation<void, number | string>({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation<IProduct, IProduct>({
      query: (product) => ({
        url: `products/${product._id}`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetProductByIdQuery,
  useGetProductsQuery,
  useRemoveProductMutation,
  useUpdateProductMutation,
} = productApi;

export const productReducer = productApi.reducer;

export default productApi;
