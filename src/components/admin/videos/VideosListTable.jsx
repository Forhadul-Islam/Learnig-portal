import React from "react";
import VideosListItemTableRow from "./VideoTableRow";
import { useGetVideosQuery } from "../../../features/videos/videosApi";

const VideosListTable = ({ Children }) => {
  const {
    data: videos,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetVideosQuery();

  //decide what to render
  let content = null;
  if (isLoading) content = <div>Loading...</div>;
  if (isError && error?.data) content = <div>Something wrong!</div>;
  if (isSuccess && videos.length === 0)
    content = <div>Yet no videos are added.</div>;
  if (isSuccess && videos?.length > 0)
    content = (
      <tbody className="divide-y divide-slate-600/50 ">
        {videos.map((video) => (
          <VideosListItemTableRow key={video.id} video={video} />
        ))}
      </tbody>
    );
  return (
    <table className="divide-y-1  text-base divide-gray-600 w-full ">
      <thead>
        <tr>
          <th className="table-th">Video Title</th>
          <th className="table-th">Description</th>
          <th className="table-th">Action</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-600/50 ">{Children}</tbody>
    </table>
  );
};

export default VideosListTable;
