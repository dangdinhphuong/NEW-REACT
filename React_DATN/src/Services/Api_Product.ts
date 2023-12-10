import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProduct } from "../Models/interfaces";
import { pause } from "../utils/pause";

const productApi = createApi({
  reducerPath: "products",
  tagTypes: ["Product"],
  baseQuery: fetchBaseQuery({
    // baseUrl: `https://server-node-api-bd6916c462f7.herokuapp.com`,
    baseUrl: "http://localhost:8080",
    fetchFn: async (...args) => (
      await pause(1000),
      fetch(...args)
    )
  }),
  endpoints: (builder) => ({
    getAllProduct: builder.query<IProduct[], void>({
      query: () => `/api/products`,
      providesTags: ["Product"]
    }),

    getOneProduct: builder.query<IProduct, number | string>({
      query: (id) => `/api/product/${id}`,
      providesTags: ["Product"]
    }),

    addProduct: builder.mutation<IProduct, IProduct>({
      query: (product) => ({
        url: `/api/product`,
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Product"]
    }),

    addProductDetails: builder.mutation({
      query: (product) => ({
        url: `/api/product/${product._id}/variants`,
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Product"]
    }),

    // Xóa sản phẩm tạm thời
    deleteProduct: builder.mutation<void, number | string>({
      query: (id) => ({
        url: `/api/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"]
    }),

    // Xóa sản phẩm tạm thời Variant
    deleteVariant: builder.mutation<void, any>({
      query: (product) => ({
        url: `/api/product/variant/delete`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: ["Product"]
    }),

    updateProduct: builder.mutation<IProduct, IProduct>({
      query: (product) => ({
        url: `/api/product/${product._id}`,
        method: "PATCH",
        body: product
      }),
      invalidatesTags: ["Product"]
    }),

    //API in ra tất cả sản phẩm xóa tạm thời
    getAllDeletedProducts: builder.query<IProduct[], void>({
      query: () => `/api/restore-product-data`,
      providesTags: ["Product"]
    }),

    // API khôi phục sản phẩm
    restoreProduct: builder.mutation({
      query: (id) => ({
        url: `/api/product/restore/${id}`,
        method: "PUT"
      }),
      invalidatesTags: ["Product"]
    }),
    //Lấy ra các sản phẩm HOT
    getHotProducts: builder.query<IProduct[], void>({
      query: () => `/api/hot-product`,
      providesTags: ["Product"]
    }),

    //API Xóa sản phẩm vĩnh viễn
    removeProduct: builder.mutation({
      query: (id) => ({
        url: `/api/product/${id}/delete`,
        method: "DELETE"
      }),
      invalidatesTags: ["Product"]
    })
  })
});

export const {
  useAddProductDetailsMutation,
  useGetAllProductQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useDeleteVariantMutation,
  useGetOneProductQuery,
  useUpdateProductMutation,
  useGetAllDeletedProductsQuery,
  useRestoreProductMutation,
  useRemoveProductMutation,
  useGetHotProductsQuery
} = productApi;
export default productApi;
