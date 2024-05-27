export function Field({ fieldName, children, className }) {
    return (
        <div className={`flex flex-col flex-wrap contain-content${className}`}>
            <label className="font-medium text-gray-700">{fieldName}</label>
            <span className="text-gray-600">{children}</span>
        </div>
    )
}