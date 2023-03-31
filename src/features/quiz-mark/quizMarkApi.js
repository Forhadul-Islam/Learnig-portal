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
          const { data } = await queryFulfilled;
          if (data?.id) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getQuizMarksByStudentAndVideoId",
                { video_id: data?.video_id, student_id: data?.student_id },
                (draft) => {
                  console.log(JSON.stringify(draft));
                  draft.push(data);
                  console.log(JSON.stringify(draft));
                }
              )
            );
          }
        } catch (err) {}
      },
    }),
  }),
});

export const {
  useGetQuizMarksByStudentAndVideoIdQuery,
  useSubmitQuizMutation,
} = quizMarkApi;
