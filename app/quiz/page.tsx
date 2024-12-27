"use client";
import { FaSave } from "react-icons/fa";
import Loading from "@/components/loading";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useQuiz } from "@/hooks/backend/useQuiz";

export default function Quiz() {
  const {
    quizzes,
    loading,
    loadingSubmit,
    answers,
    handleAnswerChange,
    handleSubmit,
  } = useQuiz();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-700 p-8">
      <ToastContainer />

      {/* Quiz Box */}
      <div className="relative w-full max-w-3xl bg-gradient-to-r from-indigo-400 via-blue-500 to-purple-600 p-10 rounded-3xl shadow-2xl border-4 border-white transform transition-all duration-500 hover:scale-105">
        <h2 className="text-5xl font-extrabold text-center text-white mb-12 tracking-wide transform transition-all duration-500 hover:text-yellow-400">
          Take the Quiz and Test Your Knowledge!
        </h2>

        {/* Displaying Quizzes */}
        {loading ? (
          <Loading />
        ) : (
          quizzes.map((quiz) => (
            <div key={quiz.id} className="mb-12 animate-fade-in">
              <h3 className="text-3xl font-semibold text-white mb-6">
                {quiz.title}
              </h3>
              <p className="text-xl text-gray-200 mb-8">{quiz.description}</p>

              {quiz.questions.map((question, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-lg shadow-lg mb-8 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  <p className="text-2xl font-semibold text-indigo-800 mb-6">
                    {question.question}
                  </p>
                  <div className="space-y-4">
                    {question.options.map((option, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="radio"
                          id={`quiz_${quiz.id}_question_${question.id}_option_${index}`}
                          name={`quiz_${quiz.id}_question_${question.id}`}
                          value={option}
                          onChange={() =>
                            handleAnswerChange(quiz.id, question.id, option)
                          }
                          checked={answers[quiz.id]?.[question.id] === option}
                          className="w-6 h-6 text-indigo-500 focus:ring-indigo-400 transform transition-all duration-200 hover:scale-110"
                        />
                        <label
                          htmlFor={`quiz_${quiz.id}_question_${question.id}_option_${index}`}
                          className="ml-4 text-xl text-gray-700 hover:text-indigo-600 cursor-pointer"
                        >
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))
        )}

        {/* Save Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleSubmit}
            disabled={loadingSubmit}
            className={`flex items-center text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-8 py-4 rounded-full shadow-xl hover:bg-gradient-to-l hover:scale-105 transform transition-all duration-300 ease-in-out ${
              loadingSubmit ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <FaSave className="mr-3" />{" "}
            {loadingSubmit ? <Loading /> : "Save Answers"}
          </button>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute w-36 h-36 bg-indigo-300 rounded-full blur-3xl opacity-40 animate-pulse top-32 left-16 sm:w-48 sm:h-48 sm:top-48 sm:left-48" />
      <div className="absolute w-40 h-40 bg-purple-500 rounded-full blur-3xl opacity-50 animate-pulse top-48 right-16 sm:w-48 sm:h-48 sm:top-64 sm:right-64" />
      <div className="absolute w-24 h-24 bg-yellow-300 rounded-full blur-3xl opacity-30 animate-pulse top-24 right-24 sm:w-32 sm:h-32 sm:top-48 sm:right-32" />
    </div>
  );
}
