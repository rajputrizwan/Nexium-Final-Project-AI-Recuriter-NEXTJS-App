"use client";
import React, { useState } from "react";
import InterviewHeader from "./_components/InterviewHeader";
import { InterviewDataContext } from "../Context/interviewDataContext";

function InterviewLayout({ children }) {
  const [interviewInfo, setInterviewInfo] = useState();
  return (
    <InterviewDataContext.Provider value={{ interviewInfo, setInterviewInfo }}>
      <div className="bg-gray-100 min-h-screen w-full flex flex-col">
        <InterviewHeader />
        <main className="flex-grow w-full">{children}</main>
      </div>
    </InterviewDataContext.Provider>
  );
}

export default InterviewLayout;
