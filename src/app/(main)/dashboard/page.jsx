"use client";

import React from "react";
import WelcomeContainer from "./_components/WelcomeContainer";
import CreateOptions from "./_components/CreateOptions";
import LatestInterviewList from "./_components/LatestInterviewList";

function Dashboard() {
  return (
    <div className=" p-5">
      <WelcomeContainer />
      <h2 className="py-3 font-bold text-2xl">Dashboard</h2>
      <CreateOptions />

      <LatestInterviewList />
    </div>
  );
}

export default Dashboard;
