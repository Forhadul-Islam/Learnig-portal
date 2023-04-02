import React from "react";
import Form from "../../components/admin/create-and-edit-video/Form";
import { useLocation } from "react-router-dom";

const CreateAndEditVideo = () => {
  const location = useLocation();
  console.log(location);
  return (
    <div className=" p-4 mx-8 px-5 bg-primary lg:px-0">
      <div className="w-full">
        <div className=" mx-6 p-2 px-4 bg-violet-900 rounded-lg sm:px-0 pb-4">
          <h3 className="px-2 text-lg font-medium leading-6 text-gray-100">
            {location?.state?.title
              ? location?.state?.title
              : "Your Video Creation"}
          </h3>
          <p className="px-2 mt-1 text-sm text-gray-100">
            Please fillup the form to add new video
          </p>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <Form />
        </div>
      </div>
    </div>
  );
};

export default CreateAndEditVideo;
