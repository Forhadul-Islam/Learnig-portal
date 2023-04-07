import React from "react";
import Navbar from "../../components/navbar/Navbar";
import AssignmentMarkTable from "../../components/admin/assignment-mark/AssignmentMarkTable";

const AssignmentMark = () => {
  return (
    <>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <ul className="assignment-status">
              <li>
                Total <span>4</span>
              </li>
              <li>
                Pending <span>3</span>
              </li>
              <li>
                Mark Sent <span>1</span>
              </li>
            </ul>
            <div className="overflow-x-auto mt-4">
              <AssignmentMarkTable />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AssignmentMark;
