"use client";
import Loading from "@/components/loading";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useDirect } from "@/hooks/backend/useDirect";
import { FaPlus, FaSave, FaTrash } from "react-icons/fa";
import { useCreateQuiz } from "@/hooks/backend/useCreateQuiz";

export default function CreateQuiz() {
  const {
    quizTitle,
    setQuizTitle,
    quizDescription,
    setQuizDescription,
    questions,
    handleAddQuestion,
    handleRemoveQuestion,
    handleQuestionChange,
    handleOptionChange,
    handleCorrectAnswerChange,
    handleSaveQuiz,
    loading,
  } = useCreateQuiz();

  useDirect();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 p-6 relative">
      <ToastContainer />
      <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-8 text-center transform transition-all duration-500 hover:scale-105">
        Create New Quiz
      </h1>

      {/* Quiz Title and Description Form */}
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-2xl p-6 md:p-8 space-y-6 sm:space-y-8 transform transition-all duration-300 hover:scale-105">
        <div>
          <label className="block text-xl font-semibold text-gray-800 mb-3">
            Quiz Title
          </label>
          <input
            type="text"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            placeholder="Enter quiz title"
          />
        </div>
        <div>
          <label className="block text-xl font-semibold text-gray-800 mb-3">
            Quiz Description
          </label>
          <textarea
            value={quizDescription}
            onChange={(e) => setQuizDescription(e.target.value)}
            className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            placeholder="Enter quiz description"
          />
        </div>

        {/* Questions Section */}
        <div className="space-y-6 sm:space-y-8">
          {questions.map((q, index) => (
            <div
              key={index}
              className="p-6 border-2 border-gray-300 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-700">
                  Question {index + 1}
                </h3>
                <button
                  onClick={() => handleRemoveQuestion(index)}
                  className="text-red-500 hover:text-red-700 transform transition-all duration-300 hover:scale-125"
                >
                  <FaTrash />
                </button>
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-600 mb-3">
                  Question
                </label>
                <input
                  type="text"
                  value={q.question}
                  onChange={(e) => handleQuestionChange(index, e.target.value)}
                  className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter question"
                />
              </div>
              <div className="mt-6">
                <label className="block text-lg font-medium text-gray-600 mb-3">
                  Options
                </label>
                {q.options.map((option, optIndex) => (
                  <div key={optIndex} className="flex items-center mb-4">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(index, optIndex, e.target.value)
                      }
                      className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder={`Option ${optIndex + 1}`}
                    />
                    <input
                      type="radio"
                      name={`correct-answer-${index}`}
                      className="ml-4"
                      checked={q.correctAnswer === optIndex}
                      onChange={() =>
                        handleCorrectAnswerChange(index, optIndex)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Add Question Button */}
        <button
          onClick={handleAddQuestion}
          className="w-full py-3 bg-gradient-to-r from-teal-400 to-teal-500 text-white rounded-lg shadow-lg flex items-center justify-center space-x-3 hover:bg-gradient-to-l transition-all duration-300"
        >
          <FaPlus />
          <span className="font-semibold">Add Question</span>
        </button>

        {/* Save Button */}
        <button
          onClick={handleSaveQuiz}
          disabled={loading}
          className={`w-full py-3 bg-gradient-to-r from-green-400 to-green-500 text-white rounded-lg shadow-lg flex items-center justify-center space-x-3 hover:bg-gradient-to-l transition-all duration-300 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <FaSave />
          <span className="font-semibold">
            {loading ? <Loading /> : "Save Quiz"}
          </span>
        </button>
      </div>

      {/* Floating Elements */}
      <div className="absolute w-40 h-40 sm:w-48 sm:h-48 bg-teal-100 rounded-full blur-xl opacity-60 animate-pulse bottom-8 sm:bottom-12 left-8 sm:left-12" />
      <div className="absolute w-36 h-36 sm:w-44 sm:h-44 bg-yellow-200 rounded-full blur-xl opacity-50 animate-pulse bottom-8 sm:bottom-12 right-8 sm:right-12" />
    </div>
  );
}
