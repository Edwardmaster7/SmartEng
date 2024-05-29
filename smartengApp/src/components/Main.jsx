export function Main({className, children}) {
    return (
      <main
        className={`bg-gradient-to-br from-15% from-indigo-100 via-50% via-purple-300 to-indigo-400 bg-blend-saturation h-auto flex ${className}`}
      >
        {children}
      </main>
    );
}