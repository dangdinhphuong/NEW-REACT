import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { INewSletter } from "../Models/interfaces"
import { pause } from "../utils/pause"

const newSletterApi = createApi({
  reducerPath: "newSletterApi",
  tagTypes: ["newSletter"],
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:8080`,
    fetchFn: async (...args) => (await pause(1000), fetch(...args)),
  }),
  endpoints: (builder) => ({
    getAllNewSletter: builder.query({
      query: () => `/api/newSletter`,
      providesTags: ["newSletter"],
    }),
    getNewSletter: builder.query({
      query: (id) => `/api/newSletter/${id}`,
      providesTags: ["newSletter"],
    }),
    createNewSletter: builder.mutation<INewSletter, INewSletter>({
      query: (newSletter) => ({
        url: `/api/newSletter`,
        method: "POST",
        body: newSletter,
      }),
      invalidatesTags: ["newSletter"],
    }),
  }),
})

export const {
  useGetAllNewSletterQuery,
  useGetNewSletterQuery,
  useCreateNewSletterMutation,
} = newSletterApi

export default newSletterApi
