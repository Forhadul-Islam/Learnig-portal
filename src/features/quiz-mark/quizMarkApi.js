import apiSlice from "../api/apiSlice";

const quizMarkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizMarksByStudentAndVideoId: builder.query({
      query: ({ video_id, student_id }) =>
        `/quizMark?video_id=${video_id}&student_id=${student_id}`,
    }),
    submitQuiz: builder.mutation({
      query: (data) => ({
        url: `/quizMark`,
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data: submittedQuiz } = await queryFulfilled;
          const queryArg = {
            video_id: submittedQuiz.video_id,
            student_id: submittedQuiz.student_id,
          };
          dispatch(
            apiSlice.util.updateQueryData(
              "getQuizMarksByStudentAndVideoId",
              queryArg,
              (draft) => {
                console.log(JSON.stringify(draft));
                draft.push(submittedQuiz);
                console.log(JSON.stringify(draft));
              }
            )
          );
        } catch (err) {}
      },
    }),
  }),
});

export const {
  useGetQuizMarksByStudentAndVideoIdQuery,
  useSubmitQuizMutation,
} = quizMarkApi;
