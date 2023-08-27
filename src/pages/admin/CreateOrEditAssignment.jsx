import React from "react";
import AssignmentForm from "../../components/admin/create-or-edit-assignment/AssignmentForm";
import { useLocation } from "react-router-dom";
import Gradient from "../../components/ui/Gradient";

const CreateOrEditAssignment = ({ mode }) => {
  const { state } = useLocation();

  return (
    <>
      <Gradient />
      <div className=" w-5/6 mx-auto mt-4 p-4  px-5 bg-form-gradient min-h-screen lg:px-0">
        <div className="w-full">
          <div className=" mx-6 p-2 px-4 bg-indigo-600 rounded-lg sm:px-0 pb-4">
            <h3 className="px-2 text-lg font-medium leading-6 text-gray-100">
              {state?.title ? state?.title : "Create Or Edit Your Video"}
            </h3>
            <p className="px-2 mt-1 text-sm text-gray-100">
              Please fillup the form to{" "}
              {state?.title ? state?.title : "Create Or Edit Your Video"}
            </p>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <AssignmentForm mode={mode} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateOrEditAssignment;
