import React from "react";
import { Oval } from "react-loading-icons";

interface LoadingProp {
  massage: string;
}

function Loading({ massage }: LoadingProp) {
  return (
    <div className="flex flex-col md:space-y-10 items-center justify-center h-screen bg-white">
      <Oval
        stroke="blue"
        strokeOpacity={0.5}
        speed={1}
        strokeWidth={5}
        className="w-1/6 h-1/6"
      />
      <h1 className="text-gray-600 text-xl md:text-3xl">{massage}</h1>
    </div>
  );
}

export default Loading;
