import React from "react";
import Navbar from "../../components/navbar/Navbar";
import AssignmentTable from "../../components/admin/assignment/AssignmentTable";
import { Link } from "react-router-dom";
import Gradient from "../../components/ui/Gradient";

const Assignment = () => {
  return (
    <>
      <Gradient />
      <section className="py-6 bg-form-gradient min-h-screen">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <div className="w-full flex border-b bg-indigo-600 p-4 rounded-full ">
              <h3 className="text-white text-lg"> 📑 Create new assignment</h3>
              <Link
                to="/admin/assignment/create"
                state={{ title: "Add Assignment" }}
                className="black_btn bg-indigo-700 hover:bg-indigo-800 text-white ml-auto"
              >
                <span className="mr-2"> + </span> Add Assignment
              </Link>
            </div>
            <div className="overflow-x-auto mt-4">
              <AssignmentTable />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Assignment;
