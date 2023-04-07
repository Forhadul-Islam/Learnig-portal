import apiSlice from "../api/apiSlice";

const quizzesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizzes: builder.query({
      query: () => `/quizzes`,
    }),
    getQuizById: builder.query({
      query: (quizId) => `/quizzes/${quizId}`,
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
      query: ({ quizId, data }) => ({
        url: `/quizzes/${quizId}`,
        method: "PUT",
        body: data,
      }),
      async onQueryStarted({ quizId }, { queryFulfilled, dispatch }) {
        try {
          const { data: updatedQuiz } = await queryFulfilled;
          if (updatedQuiz?.id) {
            //update all quizzes catch
            dispatch(
              apiSlice.util.updateQueryData(
                "getQuizzes",
                undefined,
                (draft) => {
                  return draft.map((q) => {
                    if (q.id == quizId) {
                      return updatedQuiz;
                    } else return q;
                  });
                }
              )
            );
          }

          //update single quiz catch by id
          dispatch(
            apiSlice.util.updateQueryData("getQuizById", quizId, (draft) => {
              return updatedQuiz;
            })
          );
        } catch (err) {}
      },
    }),
    deleteQuiz: builder.mutation({
      query: (id) => ({
        url: `/quizzes/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        //optimistic update
        const pathchResutl = dispatch(
          apiSlice.util.updateQueryData("getQuizzes", undefined, (draft) =>
            draft.filter((d) => d.id.toString() != arg)
          )
        );

        try {
          await queryFulfilled;
        } catch (err) {
          pathchResutl.undo();
        }
      },
    }),
  }),
});

export const {
  useGetQuizzesQuery,
  useGetQuizByIdQuery,
  useGetQuizzesByVideoIdQuery,
  useAddQuizMutation,
  useUpdateQuizMutation,
  useDeleteQuizMutation,
} = quizzesApi;
