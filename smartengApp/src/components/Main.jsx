const Main = ({ className, children }) => {
  return (
    <main
      className={`bg-gradient-to-br from-15% from-indigo-100 dark:from-indigo-600 via-50% via-purple-300 dark:via-purple-700 to-indigo-400 dark:to-indigo-900 bg-blend-saturation min-h-screen ${className}`}
    >
      {children}
    </main>
  );
};

export default Main;
