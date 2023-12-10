import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ISlider } from "../Models/interfaces";
import { pause } from "../utils/pause";

const slideApi = createApi({
  reducerPath: "slide",
  tagTypes: ["Slide"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",
    prepareHeaders(headers, api) {
      const token = localStorage.getItem("token")
      if (token) {
        headers.set("authorization", token)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    getAllSlide: builder.query<ISlider[], void>({
      query: () => `/api/slider`,
      providesTags: ["Slide"]
    }),

    getOneSlide: builder.query<ISlider[], number | string>({
      query: (_id) => `/api/slider/${_id}`,
      providesTags: ["Slide"]
    }),

    addSlide: builder.mutation<ISlider, ISlider>({
      query: (slide) => ({
        url: `/api/slider`,
        method: "POST",
        body: slide,
      }),
      invalidatesTags: ["Slide"]
    }),

    updateSlide: builder.mutation<ISlider, ISlider>({
      query: (slide:ISlider) => ({
        url: `/api/slider/${slide._id}`,
        method: "PUT",
        body: slide,
      }),
      invalidatesTags: ["Slide"]
    }),

    updatePatchSlide: builder.mutation<any, any>({
      query: (slide:any) => ({
        url: `/api/slider/${slide._id}`,
        method: "PATCH",
        body: slide,
      }),
      invalidatesTags: ["Slide"]
    }),

    removeSlide: builder.mutation<ISlider, number | string>({
      query: (_id) => ({
        url: `/api/slider/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Slide"]
    }),

    
  }),
});

export const {
  useGetAllSlideQuery,
  useAddSlideMutation,
  useUpdateSlideMutation,
  useRemoveSlideMutation,
  useGetOneSlideQuery,
  useUpdatePatchSlideMutation
} = slideApi;
export default slideApi;