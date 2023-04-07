import React from "react";
import AssignmentMarkTable from "../../components/admin/assignment-mark/AssignmentMarkTable";
import { useGetAssignmentMarkQuery } from "../../features/assignment-mark/assignmentMarkApi";

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
  return (
    <>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <ul className="assignment-status">
              <li>
                Total <span>{total}</span>
              </li>
              <li>
                Pending <span>{pending}</span>
              </li>
              <li>
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
