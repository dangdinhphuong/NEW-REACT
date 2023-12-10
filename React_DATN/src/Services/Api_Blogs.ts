import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IBlog } from "../Models/interfaces";
import { pause } from "../utils/pause";

const blogApi = createApi({
    reducerPath: "blogs",
    tagTypes: ["Blogs"],
    baseQuery: fetchBaseQuery({
        baseUrl: `http://localhost:8080`,
        fetchFn: async (...args) => (
            await pause(1000),
            fetch(...args)
        )
    }),
    endpoints: (builder) => ({
        getAllBlogs: builder.query<IBlog[], void>({
            query: () => `/api/blogs`,
            providesTags: ["Blogs"]
        }),

        getOneBlog: builder.query<IBlog, number | string>({
            query: (_id) => `/api/blogs/${_id}`,
            providesTags: ["Blogs"]
        }),

        addBlog: builder.mutation<IBlog, IBlog>({
            query: (blogs) => ({
                url: `/api/blogs`,
                method: "POST",
                body: blogs,
            }),
            invalidatesTags: ["Blogs"]
        }),

        deleteBlog: builder.mutation<void, number | string>({
            query: (id) => ({
                url: `/api/blogs/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Blogs"]
        }),

        updateBlog: builder.mutation<IBlog, IBlog>({
            query: (blogs) => ({
                url: `/api/blogs/${blogs._id}`,
                method: "PATCH",
                body: blogs,
            }),
            invalidatesTags: ["Blogs"]
        })
    }),
});

export const {
    useGetAllBlogsQuery,
    useAddBlogMutation,
    useDeleteBlogMutation,
    useGetOneBlogQuery,
    useUpdateBlogMutation
} = blogApi;
export default blogApi;
