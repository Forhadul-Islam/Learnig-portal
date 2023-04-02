import apiSlice from "../api/apiSlice";

const assignmentMarkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get all assignment mark
    getAssignmentMark: builder.query({
      query: () => "/assignmentMark",
    }),

    //get assignment by st_id and ass_id
    getAssignmentMarkByAssignmentIdAndStudentId: builder.query({
      query: ({ assignment_id, student_id }) =>
        `/assignmentMark?assignment_id=${assignment_id}&student_id=${student_id}`,
    }),

    //admin will update assignment mark
    updateAssignmentMark: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignmentMark/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    //assignment submitted by student
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
  useGetAssignmentMarkQuery,
  useSubmitAssignmentMutation,
  useUpdateAssignmentMarkMutation,
  useGetAssignmentMarkByAssignmentIdAndStudentIdQuery,
} = assignmentMarkApi;
