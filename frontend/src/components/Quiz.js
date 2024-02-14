"use client"
import React, { useState } from "react";

const Quiz = ({ questions }) => {
  const [selectedOptions, setSelectedOptions] = useState(
    Array(questions.length).fill(null)
  );
  const [showResult, setShowResult] = useState(false);

  const handleOptionSelect = (index, optionIndex) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = optionIndex;
    setSelectedOptions(newSelectedOptions);
  };

  const handleSubmit = () => {
    setShowResult(true);
  };

  const resetQuiz = () => {
    setSelectedOptions(Array(questions.length).fill(null));
    setShowResult(false);
  };

  const isAnswered = selectedOptions.every((option) => option !== null);

  return (
    <div className="w-full max-w-md mx-auto border shadow-md rounded p-4">
      {questions.map((question, index) => (
        <div key={index} className="mb-4">
          <p className="font-bold mb-2">{question.question}</p>
          <ul>
            {question.options.map((option, optionIndex) => (
              <li key={optionIndex} className="mb-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={optionIndex}
                    checked={selectedOptions[index] === optionIndex}
                    onChange={() => handleOptionSelect(index, optionIndex)}
                    className="mr-2"
                  />
                  <span>{option}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
      {showResult ? (
        <div className="mb-4">
          <p className="font-bold mb-2">Results:</p>
          <ul>
            {questions.map((question, index) => (
              <li key={index} className="mb-2">
                {`Question ${index + 1}: ${
                  selectedOptions[index] === question.answer
                    ? "Correct"
                    : "Incorrect"
                }`}
              </li>
            ))}
          </ul>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={resetQuiz}
          >
            Try Again
          </button>
        </div>
      ) : (
        <button
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
            !isAnswered && "opacity-50 cursor-not-allowed"
          }`}
          onClick={handleSubmit}
          disabled={!isAnswered}
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default Quiz;
