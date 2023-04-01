import apiSlice from "../api/apiSlice";

const assignmentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignmentByVideoId: builder.query({
      query: (videoId) => `/assignments?video_id=${videoId}`,
    }),
  }),
});

export const { useGetAssignmentByVideoIdQuery } = assignmentsApi;
