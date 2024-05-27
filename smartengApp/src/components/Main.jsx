export function Main({className, children}) {
    return (
      <main
        className={`bg-indigo-300 h-screen flex overflow-y-scroll ${className}`}
      >
        {children}
      </main>
    );
}