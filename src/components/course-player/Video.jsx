import React from "react";
import Player from "./Player";
import VideoDetails from "./VideoDetails";

const Video = () => {
  return (
    <div className="col-span-full w-full space-y-8 lg:col-span-2">
      <Player />

      <VideoDetails />
    </div>
  );
};

export default Video;
