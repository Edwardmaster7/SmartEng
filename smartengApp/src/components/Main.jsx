export function Main({className, children}) {
    return (
      <main
        className={`bg-indigo-300 h-auto flex ${className}`}
      >
        {children}
      </main>
    );
}