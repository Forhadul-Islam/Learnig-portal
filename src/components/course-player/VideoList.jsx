import React from "react";
import VideoLIstItem from "./VideoLIstItem";

const VideoList = () => {
  return (
    <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30">
      <VideoLIstItem />
      <VideoLIstItem />
      <VideoLIstItem />
    </div>
  );
};

export default VideoList;
