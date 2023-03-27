import React from "react";
import Navbar from "../../components/navbar/Navbar";
import QuizQuestion from "../../components/quiz/QuizQuestion";
import QuizTitle from "../../components/quiz/QuizTitle";

const Quiz = () => {
  return (
    <>
      <Navbar />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <QuizTitle />
          <div className="space-y-8 ">
            <QuizQuestion />
            <QuizQuestion />
          </div>

          <button className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 ">
            Submit
          </button>
        </div>
      </section>
    </>
  );
};

export default Quiz;
