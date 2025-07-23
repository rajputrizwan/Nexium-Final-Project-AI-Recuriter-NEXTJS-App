"use client";

import React from "react";
import { AppSidebar } from "./_components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import WelcomeContainer from "./dashboard/_components/WelcomeContainer";

function DashboardProvider({ children }) {
  return (
    <SidebarProvider className="bg-gray-100 ">
      <AppSidebar />
      <SidebarTrigger />

      <div className="p-10">
        <WelcomeContainer />
        {children}
      </div>
    </SidebarProvider>
  );
}

export default DashboardProvider;
