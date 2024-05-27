export function Container({children, className}) {
    return (
        <div className={`bg-indigo-100 container rounded-lg shadow-xl ${className}`}>
            {children}
        </div>
    )
}