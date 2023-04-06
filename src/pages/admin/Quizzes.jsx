import React from "react";
import Navbar from "../../components/navbar/Navbar";
import QuizzesTable from "../../components/admin/quizzes/QuizzesTable";
import { Link } from "react-router-dom";

const Quizzes = () => {
  return (
    <>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <div className="w-full flex">
              <Link
                to="/admin/quizzes/create"
                state={{ title: "Add Quiz" }}
                className="btn ml-auto"
              >
                Add Quiz
              </Link>
            </div>
            <div className="overflow-x-auto mt-4">
              <QuizzesTable />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Quizzes;
