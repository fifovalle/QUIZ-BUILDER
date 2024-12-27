"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LogoutModal from "@/components/logoutModal";
import { useLogout } from "@/hooks/backend/useLogout";
import { useCheckUser } from "@/hooks/backend/useCheckUser";
import {
  FaPlay,
  FaList,
  FaCheckCircle,
  FaSignOutAlt,
  FaCog,
} from "react-icons/fa";

export default function Home() {
  const router = useRouter();

  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  const logout = useLogout();

  const { role } = useCheckUser();

  return (
    <div className="relative flex flex-col h-screen items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 p-8 overflow-hidden">
      {/* Header Section */}
      <div className="text-center mb-16 space-y-4 px-4 md:px-0">
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold text-white drop-shadow-lg transform transition-all duration-500 ease-in-out hover:scale-110 hover:drop-shadow-2xl">
          Welcome to Quiz Builder
        </h1>
        <p className="mt-4 text-xl sm:text-2xl md:text-3xl text-gray-200 leading-relaxed tracking-wide">
          Create, take, and test your knowledge with fun quizzes! Let’s make
          learning exciting!
        </p>
      </div>

      {/* Animated Background Shapes */}
      <div className="absolute top-0 left-0 right-0 bottom-0 z-0">
        <div className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-indigo-300 rounded-full blur-xl opacity-30 animate-pulse transform translate-x-24 translate-y-24"></div>
        <div className="absolute w-64 h-64 sm:w-72 sm:h-72 bg-blue-500 rounded-full blur-xl opacity-20 animate-pulse transform translate-x-48 translate-y-48"></div>
        <div className="absolute w-48 h-48 sm:w-56 sm:h-56 bg-purple-400 rounded-full blur-xl opacity-25 animate-pulse transform -translate-x-36 translate-y-64"></div>
      </div>

      {/* Button Section */}
      <div className="w-full max-w-md space-y-8 z-10 mt-16 px-4 md:px-0">
        {/* Start a New Quiz Button */}
        <div
          className={`${
            role === "student" ? "hidden" : "flex"
          }  justify-center`}
        >
          <button
            onClick={() => router.push("/create")}
            className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-xl transform hover:scale-110 hover:from-blue-600 hover:to-blue-800 transition-all duration-500 ease-in-out focus:ring-4 focus:ring-blue-300"
          >
            <FaPlay className="inline-block mr-2" /> Start a New Quiz
          </button>
        </div>

        {/* View My Quizzes Button */}
        <div className="flex justify-center">
          <button
            onClick={() => {
              if (role === "student") {
                router.push("/my-quizzes");
              } else {
                router.push("/quizzes");
              }
            }}
            className="w-full py-4 px-6 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg shadow-xl transform hover:scale-110 hover:from-green-600 hover:to-green-800 transition-all duration-500 ease-in-out focus:ring-4 focus:ring-green-300"
          >
            <FaList className="inline-block mr-2" />
            {role === "student" ? "View My Quizzes" : "View All Quizzes"}
          </button>
        </div>

        {/* Take a Quiz Button */}
        <div
          className={`${role === "student" ? "flex" : "hidden"} justify-center`}
        >
          <button
            onClick={() => router.push("/quiz")}
            className="w-full py-4 px-6 bg-gradient-to-r from-gray-600 to-gray-800 text-white rounded-lg shadow-xl transform hover:scale-110 hover:from-gray-700 hover:to-gray-900 transition-all duration-500 ease-in-out focus:ring-4 focus:ring-gray-300"
          >
            <FaCheckCircle className="inline-block mr-2" /> Take a Quiz
          </button>
        </div>

        {/* Settings Button */}
        <div className="flex justify-center">
          <button
            onClick={() => router.push("/settings")}
            className="w-full py-4 px-6 bg-gradient-to-r from-yellow-500 to-yellow-700 text-white rounded-lg shadow-xl transform hover:scale-110 hover:from-yellow-600 hover:to-yellow-800 transition-all duration-500 ease-in-out focus:ring-4 focus:ring-yellow-300"
          >
            <FaCog className="inline-block mr-2" /> Settings
          </button>
        </div>

        {/* Logout Button */}
        <div className="flex justify-center">
          <button
            onClick={() => setOpenLogoutModal(true)}
            className="w-full py-4 px-6 bg-red-500 text-white rounded-lg shadow-xl transform hover:scale-110 hover:bg-red-600 transition-all duration-500 ease-in-out focus:ring-4 focus:ring-red-300"
          >
            <FaSignOutAlt className="inline-block mr-2" /> Logout
          </button>
        </div>
      </div>

      {/* Footer Section */}
      <div className="absolute bottom-8 text-sm text-gray-200 z-10 transform translate-y-4 opacity-80 hover:opacity-100 transition-all duration-300 px-4 md:px-0">
        <p>
          &copy; {new Date().getFullYear()} Quiz Builder - All rights reserved.
          Crafted with love and technology.
        </p>
      </div>

      {/* Floating Elements */}
      <div className="absolute w-20 h-20 sm:w-24 sm:h-24 bg-indigo-200 rounded-full blur-xl opacity-50 animate-pulse bottom-16 left-16" />
      <div className="absolute w-24 h-24 sm:w-28 sm:h-28 bg-purple-400 rounded-full blur-xl opacity-40 animate-pulse bottom-16 right-16" />

      {openLogoutModal && (
        <LogoutModal
          onConfirm={() => logout()}
          onCancel={() => setOpenLogoutModal(false)}
        />
      )}
    </div>
  );
}
