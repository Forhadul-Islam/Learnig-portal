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
    <div className="min-h-full">
      <section className=" py-6 bg-form-gradient">
        <div className="mx-auto max-w-full px-5 lg:px-20 b">
          <div className="px-3 py-20 bg-opacity-10">
            <div className="w-full flex border-b bg-indigo-600 p-4 rounded-full ">
              <h3 className="text-white text-lg">
                {" "}
                🔥 Create a new Video lesson !
              </h3>
              <Link
                to={"/admin/videos/create"}
                state={{ title: "Add New Video" }}
                className="black_btn bg-indigo-700 hover:bg-indigo-800 text-white ml-auto"
              >
                <span className="mr-2"> + </span> Add Video
              </Link>
            </div>
            <div className="overflow-x-auto mt-4 text-black">{content}</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Videos;
