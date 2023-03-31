import apiSlice from "../api/apiSlice";

const quizzesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizzesByVideoId: builder.query({
      query: (videoId) => `/quizzes?video_id=${videoId}`,
    }),
  }),
});

export const { useGetQuizzesByVideoIdQuery } = quizzesApi;
