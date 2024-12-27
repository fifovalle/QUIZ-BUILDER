import { FC } from "react";
import "animate.css";

interface LogoutModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const LogoutModal: FC<LogoutModalProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-tl from-black via-blue-800 to-green-500 bg-opacity-50 backdrop-blur-sm transition-all duration-700 ease-in-out transform scale-100">
      <div className="bg-gradient-to-r from-blue-400 via-teal-300 to-green-400 p-8 rounded-3xl shadow-xl transform transition-all duration-500 ease-in-out animate__animated animate__fadeIn animate__delay-0.4s animate__faster animate__zoomIn">
        <h2 className="text-4xl font-semibold text-white text-center mb-6 animate__animated animate__fadeIn animate__delay-0.5s animate__faster animate__slideInUp">
          Are you sure you want to log out?
        </h2>

        <div className="flex justify-around gap-6">
          <button
            onClick={onCancel}
            className="w-full py-4 px-8 bg-green-500 text-white rounded-xl shadow-lg transform transition-all duration-300 ease-in-out hover:bg-green-400 hover:scale-105 hover:translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-green-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="w-full py-4 px-8 bg-gradient-to-r from-blue-300 to-teal-400 text-white rounded-xl shadow-lg transform transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-blue-400 hover:to-teal-500 hover:scale-105 hover:translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-blue-200"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
