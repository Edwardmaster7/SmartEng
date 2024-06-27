import { HiXCircle } from "react-icons/hi";

const Modal = ({ children, isOpen, onClose, className, hasCloseButton, z }) => {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 flex min-w-80 items-center justify-center ${z ? z : "z-50"}`}
    >
      <div
        className={`absolute rounded bg-violet-600 p-4 shadow-2xl md:p-6 ${className}`}
      >
        <HiXCircle
          className={`absolute right-2 top-2 text-2xl text-violet-100 hover:animate-pulse hover:text-red-500 ${hasCloseButton === false ? "hidden" : ""}`}
          onClick={onClose}
        />
        {children}
      </div>
    </div>
  );
};

export default Modal;
