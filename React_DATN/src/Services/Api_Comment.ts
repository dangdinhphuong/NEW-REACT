import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const commentApi = createApi({
  reducerPath: "comments",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:8080`,
  }),
  endpoints: (builder) => ({
    createComment: builder.mutation({
      query: (comment) => ({
        url: "/api/comments",
        method: "POST",
        body: comment,
      }),
    }),
    getAllComments: builder.query({
      query: () => `/api/comments`,
    }),
    getCommentsByProductId: builder.query({
      query: (productId) => `/api/comments/${productId}`,
    }),
    deleteCommentByAdmin: builder.mutation({
      query: (commentId) => ({
        url: `/api/comments/${commentId}`,
        method: "DELETE",
      }),
    }),
    updateCommentById: builder.mutation({
      query: ({ id, content, userId }) => ({
        url: `/api/comments/${id}`,
        method: "PUT",
        body: { content, userId },
      }),
    }),
    deleteCommentByIdUser: builder.mutation({
      query: (id) => ({
        url: `/api/comments/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useCreateCommentMutation, useGetCommentsByProductIdQuery, useDeleteCommentByAdminMutation, useUpdateCommentByIdMutation, useDeleteCommentByIdUserMutation, useGetAllCommentsQuery} = commentApi;
export default commentApi;