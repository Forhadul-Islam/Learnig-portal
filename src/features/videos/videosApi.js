import apiSlice from "../api/apiSlice";

const videosApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => "/videos",
    }),
    getVideoById: builder.query({
      query: (id) => `/videos/${id}`,
    }),
    addVideo: builder.mutation({
      query: (data) => ({
        url: "/videos",
        method: "POST",
        body: data,
      }),
    }),
    updateVideo: builder.mutation({
      query: ({ data, id }) => ({
        url: `/videos/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetVideosQuery,
  useGetVideoByIdQuery,
  useAddVideoMutation,
  useUpdateVideoMutation,
  useDeleteVideoMutation,
} = videosApi;
