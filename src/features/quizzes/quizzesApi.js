import apiSlice from "../api/apiSlice";

const quizzesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizzes: builder.query({
      query: () => `/quizzes`,
    }),
    getQuizzesByVideoId: builder.query({
      query: (videoId) => `/quizzes?video_id=${videoId}`,
    }),
    addQuiz: builder.mutation({
      query: (data) => ({
        url: "/quizzes",
        method: "POST",
        body: data,
      }),
    }),
    updateQuiz: builder.mutation({
      query: ({ id, data }) => ({
        url: `/quizzes/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteQuiz: builder.mutation({
      query: (id) => ({
        url: `/quizzes/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetQuizzesQuery,
  useGetQuizzesByVideoIdQuery,
  useAddQuizMutation,
  useUpdateQuizMutation,
  useDeleteQuizMutation,
} = quizzesApi;
