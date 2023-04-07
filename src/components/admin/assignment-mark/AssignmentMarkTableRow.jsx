import React, { useState } from "react";
import { useUpdateAssignmentMarkMutation } from "../../../features/assignment-mark/assignmentMarkApi";

const AssignmentMarkTableRow = ({ mark = {} }) => {
  const [result, setResult] = useState(0);
  const {
    id,
    title,
    createdAt,
    student_name,
    repo_link,
    mark: achivedMark,
    status,
  } = mark;

  //update assignment mark
  const [updateAssignmentMark, { isLoading, isSuccess, isError, error }] =
    useUpdateAssignmentMarkMutation();

  //handle submit mark
  const handleMarkSubmit = () => {
    // logic for submittin assignment amrk
    const data = {
      ...mark,
      status: "published",
      mark: result,
    };
    updateAssignmentMark({ data, assignmentMarkId: id });
  };
  return (
    <tr>
      <td className="table-td whitespace-normal">{title}</td>
      <td className="table-td whitespace-normal">{createdAt}</td>
      <td className="table-td whitespace-normal">{student_name}</td>
      <td className="table-td whitespace-normal">{repo_link}</td>
      {status == "published" ? (
        <td className="table-td">{achivedMark}</td>
      ) : (
        <td className="table-td input-mark">
          <input
            value={result}
            onChange={(e) => setResult(e.target.value)}
            max="100"
          />
          <button onClick={handleMarkSubmit}>
            {" "}
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
          </button>
        </td>
      )}
    </tr>
  );
};

export default AssignmentMarkTableRow;
