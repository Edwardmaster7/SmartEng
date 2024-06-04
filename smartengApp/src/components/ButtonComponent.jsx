const ButtonComponent = ({className, content, imgSrc, children, onClick, type, disabled}) => {
    return (
        <button type={type} className={`hover:bg-opacity-75 text-white font-bold rounded focus:outline-none focus:shadow-outline ${className}`} onClick={onClick} disabled={disabled}>
            {imgSrc && <img className="h-10 w-10 rounded-2xl" src={imgSrc} alt="Menu" />}
            {content}
            {children}
         
        </button>
    )
}

export default ButtonComponent;