import React from "react";
import InterviewHeader from "./_components/InterviewHeader";

function InterviewLayout({ children }) {
  return (
    <div className="bg-gray-100 min-h-screen w-full flex flex-col">
      <InterviewHeader />
      <main className="flex-grow w-full">{children}</main>
    </div>
  );
}

export default InterviewLayout;
