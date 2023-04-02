import React from "react";
import Navbar from "../../components/navbar/Navbar";
import { useGetVideosQuery } from "../../features/videos/videosApi";
import VideoTableRow from "../../components/admin/videos/VideoTableRow";
import { Link } from "react-router-dom";

const Videos = () => {
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
  if (isSuccess && videos.length > 0)
    content = videos.map((video) => {
      return <VideoTableRow key={video.id} video={video} />;
    });
  return (
    <div>
      <section className=" py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <div className="w-full flex">
              <Link
                to={{
                  pathname: "/admin/videos/create",
                  state: { title: "Add New Video" },
                }}
                className="btn ml-auto"
              >
                Add Video
              </Link>
            </div>
            <div className="overflow-x-auto mt-4">
              <table className="divide-y-1 text-base divide-gray-600 w-full">
                <thead>
                  <tr>
                    <th className="table-th">Video Title</th>
                    <th className="table-th">Description</th>
                    <th className="table-th">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-600/50">
                  {content}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Videos;
