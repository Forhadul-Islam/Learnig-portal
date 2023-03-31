import React from "react";
import Option from "./Option";

const QuizQuestion = ({ quiz, handleSetQuizAns, quizzesAns }) => {
  const isChecked = (quizId, optionId) => {
    const is = quizzesAns?.find((q) => {
      if (q.id === quizId) {
        const { options } = q || [];
        return options?.includes(optionId);
      }
      return false;
    });

    return is?.id ? true : false;
  };
  return (
    <div className="quiz">
      <h4 className="question">Quiz 1 - {quiz?.question}</h4>
      <form className="quizOptions">
        {quiz?.options?.map((q) => (
          <Option
            onChange={(checked) => handleSetQuizAns(checked, quiz?.id, q)}
            key={`Quiz-${quiz?.id}-option-${q.id}`}
            id={`Quiz-${quiz?.id}-option-${q.id}`}
            option={q.option}
            handleChecked={() => isChecked(quiz.id, q)}
          />
        ))}
      </form>
    </div>
  );
};

export default QuizQuestion;
