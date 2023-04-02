import apiSlice from "../api/apiSlice";

const assignmentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignments: builder.query({
      query: () => "/assignments",
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
    }),
    updateAssignment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignments/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteAssignment: builder.mutation({
      query: (id) => ({
        url: `/assignments/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAssignmentsQuery,
  useGetAssignmentByVideoIdQuery,
  useAddAssignmentMutation,
  useUpdateAssignmentMutation,
  useDeleteAssignmentMutation,
} = assignmentsApi;
