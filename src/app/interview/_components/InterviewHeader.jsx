import React from "react";
import Image from "next/image";

function InterviewHeader() {
  return (
    <div className="p-4 sm:p-6 md:p-4 shadow-sm flex justify-center sm:justify-start">
      <Image
        src="/sidebarLogo.png"
        alt="logo"
        width={100}
        height={100}
        className="w-[100px] h-auto"
      />
    </div>
  );
}

export default InterviewHeader;
