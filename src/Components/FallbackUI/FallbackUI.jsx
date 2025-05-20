import React from "react";

export default function () {
  return (
    <>
      <div className="bg-WhiteLoading-rgba fixed left-0 top-0 z-50 h-full w-full">
        <div className="flex h-[80%] w-full flex-col items-center justify-center">
          <h1 className="text-[2rem] font-semibold text-darkPrimary">
            Thank you for waiting 😃 ...
          </h1>
        </div>
      </div>
    </>
  );
}
