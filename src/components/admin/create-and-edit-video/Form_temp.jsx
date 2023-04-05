import { useState } from "react";
import TextInput from "../../ui/input/TextInput";
import TextArea from "../../ui/input/TextArea";
// import Error from "../ui/Error";
// import Success from "../ui/Success";

export default function Form() {
  //   const [addVideo, { isLoading, isSuccess, isError }] = useAddVideoMutation();

  //input states
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");
  const [views, setViews] = useState("");

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setAuthor("");
    setLink("");
    setThumbnail("");
    setDate("");
    setDuration("");
    setViews("");
  };

  const handleCreateVideo = (e) => {
    e.preventDefault();
    const data = {
      title,
      description,
      author,
      link,
      thumbnail,
      date,
      duration,
      views,
    };
    console.log(data);
  };

  return (
    <form onSubmit={handleCreateVideo}>
      <div className="shadow overflow-hidden  sm:rounded-md">
        <div className="px-4 py-5 bg-primary sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <TextInput
                title="Video Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <TextInput
                title="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>

            <div className="col-span-6">
              <TextArea
                title="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="col-span-6">
              <TextInput
                title="YouTube Video link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>

            <div className="col-span-6">
              <TextInput
                title="Thumbnail link"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
              />
            </div>

            <div className="col-span-6 sm:col-span-6 lg:col-span-2">
              <TextInput
                title="Upload Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <TextInput
                title="Video Duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>

            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <TextInput
                title="Video no of views"
                value={views}
                onChange={(e) => setViews(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-primary text-right sm:px-6">
          <button
            // disabled={true}
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500"
          >
            Create
          </button>
        </div>

        {/* {isSuccess && <Success message="Video was added successfully" />}
        {isError && <Error message="There was an error adding video!" />} */}
      </div>
    </form>
  );
}
