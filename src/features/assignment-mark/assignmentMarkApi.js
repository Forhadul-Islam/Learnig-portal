import apiSlice from "../api/apiSlice";

const assignmentMarkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllAssignmentMark: builder.query({
      query: () => "/assignmentMark",
    }),
    getAssignmentMarkByVideoAndStudentId: builder.query({
      query: ({ video_id, student_id }) =>
        `/assignmentMark?video_id=${video_id}&student_id=${student_id}`,
    }),
    getAssignmentMarkByAssignmentIdAndStudentId: builder.query({
      query: ({ assignment_id, student_id }) =>
        `/assignmentMark?assignment_id=${assignment_id}&student_id=${student_id}`,
    }),
    submitAssignment: builder.mutation({
      query: (data) => ({
        url: "/assignmentMark",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data: submittedAssignment } = await queryFulfilled;
          if (submittedAssignment?.id) {
            const queryArg = {
              student_id: submittedAssignment.student_id,
              assignment_id: submittedAssignment.assignment_id,
            };
            dispatch(
              apiSlice.util.updateQueryData(
                "getAssignmentMarkByAssignmentIdAndStudentId",
                queryArg,
                (draft) => {
                  draft.push(submittedAssignment);
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
  useGetAllAssignmentMarkQuery,
  useGetAssignmentMarkByVideoAndStudentIdQuery,
  useSubmitAssignmentMutation,
  useGetAssignmentMarkByAssignmentIdAndStudentIdQuery,
} = assignmentMarkApi;
