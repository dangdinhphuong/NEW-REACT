import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ISize } from "../Models/interfaces";
import { pause } from "../utils/pause";

const sizeApi = createApi({
  reducerPath: "size",
  tagTypes: ["Size"],
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:8080`,
    fetchFn: async (...args) => (
      await pause(1000),
      fetch(...args)
    )
  }),
  endpoints: (builder) => ({
    getAllSize: builder.query<ISize[], void>({
      query: () => `/api/size`,
      providesTags: ["Size"]
    }),

    getOneSize: builder.query<ISize, number | string>({
      query: (id) => `/api/size/${id}`,
      providesTags: ["Size"]
    }),

    addSize: builder.mutation<ISize, ISize>({
      query: (size) => ({
        url: `/api/size`,
        method: "POST",
        body: size,
      }),
      invalidatesTags: ["Size"]
    }),

    deleteSize: builder.mutation<void, number | string>({
      query: (id) => ({
        url: `/api/size/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Size"]
    }),

    updateSize: builder.mutation<ISize, ISize>({
      query: (size: ISize) => ({
        url: `/api/size/${size._id}`,
        method: "PATCH",
        body: size,
      }),
      invalidatesTags: ["Size"]
    }),
    //Lấy sản phẩm theo danh mục
    getProductsBySize: builder.query({
      query: (sizeId) => `/api/size/${sizeId}/products`,
    }),
  }),
});

export const { useAddSizeMutation, useDeleteSizeMutation, useGetAllSizeQuery, useGetOneSizeQuery, useUpdateSizeMutation, useGetProductsBySizeQuery } = sizeApi;
export default sizeApi;