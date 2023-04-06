import React from "react";
import QuizzesTableRow from "./QuizzesTableRow";
import { useGetQuizzesQuery } from "../../../features/quizzes/quizzesApi";

const QuizzesTable = () => {
  const {
    data: quizzes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetQuizzesQuery();

  //decide what to render #start
  let content = null;
  if (isSuccess && quizzes?.length > 0) {
    content = quizzes.map((quiz, i) => (
      <QuizzesTableRow key={quiz.id} quiz={quiz} number={i + 1} />
    ));
  }

  //no data found
  if (isSuccess && quizzes?.length === 0)
    return <div className="text-center">No Quizzes found!</div>;

  //loading
  if (isLoading) return <div className="text-center">Loading...</div>;

  //decide what to render #end

  return (
    <table className="divide-y-1 text-base divide-gray-600 w-full">
      <thead>
        <tr>
          <th className="table-th">Question</th>
          <th className="table-th">Video</th>
          <th className="table-th justify-center">Action</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-slate-600/50">{content}</tbody>
    </table>
  );
};

export default QuizzesTable;
