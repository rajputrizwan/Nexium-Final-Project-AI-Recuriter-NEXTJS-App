"use client";

import { InterviewDataContext } from "@/app/Context/interviewDataContext";
import React, { useContext } from "react";
import { Timer, Mic, Video, PhoneOff } from "lucide-react";
import Image from "next/image";

function StartInterview() {
  const { interviewInfo } = useContext(InterviewDataContext);

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col justify-between">
      {/* Top Header */}
      <div className="w-full py-4 px-4 md:px-10 flex items-center justify-between backdrop-blur bg-white/80 shadow-sm border-b border-blue-100">
        <h2 className="text-lg md:text-xl font-bold text-blue-700">
          Live Interview
        </h2>
        <div className="flex items-center gap-2 text-blue-600 font-medium text-sm md:text-base">
          <Timer className="w-5 h-5" />
          <span>00:00:00</span>
        </div>
      </div>

      {/* Main Video Section */}
      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6 px-4 py-6 md:px-10 lg:px-32 xl:px-40">
        {/* AI Interviewer */}
        <div className="rounded-xl shadow-md bg-white/80 backdrop-blur p-6 flex flex-col items-center justify-center border border-blue-100">
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-blue-300">
            <Image
              src="/ai.png"
              alt="AI Interviewer"
              width={160}
              height={160}
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="mt-4 text-base md:text-lg font-semibold text-blue-800">
            AI Interviewer
          </h3>
        </div>

        {/* User */}
        <div className="rounded-xl shadow-md bg-white/80 backdrop-blur p-6 flex flex-col items-center justify-center border border-blue-100">
          <div className="w-40 h-40 rounded-full bg-gray-300 flex items-center justify-center text-blue-600 text-4xl font-bold border-4 border-blue-300">
            {/* Render user's initial if available */}
            {interviewInfo?.userName
              ? interviewInfo.userName.charAt(0).toUpperCase()
              : "U"}
          </div>
          <h3 className="mt-4 text-base md:text-lg font-semibold text-blue-800">
            {interviewInfo?.userName ? interviewInfo?.userName : "You"}
          </h3>
        </div>
      </div>

      <div className="flex items-center justify-center py-5">
        <h2 className="text-gray-400 ">Interview in Progress ...</h2>
      </div>

      {/* Bottom Controls */}
      <div className="w-full bg-white/80 backdrop-blur px-4 md:px-10 py-4 flex flex-wrap justify-center gap-4 border-t border-blue-100 shadow-sm">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full flex items-center gap-2 text-sm shadow">
          <Mic className="w-5 h-5" /> Mute
        </button>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full flex items-center gap-2 text-sm shadow">
          <Video className="w-5 h-5" /> Camera
        </button>
        <button className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full flex items-center gap-2 text-sm shadow">
          <PhoneOff className="w-5 h-5" /> Leave
        </button>
      </div>
    </div>
  );
}

export default StartInterview;
