import React from "react";
import AssignmentTableRow from "./AssignmentTableRow";
import { useGetAssignmentsQuery } from "../../../features/assignments/assignmentsApi";
import Loader from "../../ui/Loader";

const AssignmentTable = () => {
  const {
    data: assignments,
    isLoading,
    isSuccess,
    isError,
  } = useGetAssignmentsQuery();

  if (isLoading)
    return (
      <div className="flex justify-center  mt-10">
        <Loader />
      </div>
    );

  if (isSuccess && assignments?.length == 0)
    return <div>No assignments found!</div>;

  return (
    <table className="divide-y-1 text-base divide-gray-600 w-full">
      <thead>
        <tr>
          <th className="table-th">Title</th>
          <th className="table-th">Video Title</th>
          <th className="table-th">Mark</th>
          <th className="table-th">Action</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-slate-600/50">
        {isSuccess &&
          assignments?.length > 0 &&
          assignments.map((ass, i) => (
            <AssignmentTableRow key={ass.id} assignment={ass} number={i + 1} />
          ))}
      </tbody>
    </table>
  );
};

export default AssignmentTable;
