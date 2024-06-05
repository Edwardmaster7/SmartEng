import { HiXCircle } from "react-icons/hi";

const Modal = ({ children, isOpen, onClose, className }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 min-w-80">
      <div className={`absolute bg-violet-600 p-6 rounded-xl shadow-2xl ${className}`}>
        <HiXCircle
          className="text-2xl text-violet-100 absolute right-2 top-2 hover:text-red-500 hover:animate-pulse"
          onClick={onClose}
        />
        {children}
      </div>
    </div>
  );
};

export default Modal;
