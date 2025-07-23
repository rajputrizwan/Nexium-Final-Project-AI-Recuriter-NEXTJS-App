"use client";

import React from "react";
import { useUser } from "@/app/provider";
import Image from "next/image";

function WelcomeContainer() {
  const { user } = useUser();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-5 flex flex-col sm:flex-row items-center justify-between gap-4 border border-gray-200 rounded-lg mb-5">
      <div className="text-center sm:text-left">
        <h2 className="text-lg font-bold">Welcome Back, {user?.name}</h2>
        <h2 className="text-gray-500">
          AI-Driven Interviews, Hassle-Free Hiring
        </h2>
      </div>

      {user?.picture ? (
        <Image
          src={user.picture}
          alt="User Avatar"
          width={50}
          height={50}
          className="rounded-full"
        />
      ) : (
        <div className="w-[50px] h-[50px] bg-gray-300 rounded-full" />
      )}
    </div>
  );
}

export default WelcomeContainer;
