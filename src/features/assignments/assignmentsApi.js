import apiSlice from "../api/apiSlice";

const assignmentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignments: builder.query({
      query: () => "/assignments",
    }),
    getAssignmentById: builder.query({
      query: (id) => `/assignments/${id}`,
    }),
    getAssignmentByVideoId: builder.query({
      query: (videoId) => `/assignments?video_id=${videoId}`,
    }),
    addAssignment: builder.mutation({
      query: (data) => ({
        url: "/assignments",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data: video } = await queryFulfilled;
          if (video?.id) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getAssignments",
                undefined,
                (draft) => {
                  draft.push(video);
                }
              )
            );
          }
        } catch (err) {}
      },
    }),
    updateAssignment: builder.mutation({
      query: ({ assignmentId, data }) => ({
        url: `/assignments/${assignmentId}`,
        method: "PUT",
        body: data,
      }),
      async onQueryStarted({ assignmentId }, { queryFulfilled, dispatch }) {
        try {
          const { data: updatedAssignment } = await queryFulfilled;
          if (updatedAssignment?.id) {
            //update all videos catch
            dispatch(
              apiSlice.util.updateQueryData(
                "getAssignments",
                undefined,
                (draft) => {
                  return draft.map((a) => {
                    if (a.id == assignmentId) {
                      return updatedAssignment;
                    } else return a;
                  });
                }
              )
            );
          }

          //update single video catch by id
          dispatch(
            apiSlice.util.updateQueryData(
              "getAssignmentById",
              assignmentId,
              (draft) => {
                return updatedAssignment;
              }
            )
          );
        } catch (err) {}
      },
    }),
    deleteAssignment: builder.mutation({
      query: (id) => ({
        url: `/assignments/${id}`,
        method: "DELETE",
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const pathchResutl = dispatch(
          apiSlice.util.updateQueryData("getAssignments", undefined, (draft) =>
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
  useGetAssignmentsQuery,
  useGetAssignmentByIdQuery,
  useGetAssignmentByVideoIdQuery,
  useAddAssignmentMutation,
  useUpdateAssignmentMutation,
  useDeleteAssignmentMutation,
} = assignmentsApi;
