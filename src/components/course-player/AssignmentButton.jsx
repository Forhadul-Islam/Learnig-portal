import React from "react";
import { Link } from "react-router-dom";
import { useGetAssignmentByVideoIdQuery } from "../../features/assignments/assignmentsApi";

const Assignment = ({ videoId }) => {
  const { data: assignments, isSuccess } = useGetAssignmentByVideoIdQuery(
    videoId,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  if (isSuccess && assignments?.length > 0)
    return (
      <Link className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary">
        এসাইনমেন্ট
      </Link>
    );
};

export default Assignment;
