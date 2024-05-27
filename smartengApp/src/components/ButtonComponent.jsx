export function ButtonComponent({className, content, imgSrc, children, onClick, disabled}) {
    return (
        <button className={`hover:bg-opacity-75 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${className}`} type="button" onClick={onClick} disabled={disabled}>
            {imgSrc && <img className="h-10 w-10 rounded-2xl" src={imgSrc} alt="Menu" />}
            {content}
            {children}
         
        </button>
    )
}