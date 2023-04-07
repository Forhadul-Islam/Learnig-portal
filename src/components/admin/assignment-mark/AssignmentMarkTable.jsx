import React from "react";
import AssignmentMarkTableRow from "./AssignmentMarkTableRow";
import { useGetAssignmentMarkQuery } from "../../../features/assignment-mark/assignmentMarkApi";

const AssignmentMarkTable = () => {
  const {
    data: assignmentMarks,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetAssignmentMarkQuery();

  //renderable content
  let content = null;
  if (isSuccess && assignmentMarks?.length === 0)
    content = <div>No assignment Mark found!</div>;
  if (isSuccess && assignmentMarks?.length > 0)
    content = assignmentMarks.map((mark) => (
      <AssignmentMarkTableRow key={mark.id} mark={mark} />
    ));

  if (isLoading) return <div>Loading...</div>;
  return (
    <table className="divide-y-1 text-base divide-gray-600 w-full">
      <thead>
        <tr>
          <th className="table-th">Assignment</th>
          <th className="table-th">Date</th>
          <th className="table-th">Student Name</th>
          <th className="table-th">Repo Link</th>
          <th className="table-th">Mark</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-slate-600/50">
        <tr>
          <td className="table-td">
            Assignment 1 - Implement Debounce Function
          </td>
          <td className="table-td">10 Mar 2023 10:58:13 PM</td>
          <td className="table-td">Saad Hasan</td>
          <td className="table-td">
            https://github.com/Learn-with-Sumit/assignment-1
          </td>
          <td className="table-td input-mark">
            <input max="100" value="100" />
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </td>
        </tr>
        {content}
      </tbody>
    </table>
  );
};

export default AssignmentMarkTable;
