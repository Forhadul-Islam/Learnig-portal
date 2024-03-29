import React from "react";
import AssignmentMarkTable from "../../components/admin/assignment-mark/AssignmentMarkTable";
import { useGetAssignmentMarkQuery } from "../../features/assignment-mark/assignmentMarkApi";
import Error from "../../components/ui/Error";
import Gradient from "../../components/ui/Gradient";

const AssignmentMark = () => {
  //get assignment marks
  const {
    data: assignmentMarks,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetAssignmentMarkQuery();

  // Assignment tags
  let total = null;
  let pending = null;
  let markSent = null;

  total = assignmentMarks?.length;
  markSent = assignmentMarks?.filter((a) => a.status == "published").length;
  pending = total - markSent;
  console.log({ total, pending, markSent });

  //renderable content
  let content = null;
  if (isSuccess && assignmentMarks?.length === 0)
    content = <div>No assignment Mark found!</div>;
  if (isSuccess && assignmentMarks?.length > 0)
    content = <AssignmentMarkTable assignmentMarks={assignmentMarks} />;

  if (isLoading) return <div>Loading...</div>;
  // if (!isError) return <Error message="Sorry! Couldn't load data." />;
  return (
    <>
      <Gradient />
      <section className="py-6 min-h-screen">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <ul className="assignment-status">
              <li className="text-black">
                Total <span>{total}</span>
              </li>
              <li className="text-black">
                Pending <span>{pending}</span>
              </li>
              <li className="text-black">
                Mark Sent <span>{markSent}</span>
              </li>
            </ul>
            <div className="overflow-x-auto mt-4">{content}</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AssignmentMark;
