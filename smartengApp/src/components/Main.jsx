export function Main({className, children}) {
    return (
        <main className={`bg-indigo-300 h-screen grid overflow-y-scroll ${className}`}>
            {children}
        </main>
    )
}