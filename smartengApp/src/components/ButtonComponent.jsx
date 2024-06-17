import { Link } from "react-router-dom";

const ButtonComponent = ({className, content, imgSrc, children, onClick, type, disabled, alt, to}) => {
    return (
      <Link to={to}>
        <button
          type={type}
          className={`hover:bg-opacity-75 text-white font-bold rounded hover:cursor-pointer focus:outline-none focus:shadow-outline ${className}`}
          onClick={onClick}
          disabled={disabled}
        >
          {imgSrc && (
            <img className="h-10 w-10 rounded-2xl" src={imgSrc} alt={alt} />
          )}
          {content}
          {children}
        </button>
      </Link>
    );
}

export default ButtonComponent;