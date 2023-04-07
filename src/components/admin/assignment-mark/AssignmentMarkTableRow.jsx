import React, { useState } from "react";

const AssignmentMarkTableRow = ({ mark = {} }) => {
  const [result, setResult] = useState();
  const {
    id,
    title,
    createdAt,
    student_name,
    repo_link,
    mark: achivedMark,
  } = mark;

  //handle submit mark
  const handleMarkSubmit = () => {
    // logic for submittin assignment amrk
  };
  return (
    <tr>
      <td className="table-td">{title}</td>
      <td className="table-td">1{createdAt}</td>
      <td className="table-td">{student_name}</td>
      <td className="table-td">{repo_link}</td>
      {achivedMark && achivedMark > 0 ? (
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
