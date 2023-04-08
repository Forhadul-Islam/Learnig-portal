import React from "react";
import VideoTableRow from "./VideoTableRow";

const VideosListTable = ({ videos }) => {
  const content = videos?.map((video) => {
    return <VideoTableRow key={video.id} video={video} />;
  });

  return (
    <table className=" divide-y-1 text-base divide-gray-600 w-full">
      <thead>
        <tr>
          <th className="table-th">Video Title</th>
          <th className="table-th">Description</th>
          <th className="table-th">Action</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-600/50">{content}</tbody>
    </table>
  );
};

export default VideosListTable;
