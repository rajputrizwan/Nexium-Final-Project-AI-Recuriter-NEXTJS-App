"use client";

import React from "react";
import CreateOptions from "./_components/CreateOptions";
import LatestInterviewList from "./_components/LatestInterviewList";

function DashboardPage() {
  return (
    <div>
      <CreateOptions />
      <LatestInterviewList />
    </div>
  );
}

export default DashboardPage;
