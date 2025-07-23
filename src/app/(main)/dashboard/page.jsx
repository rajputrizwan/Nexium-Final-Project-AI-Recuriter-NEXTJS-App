"use client";

import React from "react";
import CreateOptions from "./_components/CreateOptions";
import LatestInterviewList from "./_components/LatestInterviewList";
// import WelcomeContainer from "./_components/WelcomeContainer";

function Dashboard() {
  return (
    <div>
      <h2 className="font-bold text-2xl m-5">Dashboard</h2>

      <CreateOptions />

      <LatestInterviewList />
    </div>
  );
}

export default Dashboard;
