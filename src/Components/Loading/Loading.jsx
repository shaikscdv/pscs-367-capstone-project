import { useLoading } from "../../Hooks/useLoading";

export default function Loading() {
  const { isLoading } = useLoading();
  if (!isLoading) return;

  return (
    <div className="bg-WhiteLoading fixed left-0 top-0 z-50 h-full w-full">
      <div className="flex h-[80%] w-full flex-col items-center justify-center">
        <img src="/loading.svg" alt="Loading!" />
        <h1 className="text-[2rem] font-semibold text-darkPrimary">
          Loading...
        </h1>
      </div>
    </div>
  );
}
