import React from "react";

const Skeleton = ({ isFirstPost }) => {
  return (
    <div className="border border-blue-300 shadow rounded-md p-6 w-full relative">
      {isFirstPost && (
        <div className="w-full h-64 bg-slate-200 rounded mb-2"></div>
      )}
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-slate-200 h-12 w-12"></div>
        <div className="flex-1 space-y-2 py-1">
          <div className="h-4 w-52 bg-slate-200"></div>
          <div className="h-2 w-32 bg-slate-200"></div>
          <div className="h-6 bg-slate-200"></div>
          <div className="space-y-2">
            <div className="grid grid-cols-4 gap-4 w-96">
              <div className="h-3 bg-slate-200 rounded col-span-1"></div>
              <div className="h-3 bg-slate-200 rounded col-span-1"></div>
              <div className="h-3 bg-slate-200 rounded col-span-1"></div>
              <div className="h-3 bg-slate-200 rounded col-span-1"></div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="h-3 bg-slate-200 rounded col-span-1"></div>
              <div className="h-3 bg-slate-200 rounded col-span-2"></div>
              <div className="h-3 bg-slate-200 rounded col-span-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
