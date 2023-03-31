import React from "react";
import { useGetVideosQuery } from "../../features/videos/videosApi";
import VideoItemSkeleton from "../ui/skeleton/VideoItemSkeleton";
import VideoLIstItem from "./VideoLIstItem";

const VideoList = () => {
  const { data: videos, isFetching, isError, isSuccess } = useGetVideosQuery();

  //decide what to render
  let content = null;
  if (isFetching) content = <VideoItemSkeleton show={7} />;
  if (isSuccess && videos?.length == 0) content = <div>0 Videos found!</div>;
  if (isSuccess && videos?.length > 0)
    content = videos?.map((video) => (
      <VideoLIstItem key={video.id} video={video} />
    ));

  return (
    <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30">
      {/* <VideoLIstItem /> */}
      {content}
    </div>
  );
};

export default VideoList;
