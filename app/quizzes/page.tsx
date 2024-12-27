"use client";
import i18n from "@/app/i18n";
import Loading from "@/components/loading";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useShowAllQuiz } from "@/hooks/backend/useShowAllQuiz";

export default function ViewMyQuiz() {
  const { quiz, loading } = useShowAllQuiz();

  if (loading) return <Loading />;

  return (
    <div className="relative flex h-screen items-center justify-center bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 overflow-hidden">
      {/* Toast Container for notifications */}
      <ToastContainer />

      {/* Quiz Results Card */}
      <div className="w-full max-w-lg p-12 bg-white bg-opacity-90 rounded-3xl shadow-lg transform transition-all duration-700 hover:scale-105 hover:shadow-2xl animate__animated animate__fadeIn animate__delay-1s">
        {/* Title Section */}
        <h1 className="text-6xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-800 mb-8 tracking-wider">
          {i18n.t("result2")}
        </h1>

        {/* Score Section */}
        <div className="mb-6 flex items-center justify-evenly">
          <p className="text-2xl text-gray-800 font-semibold">
            {i18n.t("score")}
          </p>
          <span className="text-5xl font-extrabold text-gradient">
            {quiz.score}
          </span>
          <p className="text-xl text-gray-800">/{quiz.totalQuestions}</p>
        </div>

        {/* Correct and Incorrect Answers Section */}
        <div className="space-y-4 mb-8">
          <p className="text-xl text-gray-700">
            {i18n.t("correctAnswers")}{" "}
            <span className="font-semibold text-green-500 text-3xl">
              {quiz.correctAnswers}
            </span>
          </p>
          <p className="text-xl text-gray-700">
            {i18n.t("wrongAnswers")}{" "}
            <span className="font-semibold text-red-500 text-3xl">
              {quiz.wrongAnswers}
            </span>
          </p>
        </div>
      </div>

      {/* Floating Elements for Effects */}
      <div className="absolute w-24 h-24 sm:w-28 sm:h-28 bg-indigo-200 rounded-full blur-xl opacity-60 animate-pulse bottom-16 left-16" />
      <div className="absolute w-28 h-28 sm:w-32 sm:h-32 bg-pink-400 rounded-full blur-xl opacity-40 animate-pulse bottom-16 right-16" />
      <div className="absolute w-56 h-56 sm:w-64 sm:h-64 bg-blue-500 rounded-full blur-xl opacity-30 animate-pulse top-24 left-32" />
    </div>
  );
}
