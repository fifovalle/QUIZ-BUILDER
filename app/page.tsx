"use client";
import i18n from "@/app/i18n";
import Image from "next/image";
import { useState } from "react";
import logo from "@/app/favicon.ico";
import Loading from "@/components/loading";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDirect } from "@/hooks/backend/useDirect";
import { useLoginsignInWithPassword } from "@/hooks/backend/useLoginsignInWithPassword";

export default function Login() {
  const router = useRouter();
  const { email, setEmail, password, setPassword, loading, handleLogin } =
    useLoginsignInWithPassword();

  useDirect();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative flex h-screen items-center justify-center bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 overflow-hidden">
      <ToastContainer />
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 border-t-8 border-indigo-600 z-10">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <Image src={logo} alt="Logo" width={50} height={50} />
        </div>
        {/* Heading */}
        <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
          {i18n.t("welcomeBack")}
        </h1>
        <p className="text-center text-lg text-gray-600 mb-6">
          {i18n.t("pleaseContinue")}
        </p>
        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Input */}
          <div className="relative">
            <input
              type="email"
              className="peer mt-4 block w-full p-3 border-2 border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label className="absolute left-3 top-0 text-gray-600 text-sm transition-all transform -translate-y-1/2 scale-75 peer-focus:top-0 peer-focus:text-indigo-500 peer-focus:scale-75 peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 bg-white">
              {i18n.t("email")}
            </label>
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="peer mt-4 block w-full p-3 border-2 border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label className="absolute left-3 top-0 text-gray-600 text-sm transition-all transform -translate-y-1/2 scale-75 peer-focus:top-0 peer-focus:text-indigo-500 peer-focus:scale-75 peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 bg-white">
              {i18n.t("password")}
            </label>
            <button
              type="button"
              className="absolute right-3 top-4"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaEyeSlash className="text-gray-600" />
              ) : (
                <FaEye className="text-gray-600" />
              )}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3 px-4 rounded-md text-white bg-indigo-600 transition-all duration-300 ${
              loading || !email || !password
                ? "opacity-50 hover:cursor-not-allowed"
                : "hover:bg-indigo-700"
            }`}
            disabled={loading || !email || !password}
          >
            {loading ? <Loading /> : `${i18n.t("login")}`}
          </button>
        </form>

        {/* Registration Link */}
        <p className="text-sm text-center mt-6 text-gray-700">
          {i18n.t("dontHaveAccount")}{" "}
          <a
            onClick={() => router.push("/register")}
            className="text-indigo-500 hover:underline hover:cursor-pointer"
          >
            {i18n.t("register")}.
          </a>
        </p>
      </div>

      {/* Floating Elements */}
      <div className="absolute w-20 h-20 sm:w-24 sm:h-24 bg-indigo-200 rounded-full blur-xl opacity-50 animate-pulse bottom-16 left-16" />
      <div className="absolute w-24 h-24 sm:w-28 sm:h-28 bg-purple-400 rounded-full blur-xl opacity-40 animate-pulse bottom-16 right-16" />
      <div className="absolute w-48 h-48 sm:w-56 sm:h-56 bg-blue-500 rounded-full blur-xl opacity-30 animate-pulse top-24 left-32" />
    </div>
  );
}
