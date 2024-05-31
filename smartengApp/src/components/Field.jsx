const Field = ({ fieldName, children, className }) => {
    return (
        <div className={`flex flex-col flex-wrap contain-content${className}`}>
            <label className="font-medium text-inherit">{fieldName}</label>
            <span className="text-inherit opacity-80">{children}</span>
        </div>
    )
}

export default Field;