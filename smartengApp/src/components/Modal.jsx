import { HiXCircle } from "react-icons/hi";

const Modal = ({ children, isOpen, onClose, className, hasCloseButton, z }) => {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center min-w-80 ${z ? z : "z-50"}`}
    >
      <div
        className={`absolute bg-violet-600 p-4 md:p-6 rounded shadow-2xl ${className}`}
      >
        <HiXCircle
          className={`text-2xl text-violet-100 absolute right-2 top-2 hover:text-red-500 hover:animate-pulse ${hasCloseButton === false ? "hidden" : ""}`}
          onClick={onClose}
        />
        {children}
      </div>
    </div>
  );
};

export default Modal;
