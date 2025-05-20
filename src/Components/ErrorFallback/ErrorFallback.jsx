function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div
      role="alert"
      className="flex h-screen w-full flex-col items-center justify-center"
    >
      <p className="text-center text-2xl font-semibold text-red-400">
        😥 Something went wrong:{" "}
        <span className="font-bold text-black">{error.message}</span>
      </p>
      <button
        onClick={resetErrorBoundary}
        className="mt-5 rounded-md bg-gray-100 p-2 text-lg font-semibold text-black shadow-md hover:shadow-inner"
      >
        Please Try Again !
      </button>
    </div>
  );
}

export default ErrorFallback;
