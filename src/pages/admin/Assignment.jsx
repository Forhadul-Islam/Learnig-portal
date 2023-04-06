import React from "react";
import Navbar from "../../components/navbar/Navbar";
import AssignmentTable from "../../components/admin/assignment/AssignmentTable";
import { Link } from "react-router-dom";

const Assignment = () => {
  return (
    <>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <div className="w-full flex">
              <Link
                to="/admin/assignment/create"
                state={{ title: "Add Assignment" }}
                className="btn ml-auto"
              >
                Add Assignment
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
