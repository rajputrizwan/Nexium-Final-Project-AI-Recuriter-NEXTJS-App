"use client";

import React from "react";
import CreateOptions from "./_components/CreateOptions";
import LatestInterviewList from "./_components/LatestInterviewList";

function Dashboard() {
  return (
    <div className="space-y-5">
      <h2 className="font-bold text-2xl">Dashboard</h2>
      <div className="max-w-full">
        <CreateOptions />
      </div>
      <LatestInterviewList />
    </div>
  );
}

export default Dashboard;
