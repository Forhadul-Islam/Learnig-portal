import apiSlice from "../api/apiSlice";

const videosApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => "/videos",
    }),
    getVideoById: builder.query({
      query: (id) => `/videos/${id}`,
    }),
  }),
});

export const { useGetVideosQuery, useGetVideoByIdQuery } = videosApi;
