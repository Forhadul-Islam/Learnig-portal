import React from "react";
import Navbar from "../../components/navbar/Navbar";
import { useGetVideosQuery } from "../../features/videos/videosApi";
import { Link } from "react-router-dom";
import Loader from "../../components/ui/Loader";
import VideosListTable from "../../components/admin/videos/videosListTable";

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
  if (isLoading)
    content = (
      <div className="flex justify-center  mt-10">
        <Loader />
      </div>
    );
  if (isError && error?.data) content = <div>Something wrong!</div>;
  if (isSuccess && videos.length === 0)
    content = (
      <div className="bg-gray-800 text-center mt-10 py-4 h-32 ">
        Yet no videos are added.
        <Link
          to="/admin/videos/create"
          state={{ title: "Add Video" }}
          className="block mx-auto bg-blue-700 px-2 rounded-full w-28 mt-3"
        >
          Add Video
        </Link>
      </div>
    );
  if (isSuccess && videos.length > 0)
    content = <VideosListTable videos={videos} />;
  return (
    <div>
      <section className=" py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <div className="w-full flex">
              <Link
                to={"/admin/videos/create"}
                state={{ title: "Add New Video" }}
                className="btn ml-auto"
              >
                Add Video
              </Link>
            </div>
            <div className="overflow-x-auto mt-4">{content}</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Videos;
