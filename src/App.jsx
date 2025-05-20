import React, { useEffect } from "react";
import Header from "./Components/Header/Header";
import Loading from "./Components/Loading/Loading";
import { useLoading } from "./Hooks/useLoading";
import setLoadingInterceptor from "./Interceptors/loadingInterceptor";
import AppRoutes from "./Routes/AppRoutes/AppRoutes";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./Components/ErrorFallback/ErrorFallback";

export default function App() {
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    setLoadingInterceptor({ showLoading, hideLoading });
  }, []);
  return (
    <>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          window.location.reload();
        }}
      >
        <Loading />
        <div className="flex h-screen flex-col">
          <Header />
          <div className="flex-grow overflow-y-auto">
            <AppRoutes />
          </div>
        </div>
      </ErrorBoundary>
    </>
  );
}
