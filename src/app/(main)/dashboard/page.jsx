"use client";

import React from "react";
import CreateOptions from "./_components/CreateOptions";
import LatestInterviewList from "./_components/LatestInterviewList";
import WelcomeContainer from "./_components/WelcomeContainer";

function Dashboard() {
  return (
    <div>
      <WelcomeContainer />

      <CreateOptions />

      <LatestInterviewList />
    </div>
  );
}

export default Dashboard;
