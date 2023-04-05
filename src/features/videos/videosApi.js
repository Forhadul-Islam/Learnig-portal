import apiSlice from "../api/apiSlice";

const videosApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => "/videos",
    }),
    getVideoById: builder.query({
      query: (id) => `/videos/${id}`,
    }),
    addVideo: builder.mutation({
      query: (data) => ({
        url: "/videos",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { video } = await queryFulfilled;
          if (video) {
            apiSlice.util.updateQueryData("getVideos", undefined, (draft) =>
              draft.push(video)
            );
          }
        } catch (err) {}
      },
    }),
    updateVideo: builder.mutation({
      query: ({ data, videoId }) => ({
        url: `/videos/${videoId}`,
        method: "PUT",
        body: data,
      }),
      async onQueryStarted({ videoId }, { queryFulfilled, dispatch }) {
        try {
          const { data: updatedVideo } = await queryFulfilled;
          if (updatedVideo?.id) {
            //update all videos catch
            dispatch(
              apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
                return draft.map((video) => {
                  if (video.id == videoId) {
                    return updatedVideo;
                  } else return video;
                });
              })
            );
          }

          //update single video catch by id
          dispatch(
            apiSlice.util.updateQueryData("getVideoById", videoId, (draft) => {
              return updatedVideo;
            })
          );
        } catch (err) {}
      },
    }),
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const pathchResutl = dispatch(
          apiSlice.util.updateQueryData("getVideos", undefined, (draft) =>
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
  useGetVideosQuery,
  useGetVideoByIdQuery,
  useAddVideoMutation,
  useUpdateVideoMutation,
  useDeleteVideoMutation,
} = videosApi;
