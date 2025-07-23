"use client";

import React from "react";
import CreateOptions from "./_components/CreateOptions";
import LatestInterviewList from "./_components/LatestInterviewList";

function Dashboard() {
  return (
    <div>
      <CreateOptions />
      <LatestInterviewList />
    </div>
  );
}

export default Dashboard;
