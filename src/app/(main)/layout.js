import React from "react";
import DashboardProvider from "./provider";

function DashboardLayout({ children }) {
  return (
    <div>
      <DashboardProvider>
        <div className="p-10 bg-zinc-100 min-h-screen ">{children}</div>
      </DashboardProvider>
    </div>
  );
}

export default DashboardLayout;
