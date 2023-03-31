import apiSlice from "../api/apiSlice";

const assignmentMarkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizzesByVideoId: builder.query({
      query: () => "/",
    }),
  }),
});

export const { useGetQuizzesByVideoIdQuery } = assignmentMarkApi;
