import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "../Models/interfaces";
import { pause } from "../utils/pause";

const userApi = createApi({
  reducerPath: "user",
  tagTypes: ["User"],
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
    getAllUser: builder.query<IUser[], void>({
      query: () => `/api/allUser`,
      providesTags: ["User"]
    }),

    getOneUser: builder.query<IUser, number | string>({
      query: (_id) => `/api/oneUser/${_id}`,
      providesTags: ["User"]
    }),

    addUser: builder.mutation<IUser, IUser>({
      query: (user) => ({
        url: `/api/addUser`,
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"]
    }),

    updateUser: builder.mutation<IUser, IUser>({
      query: (user) => ({
        url: `/api/updateUser/${user._id}`,
        method: "PATCH",
        body: user,
      }),
      invalidatesTags: ["User"]
    }),

    removeUser: builder.mutation<IUser, number | string>({
      query: (_id) => ({
        url: `/api/removeUser/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"]
    }),

    sigin: builder.mutation<IUser, IUser>({
      query: (user) => ({
        url: `/api/signin`,
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"]
    }),

    signup: builder.mutation<IUser, IUser>({
      query: (user) => ({
        url: `/api/signup`,
        method: "POST",
        body: user
      }),
      invalidatesTags: ["User"]
    }),

    forgotPassword: builder.mutation({
      query: (data) => ({
        url: `/api/forgot-password`,
        method: "POST",
        body: data
      }),
      invalidatesTags: ["User"]
    }),

    verificationCodes: builder.mutation({
      query: (code) => ({
        url: "/api/verification-codes",
        method: "POST",
        body: code
      }),
      invalidatesTags: ["User"]
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: "/api/change-password",
        method: "POST",
        body: data
      })
    })
  }),
});

export const {
  useGetAllUserQuery,
  useSiginMutation,
  useSignupMutation,
  useForgotPasswordMutation,
  useVerificationCodesMutation,
  useChangePasswordMutation,
  useAddUserMutation,
  useUpdateUserMutation,
  useRemoveUserMutation,
  useGetOneUserQuery
} = userApi;
export default userApi;